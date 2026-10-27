<?php
declare(strict_types=1);

namespace Api\Core;

require_once __DIR__ . '/AuditLogger.php';

use PDO;
use ZipArchive;

class BackupManager
{
    private static function getBackupDir(): string
    {
        $dir = dirname(__DIR__, 2) . '/storage/backups';
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
            file_put_contents($dir . '/.htaccess', "Require all denied\n");
        }
        return $dir;
    }

    public static function createDatabaseBackup(int $userId): array
    {
        $dir = self::getBackupDir();
        $pdo = Database::getConnection();
        $driver = Database::getDriver();

        $timestamp = date('Ymd_His');
        $filename = "backup_db_{$timestamp}.sql";
        $filepath = $dir . '/' . $filename;

        $output = "-- Ceramics & Beyond Database Backup\n";
        $output .= "-- Generated: " . date('Y-m-d H:i:s') . "\n";
        $output .= "-- Driver: " . $driver . "\n\n";

        if ($driver === 'mysql') {
            $output .= "SET FOREIGN_KEY_CHECKS=0;\n\n";
            $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);

            foreach ($tables as $table) {
                // Table structure
                $createSql = $pdo->query("SHOW CREATE TABLE `{$table}`")->fetch(PDO::FETCH_ASSOC);
                $output .= "DROP TABLE IF EXISTS `{$table}`;\n";
                $output .= $createSql['Create Table'] . ";\n\n";

                // Table data
                $rows = $pdo->query("SELECT * FROM `{$table}`")->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($rows)) {
                    foreach ($rows as $row) {
                        $cols = array_map(fn($c) => "`{$c}`", array_keys($row));
                        $vals = array_map(function($v) use ($pdo) {
                            if ($v === null) return 'NULL';
                            return $pdo->quote((string)$v);
                        }, array_values($row));
                        $output .= "INSERT INTO `{$table}` (" . implode(', ', $cols) . ") VALUES (" . implode(', ', $vals) . ");\n";
                    }
                    $output .= "\n";
                }
            }
            $output .= "SET FOREIGN_KEY_CHECKS=1;\n";
        } else {
            // SQLite backup
            $tables = $pdo->query("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")->fetchAll(PDO::FETCH_ASSOC);
            foreach ($tables as $t) {
                $tableName = $t['name'];
                $output .= "DROP TABLE IF EXISTS \"{$tableName}\";\n";
                $output .= $t['sql'] . ";\n\n";

                $rows = $pdo->query("SELECT * FROM \"{$tableName}\"")->fetchAll(PDO::FETCH_ASSOC);
                foreach ($rows as $row) {
                    $cols = array_map(fn($c) => "\"{$c}\"", array_keys($row));
                    $vals = array_map(function($v) use ($pdo) {
                        if ($v === null) return 'NULL';
                        return $pdo->quote((string)$v);
                    }, array_values($row));
                    $output .= "INSERT INTO \"{$tableName}\" (" . implode(', ', $cols) . ") VALUES (" . implode(', ', $vals) . ");\n";
                }
                $output .= "\n";
            }
        }

        if (file_put_contents($filepath, $output) === false) {
            throw new \RuntimeException('Failed to write database backup file.');
        }

        $filesize = filesize($filepath);

        Database::execute(
            "INSERT INTO backup_records (filename, file_path, backup_type, file_size, created_by, status, created_at)
             VALUES (:fn, :fp, 'database', :fs, :uid, 'completed', " . (Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()") . ")",
            [
                ':fn' => $filename,
                ':fp' => $filepath,
                ':fs' => $filesize,
                ':uid' => $userId,
            ]
        );

        AuditLogger::log($userId, 'developer', 'backup_created', 'backup', null, [
            'type' => 'database',
            'filename' => $filename,
            'size' => $filesize,
        ]);

        return [
            'filename' => $filename,
            'file_path' => $filepath,
            'file_size' => $filesize,
            'created_at' => date('Y-m-d H:i:s'),
            'type' => 'database',
        ];
    }

    public static function createMediaBackup(int $userId): array
    {
        if (!class_exists('ZipArchive')) {
            throw new \RuntimeException('ZipArchive extension is not available on this server.');
        }

        $dir = self::getBackupDir();
        $mediaDir = dirname(__DIR__, 2) . '/uploads';

        $timestamp = date('Ymd_His');
        $filename = "backup_media_{$timestamp}.zip";
        $filepath = $dir . '/' . $filename;

        $zip = new ZipArchive();
        if ($zip->open($filepath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new \RuntimeException('Could not create ZIP backup archive.');
        }

        if (is_dir($mediaDir)) {
            $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($mediaDir, \RecursiveDirectoryIterator::SKIP_DOTS),
                \RecursiveIteratorIterator::LEAVES_ONLY
            );

            foreach ($files as $file) {
                if (!$file->isDir()) {
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($mediaDir) + 1);
                    $zip->addFile($filePath, $relativePath);
                }
            }
        }

        $zip->close();
        $filesize = file_exists($filepath) ? filesize($filepath) : 0;

        Database::execute(
            "INSERT INTO backup_records (filename, file_path, backup_type, file_size, created_by, status, created_at)
             VALUES (:fn, :fp, 'media', :fs, :uid, 'completed', " . (Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()") . ")",
            [
                ':fn' => $filename,
                ':fp' => $filepath,
                ':fs' => $filesize,
                ':uid' => $userId,
            ]
        );

        AuditLogger::log($userId, 'developer', 'backup_created', 'backup', null, [
            'type' => 'media',
            'filename' => $filename,
            'size' => $filesize,
        ]);

        return [
            'filename' => $filename,
            'file_path' => $filepath,
            'file_size' => $filesize,
            'created_at' => date('Y-m-d H:i:s'),
            'type' => 'media',
        ];
    }

    public static function listBackups(): array
    {
        return Database::query(
            "SELECT b.*, u.display_name as creator_name 
             FROM backup_records b 
             LEFT JOIN users u ON b.created_by = u.id 
             ORDER BY b.created_at DESC"
        );
    }
}
