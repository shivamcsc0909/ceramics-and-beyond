<?php
declare(strict_types=1);

/**
 * Ceramics & Beyond - Security Configuration
 */

return [
    'session' => [
        'client_cookie_name' => 'CB_CLIENT_SESS',
        'developer_cookie_name' => 'CB_DEV_SESS',
        'lifetime' => 7200, // 2 hours
        'path' => '/',
        'domain' => '',
        'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (isset($_SERVER['SERVER_PORT']) && (int)$_SERVER['SERVER_PORT'] === 443)
            || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https')
            || (!empty($_SERVER['HTTP_X_FORWARDED_SSL']) && strtolower($_SERVER['HTTP_X_FORWARDED_SSL']) === 'on'),
        'httponly' => true,
        'samesite' => 'Lax',
    ],
    'rate_limit' => [
        'max_login_attempts' => 5,
        'lockout_minutes' => 15,
    ],
    'csrf' => [
        'token_name' => 'csrf_token',
        'header_name' => 'HTTP_X_CSRF_TOKEN',
    ],
    'uploads' => [
        'max_file_size' => 10 * 1024 * 1024, // 10 MB
        'allowed_mimes' => [
            'image/jpeg' => 'jpg',
            'image/png'  => 'png',
            'image/webp' => 'webp',
            'image/avif' => 'avif',
        ],
        'upload_dir' => dirname(__DIR__, 2) . '/uploads',
    ],
    'storage' => [
        'backup_dir' => dirname(__DIR__, 2) . '/storage/backups',
        'log_dir' => dirname(__DIR__, 2) . '/storage/logs',
    ],
];
