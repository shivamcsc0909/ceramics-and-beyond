<?php
declare(strict_types=1);

namespace Api\Core;

class Auth
{
    public const ROLE_CLIENT_ADMIN = 'CLIENT_ADMIN';
    public const ROLE_DEVELOPER_ADMIN = 'DEVELOPER_ADMIN';

    public static function startSession(string $portalType): void
    {
        $config = require dirname(__DIR__) . '/config/security.php';
        $cookieName = ($portalType === 'developer')
            ? $config['session']['developer_cookie_name']
            : $config['session']['client_cookie_name'];

        // If another session is already open with a different name, close it first
        if (session_status() === PHP_SESSION_ACTIVE) {
            if (session_name() === $cookieName) {
                return;
            }
            session_write_close();
        }

        // Use dedicated storage directory for reliable persistence on shared hosting
        $sessionDir = dirname(__DIR__, 2) . '/storage/sessions';
        if (!is_dir($sessionDir)) {
            @mkdir($sessionDir, 0755, true);
            @file_put_contents($sessionDir . '/.htaccess', "Require all denied\n");
        }
        if (is_dir($sessionDir) && is_writable($sessionDir)) {
            session_save_path($sessionDir);
        }

        // Support header-based session identification (fallback for reverse-proxy or strict cookie filtering)
        $headerToken = $_SERVER['HTTP_X_SESSION_ID'] 
            ?? $_SERVER['HTTP_X_DEV_SESSION'] 
            ?? $_SERVER['HTTP_X_CLIENT_SESSION'] 
            ?? null;
        if (empty($_COOKIE[$cookieName]) && !empty($headerToken) && preg_match('/^[a-zA-Z0-9,-]{16,128}$/', $headerToken)) {
            session_id($headerToken);
        }

        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (isset($_SERVER['SERVER_PORT']) && (int)$_SERVER['SERVER_PORT'] === 443)
            || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https')
            || (!empty($_SERVER['HTTP_X_FORWARDED_SSL']) && strtolower($_SERVER['HTTP_X_FORWARDED_SSL']) === 'on');

        session_name($cookieName);

        session_set_cookie_params([
            'lifetime' => (int)($config['session']['lifetime'] ?? 7200),
            'path' => '/',
            'domain' => '',
            'secure' => $isHttps,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);

        if (session_status() !== PHP_SESSION_ACTIVE) {
            @session_start();
        }

        // Inactivity timeout check (2 hours)
        if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $config['session']['lifetime'])) {
            self::destroySession();
            @session_start();
        }
        $_SESSION['last_activity'] = time();
    }

    public static function authenticate(string $portalType, string $email, string $password): array
    {
        self::startSession($portalType);

        if (!Security::checkRateLimit($portalType, $email)) {
            Security::recordLoginAttempt($portalType, $email, false);
            throw new \RuntimeException('Too many failed login attempts. Temporary lockout in effect for 15 minutes.');
        }

        $expectedRole = ($portalType === 'developer') ? self::ROLE_DEVELOPER_ADMIN : self::ROLE_CLIENT_ADMIN;

        $sql = "SELECT u.*, r.name as role_name 
                FROM users u 
                JOIN roles r ON u.role_id = r.id 
                WHERE u.email = :email";

        $user = Database::fetch($sql, [':email' => $email]);

        if (!$user) {
            Security::recordLoginAttempt($portalType, $email, false);
            throw new \RuntimeException('Invalid credentials.');
        }

        if ($user['status'] !== 'active') {
            Security::recordLoginAttempt($portalType, $email, false);
            throw new \RuntimeException('This account has been revoked or locked. Please contact technical administration.');
        }

        if (!Security::verifyPassword($password, $user['password_hash'])) {
            Security::recordLoginAttempt($portalType, $email, false);
            throw new \RuntimeException('Invalid credentials.');
        }

        // Strict role verification: A client admin cannot log into developer portal and vice versa
        if ($user['role_name'] !== $expectedRole) {
            Security::recordLoginAttempt($portalType, $email, false);
            AuditLogger::log(
                (int)$user['id'],
                $portalType,
                'unauthorized_portal_access_attempt',
                'user',
                (int)$user['id'],
                ['attempted_portal' => $portalType, 'user_role' => $user['role_name']]
            );
            throw new \RuntimeException('Access denied. You do not possess authorizations for this administration realm.');
        }

        // Success - regenerate session ID to protect against session fixation
        session_regenerate_id(true);

        $_SESSION['user_id'] = (int)$user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name'] = $user['display_name'];
        $_SESSION['user_role'] = $user['role_name'];
        $_SESSION['portal_type'] = $portalType;
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

        // Update last login
        Database::execute(
            "UPDATE users SET last_login_at = " . (Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()") . ", failed_logins = 0 WHERE id = :id",
            [':id' => $user['id']]
        );

        Security::recordLoginAttempt($portalType, $email, true);

        AuditLogger::log(
            (int)$user['id'],
            $portalType,
            'login_success',
            'user',
            (int)$user['id'],
            ['portal' => $portalType]
        );

        return [
            'id' => (int)$user['id'],
            'email' => $user['email'],
            'display_name' => $user['display_name'],
            'role' => $user['role_name'],
            'csrf_token' => $_SESSION['csrf_token'],
            'session_token' => session_id(),
        ];
    }

    public static function check(string $requiredRole, string $portalType): ?array
    {
        self::startSession($portalType);

        if (empty($_SESSION['user_id']) || empty($_SESSION['user_role']) || empty($_SESSION['portal_type'])) {
            return null;
        }

        if ($_SESSION['portal_type'] !== $portalType || $_SESSION['user_role'] !== $requiredRole) {
            return null;
        }

        // Verify user is still active in database
        $user = Database::fetch("SELECT id, email, display_name, status, role_id FROM users WHERE id = :id", [
            ':id' => $_SESSION['user_id']
        ]);

        if (!$user || $user['status'] !== 'active') {
            self::destroySession();
            return null;
        }

        return [
            'id' => (int)$_SESSION['user_id'],
            'email' => $_SESSION['user_email'],
            'display_name' => $_SESSION['user_name'],
            'role' => $_SESSION['user_role'],
            'csrf_token' => $_SESSION['csrf_token'] ?? '',
            'session_token' => session_id(),
        ];
    }

    public static function requireRole(string $requiredRole, string $portalType): array
    {
        $user = self::check($requiredRole, $portalType);
        if (!$user) {
            Response::unauthorized('Authentication required for this administration portal.');
        }
        return $user;
    }

    public static function destroySession(): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            $userId = $_SESSION['user_id'] ?? null;
            $portal = $_SESSION['portal_type'] ?? 'unknown';

            if ($userId) {
                AuditLogger::log((int)$userId, $portal, 'logout', 'user', (int)$userId);
            }

            $_SESSION = [];
            if (ini_get("session.use_cookies") && !headers_sent()) {
                $params = session_get_cookie_params();
                setcookie(
                    session_name(),
                    '',
                    time() - 42000,
                    $params["path"],
                    $params["domain"],
                    $params["secure"],
                    $params["httponly"]
                );
            }
            session_destroy();
        }
    }
}
