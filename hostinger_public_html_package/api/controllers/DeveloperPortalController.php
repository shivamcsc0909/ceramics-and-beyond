<?php
declare(strict_types=1);

namespace Api\Controllers;

use Api\Core\Auth;
use Api\Core\Database;
use Api\Core\Response;
use Api\Core\Security;
use Api\Core\AuditLogger;
use Api\Core\BackupManager;

class DeveloperPortalController
{
    private array $currentUser;

    public function __construct()
    {
        $this->currentUser = Auth::requireRole(Auth::ROLE_DEVELOPER_ADMIN, 'developer');
    }

    public function getSystemHealth(): void
    {
        $start = microtime(true);
        $dbVer = Database::fetch("SELECT 1 as ping");
        $latencyMs = round((microtime(true) - $start) * 1000, 2);

        // Upload directory size
        $uploadDir = dirname(__DIR__, 2) . '/uploads';
        $uploadSize = 0;
        $uploadFiles = 0;
        if (is_dir($uploadDir)) {
            foreach (new \FilesystemIterator($uploadDir) as $f) {
                if ($f->isFile()) {
                    $uploadSize += $f->getSize();
                    $uploadFiles++;
                }
            }
        }

        // Backup directory size
        $backupDir = dirname(__DIR__, 2) . '/storage/backups';
        $backupSize = 0;
        $backupFiles = 0;
        if (is_dir($backupDir)) {
            foreach (new \FilesystemIterator($backupDir) as $f) {
                if ($f->isFile() && $f->getFilename() !== '.htaccess') {
                    $backupSize += $f->getSize();
                    $backupFiles++;
                }
            }
        }

        $maint = Database::fetch("SELECT * FROM maintenance_settings WHERE id = 1");

        $health = [
            'php_version' => PHP_VERSION,
            'php_sapi' => PHP_SAPI,
            'memory_limit' => ini_get('memory_limit'),
            'max_execution_time' => ini_get('max_execution_time') . 's',
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'post_max_size' => ini_get('post_max_size'),
            'opcache_enabled' => function_exists('opcache_get_status') && !empty(opcache_get_status()['opcache_enabled']),
            'database' => [
                'driver' => Database::getDriver(),
                'status' => 'connected',
                'latency_ms' => $latencyMs,
            ],
            'storage' => [
                'uploads_bytes' => $uploadSize,
                'uploads_count' => $uploadFiles,
                'backups_bytes' => $backupSize,
                'backups_count' => $backupFiles,
            ],
            'maintenance' => [
                'is_active' => (bool)($maint['is_active'] ?? false),
                'message' => $maint['message'] ?? '',
                'reason' => $maint['reason'] ?? '',
                'allowed_ips' => json_decode($maint['allowed_ips_json'] ?? '[]', true) ?: [],
                'activated_at' => $maint['activated_at'] ?? null,
            ],
        ];

        Response::success($health);
    }

    public function getAdmins(): void
    {
        $admins = Database::query("
            SELECT u.id, u.email, u.display_name, u.status, u.failed_logins, u.last_login_at, u.created_at,
                   r.name as role_name
            FROM users u
            JOIN roles r ON u.role_id = r.id
            ORDER BY u.id ASC
        ");
        Response::success($admins);
    }

    public function createAdmin(array $params, array $body): void
    {
        $email = trim((string)($body['email'] ?? ''));
        $name = Security::sanitizeString((string)($body['display_name'] ?? ''));
        $password = (string)($body['password'] ?? '');

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::error('A valid email address is required', 422);
        }
        if (empty($name)) {
            Response::error('Display name is required', 422);
        }
        if (strlen($password) < 8) {
            Response::error('Password must be at least 8 characters long', 422);
        }

        if (Database::fetch("SELECT id FROM users WHERE email = :email", [':email' => $email])) {
            Response::error('An administrator with this email already exists', 409);
        }

        // Newly created accounts via this interface are CLIENT_ADMIN
        $role = Database::fetch("SELECT id FROM roles WHERE name = 'CLIENT_ADMIN'");
        if (!$role) {
            Response::error('Client admin role not defined', 500);
        }

        Database::execute("
            INSERT INTO users (role_id, email, password_hash, display_name, status)
            VALUES (:rid, :em, :hash, :nm, 'active')
        ", [
            ':rid' => $role['id'],
            ':em' => $email,
            ':hash' => Security::hashPassword($password),
            ':nm' => $name,
        ]);

        $newId = (int)Database::lastInsertId();
        AuditLogger::log($this->currentUser['id'], 'developer', 'create_client_admin', 'user', $newId, [
            'email' => $email,
        ]);

        Response::success(['id' => $newId, 'email' => $email], 'Client Administrator provisioned successfully');
    }

    public function setAdminStatus(array $params, array $body): void
    {
        $id = (int)($params['id'] ?? 0);
        $status = $body['status'] ?? 'active';

        if (!in_array($status, ['active', 'revoked', 'locked'], true)) {
            Response::error('Invalid user status', 422);
        }

        if ($id === $this->currentUser['id']) {
            Response::error('You cannot revoke your own developer account', 400);
        }

        Database::execute("UPDATE users SET status = :st WHERE id = :id", [
            ':st' => $status,
            ':id' => $id,
        ]);

        // Invalidate active sessions for this user
        Database::execute("DELETE FROM sessions WHERE user_id = :id", [':id' => $id]);

        AuditLogger::log($this->currentUser['id'], 'developer', 'update_admin_status', 'user', $id, [
            'status' => $status,
        ]);

        Response::success(null, "Administrator status set to {$status}");
    }

    public function resetAdminPassword(array $params, array $body): void
    {
        $id = (int)($params['id'] ?? 0);
        $password = (string)($body['password'] ?? '');

        if (strlen($password) < 8) {
            Response::error('Password must be at least 8 characters long', 422);
        }

        $user = Database::fetch("SELECT id, email FROM users WHERE id = :id", [':id' => $id]);
        if (!$user) {
            Response::notFound('User not found');
        }

        Database::execute("
            UPDATE users SET password_hash = :hash, failed_logins = 0, lockout_until = NULL WHERE id = :id
        ", [
            ':hash' => Security::hashPassword($password),
            ':id' => $id,
        ]);

        // Terminate old sessions
        Database::execute("DELETE FROM sessions WHERE user_id = :id", [':id' => $id]);

        AuditLogger::log($this->currentUser['id'], 'developer', 'reset_admin_password', 'user', $id, [
            'email' => $user['email'],
        ]);

        Response::success(null, 'Administrator password has been securely reset');
    }

    public function getAuditLogs(): void
    {
        $logs = Database::query("
            SELECT a.*, u.email as user_email, u.display_name as user_name
            FROM audit_logs a
            LEFT JOIN users u ON a.user_id = u.id
            ORDER BY a.created_at DESC
            LIMIT 100
        ");

        foreach ($logs as &$log) {
            $log['details'] = json_decode($log['details_json'] ?? '[]', true);
            unset($log['details_json']);
        }

        Response::success($logs);
    }

    public function getBackups(): void
    {
        $backups = BackupManager::listBackups();
        Response::success($backups);
    }

    public function createDatabaseBackup(): void
    {
        try {
            $result = BackupManager::createDatabaseBackup($this->currentUser['id']);
            Response::success($result, 'Database SQL dump created successfully');
        } catch (\Exception $e) {
            Response::error('Backup failed: ' . $e->getMessage(), 500);
        }
    }

    public function createMediaBackup(): void
    {
        try {
            $result = BackupManager::createMediaBackup($this->currentUser['id']);
            Response::success($result, 'Media archive backup created successfully');
        } catch (\Exception $e) {
            Response::error('Media backup failed: ' . $e->getMessage(), 500);
        }
    }

    public function updateMaintenance(array $params, array $body): void
    {
        $isActive = !empty($body['is_active']) ? 1 : 0;
        $message = trim((string)($body['message'] ?? 'We are currently performing scheduled refinement. Please return shortly.'));
        $reason = Security::sanitizeString((string)($body['reason'] ?? 'Routine Refinement'));
        $allowedIps = $body['allowed_ips'] ?? [];
        if (!is_array($allowedIps)) {
            $allowedIps = [];
        }

        Database::execute("
            UPDATE maintenance_settings 
            SET is_active = :act, message = :msg, reason = :rsn, 
                activated_by = :uid, activated_at = " . (Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()") . ",
                allowed_ips_json = :ips
            WHERE id = 1
        ", [
            ':act' => $isActive,
            ':msg' => $message,
            ':rsn' => $reason,
            ':uid' => $this->currentUser['id'],
            ':ips' => json_encode($allowedIps),
        ]);

        AuditLogger::log($this->currentUser['id'], 'developer', 'update_maintenance_mode', 'system', 1, [
            'is_active' => (bool)$isActive,
            'reason' => $reason,
        ]);

        Response::success([
            'is_active' => (bool)$isActive,
            'message' => $message,
        ], $isActive ? 'Maintenance mode ACTIVATED' : 'Maintenance mode DEACTIVATED');
    }
}
