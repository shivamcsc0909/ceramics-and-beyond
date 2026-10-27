<?php
declare(strict_types=1);

/**
 * Ceramics & Beyond - Database Configuration
 * Configured for Hostinger Shared Hosting (MySQL/MariaDB) with local SQLite fallback.
 */

// Load .env file if it exists
$envFile = dirname(__DIR__, 2) . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) {
            continue;
        }
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $key = trim($parts[0]);
            $val = trim($parts[1], " \t\n\r\0\x0B\"'");
            putenv("{$key}={$val}");
            $_ENV[$key] = $val;
            $_SERVER[$key] = $val;
        }
    }
}

$getEnv = function(string $key, string $default = ''): string {
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
        return (string)$_ENV[$key];
    }
    if (isset($_SERVER[$key]) && $_SERVER[$key] !== '') {
        return (string)$_SERVER[$key];
    }
    $val = getenv($key);
    return ($val !== false && $val !== '') ? (string)$val : $default;
};

return [
    'driver' => $getEnv('DB_CONNECTION', 'mysql'), // 'mysql' for Hostinger, 'sqlite' for dev
    'mysql' => [
        'host' => $getEnv('DB_HOST', 'localhost'),
        'port' => $getEnv('DB_PORT', '3306'),
        'database' => $getEnv('DB_DATABASE', 'ceramics_and_beyond'),
        'username' => $getEnv('DB_USERNAME', 'root'),
        'password' => $getEnv('DB_PASSWORD', ''),
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'options' => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            (defined('Pdo\\Mysql::ATTR_INIT_COMMAND') ? \Pdo\Mysql::ATTR_INIT_COMMAND : 1002) => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
        ],
    ],
    'sqlite' => [
        'database' => getenv('DB_DATABASE_SQLITE') ?: dirname(__DIR__, 2) . '/storage/database.sqlite',
        'options' => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ],
    ],
];
