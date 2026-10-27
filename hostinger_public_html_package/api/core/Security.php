<?php
declare(strict_types=1);

namespace Api\Core;

class Security
{
    public static function sanitizeString(string $data): string
    {
        return htmlspecialchars(trim($data), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    public static function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    }

    public static function verifyPassword(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    public static function getClientIp(): string
    {
        // Support Cloudflare / Reverse proxies securely
        if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            return filter_var($_SERVER['HTTP_CF_CONNECTING_IP'], FILTER_VALIDATE_IP) ?: '0.0.0.0';
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $first = trim($ips[0]);
            if (filter_var($first, FILTER_VALIDATE_IP)) {
                return $first;
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }

    public static function checkRateLimit(string $portalType, string $email): bool
    {
        $ip = self::getClientIp();
        $config = require dirname(__DIR__) . '/config/security.php';
        $maxAttempts = (int)($config['rate_limit']['max_login_attempts'] ?? 5);
        $lockoutMinutes = (int)($config['rate_limit']['lockout_minutes'] ?? 15);

        // Ensure database connection is initialized so driver is verified
        Database::getConnection();
        $isSqlite = (Database::getDriver() === 'sqlite');

        $sql = "SELECT COUNT(*) as failed_count FROM login_attempts 
                WHERE (ip_address = :ip OR email_attempted = :email) 
                AND portal_type = :portal 
                AND successful = 0 
                AND created_at >= " . ($isSqlite 
                    ? "datetime('now', '-{$lockoutMinutes} minutes')" 
                    : "DATE_SUB(NOW(), INTERVAL {$lockoutMinutes} MINUTE)");

        $res = Database::fetch($sql, [
            ':ip' => $ip,
            ':email' => $email,
            ':portal' => $portalType,
        ]);

        return ($res['failed_count'] ?? 0) < $maxAttempts;
    }

    public static function recordLoginAttempt(string $portalType, string $email, bool $successful): void
    {
        $ip = self::getClientIp();
        Database::getConnection();
        $isSqlite = (Database::getDriver() === 'sqlite');
        $nowExpr = $isSqlite ? "datetime('now')" : "NOW()";

        $sql = "INSERT INTO login_attempts (ip_address, portal_type, email_attempted, successful, created_at)
                VALUES (:ip, :portal, :email, :succ, {$nowExpr})";
        Database::execute($sql, [
            ':ip' => $ip,
            ':portal' => $portalType,
            ':email' => $email,
            ':succ' => $successful ? 1 : 0,
        ]);
    }

    public static function generateCsrfToken(): string
    {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    public static function verifyCsrfToken(?string $token): bool
    {
        if (empty($token) || empty($_SESSION['csrf_token'])) {
            return false;
        }
        return hash_equals($_SESSION['csrf_token'], $token);
    }

    public static function validateAndStoreUpload(array $file): array
    {
        $config = require dirname(__DIR__) . '/config/security.php';
        $uploadDir = $config['uploads']['upload_dir'];
        $maxSize = $config['uploads']['max_file_size'];
        $allowedMimes = $config['uploads']['allowed_mimes'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new \InvalidArgumentException('Upload failed with error code: ' . $file['error']);
        }

        if ($file['size'] > $maxSize) {
            throw new \InvalidArgumentException('File exceeds maximum allowed size of 10MB');
        }

        // Verify MIME type using FileInfo
        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);

        if (!array_key_exists($mime, $allowedMimes)) {
            throw new \InvalidArgumentException('Invalid file type. Only JPEG, PNG, WebP, and AVIF are permitted.');
        }

        // Verify it is a valid image using getimagesize
        $imageInfo = @getimagesize($file['tmp_name']);
        if ($imageInfo === false) {
            throw new \InvalidArgumentException('Corrupt or invalid image file.');
        }

        $width = $imageInfo[0];
        $height = $imageInfo[1];
        $extension = $allowedMimes[$mime];

        // Sanitize and generate unique collision-resistant filename
        $safeOriginalName = preg_replace('/[^a-zA-Z0-9_-]/', '', pathinfo($file['name'], PATHINFO_FILENAME));
        $uniqueFilename = sprintf('cb_%s_%s.%s', date('Ymd_His'), bin2hex(random_bytes(6)), $extension);
        $targetPath = $uploadDir . '/' . $uniqueFilename;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            throw new \RuntimeException('Failed to save uploaded file.');
        }

        return [
            'filename' => $uniqueFilename,
            'original_name' => $file['name'],
            'file_path' => '/uploads/' . $uniqueFilename,
            'file_size' => $file['size'],
            'mime_type' => $mime,
            'width' => $width,
            'height' => $height,
        ];
    }
}
