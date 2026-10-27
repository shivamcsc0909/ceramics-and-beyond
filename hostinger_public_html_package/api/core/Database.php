<?php
declare(strict_types=1);

namespace Api\Core;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $instance = null;
    private static ?string $driver = null;

    public static function getConnection(): PDO
    {
        if (self::$instance === null) {
            $config = require dirname(__DIR__) . '/config/database.php';
            self::$driver = $config['driver'] ?? 'mysql';

            try {
                if (self::$driver === 'mysql') {
                    $dsn = sprintf(
                        'mysql:host=%s;port=%s;dbname=%s;charset=%s',
                        $config['mysql']['host'],
                        $config['mysql']['port'],
                        $config['mysql']['database'],
                        $config['mysql']['charset']
                    );
                    self::$instance = new PDO(
                        $dsn,
                        $config['mysql']['username'],
                        $config['mysql']['password'],
                        $config['mysql']['options']
                    );
                } else {
                    $dbFile = $config['sqlite']['database'];
                    $dir = dirname($dbFile);
                    if (!is_dir($dir)) {
                        mkdir($dir, 0755, true);
                    }
                    self::$instance = new PDO('sqlite:' . $dbFile, null, null, $config['sqlite']['options']);
                    // Enable foreign keys in SQLite
                    self::$instance->exec('PRAGMA foreign_keys = ON;');
                }
            } catch (PDOException $e) {
                // If MySQL fails on local development/testing, fallback to sqlite if available
                if (self::$driver === 'mysql') {
                    $sqliteFile = dirname(__DIR__, 2) . '/storage/database.sqlite';
                    if (file_exists($sqliteFile)) {
                        self::$driver = 'sqlite';
                        self::$instance = new PDO('sqlite:' . $sqliteFile, null, null, [
                            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                            PDO::ATTR_EMULATE_PREPARES => false,
                        ]);
                        self::$instance->exec('PRAGMA foreign_keys = ON;');
                        return self::$instance;
                    }
                    error_log('MySQL connection failed: ' . $e->getMessage());
                    throw new \RuntimeException('Database connection failed. Please verify MySQL configuration: ' . $e->getMessage());
                }
                throw new \RuntimeException('Database initialization error: ' . $e->getMessage());
            }
        }

        return self::$instance;
    }

    public static function getDriver(): string
    {
        if (self::$instance === null) {
            try {
                self::getConnection();
            } catch (\Throwable $e) {
                if (self::$driver === null) {
                    $config = require dirname(__DIR__) . '/config/database.php';
                    self::$driver = $config['driver'] ?? 'mysql';
                }
            }
        }
        return self::$driver ?? 'mysql';
    }

    public static function query(string $sql, array $params = []): array
    {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function fetch(string $sql, array $params = []): ?array
    {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        $result = $stmt->fetch();
        return $result === false ? null : $result;
    }

    public static function execute(string $sql, array $params = []): int
    {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }

    public static function lastInsertId(): string
    {
        return self::getConnection()->lastInsertId();
    }

    public static function beginTransaction(): bool
    {
        return self::getConnection()->beginTransaction();
    }

    public static function commit(): bool
    {
        return self::getConnection()->commit();
    }

    public static function rollBack(): bool
    {
        return self::getConnection()->rollBack();
    }
}
