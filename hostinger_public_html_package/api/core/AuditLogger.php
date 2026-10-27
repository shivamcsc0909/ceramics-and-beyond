<?php
declare(strict_types=1);

namespace Api\Core;

require_once __DIR__ . '/Security.php';

class AuditLogger
{
    public static function log(
        ?int $userId,
        string $portalType,
        string $action,
        ?string $entityType = null,
        ?int $entityId = null,
        array $details = []
    ): void {
        try {
            $ip = Security::getClientIp();
            $sql = "INSERT INTO audit_logs (user_id, portal_type, action, entity_type, entity_id, details_json, ip_address, created_at)
                    VALUES (:user_id, :portal, :action, :entity_type, :entity_id, :details, :ip, " . 
                    (Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()") . ")";

            Database::execute($sql, [
                ':user_id' => $userId,
                ':portal' => $portalType,
                ':action' => $action,
                ':entity_type' => $entityType,
                ':entity_id' => $entityId,
                ':details' => json_encode($details, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                ':ip' => $ip,
            ]);
        } catch (\Throwable $e) {
            error_log('AuditLogger error: ' . $e->getMessage());
        }
    }
}
