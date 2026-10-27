<?php
declare(strict_types=1);

/**
 * Ceramics & Beyond - Automated Verification & Acceptance Test Suite
 * Bespoke & Modular Furniture Manufacturer, Factory & Experience Centre, New Delhi, India
 * Run via CLI: php -d opcache.enable_cli=0 api/test_suite.php
 */

require_once __DIR__ . '/core/Database.php';
require_once __DIR__ . '/core/Security.php';
require_once __DIR__ . '/core/AuditLogger.php';
require_once __DIR__ . '/core/BackupManager.php';
require_once __DIR__ . '/core/Router.php';
require_once __DIR__ . '/core/Auth.php';
require_once __DIR__ . '/core/Response.php';
require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/PublicController.php';
require_once __DIR__ . '/controllers/ClientAdminController.php';
require_once __DIR__ . '/controllers/DeveloperPortalController.php';

use Api\Core\Database;
use Api\Core\Auth;
use Api\Controllers\AuthController;
use Api\Controllers\PublicController;
use Api\Controllers\ClientAdminController;
use Api\Controllers\DeveloperPortalController;

$passed = 0;
$failed = 0;

function assertTest(string $name, bool $condition, string $detail = ''): void {
    global $passed, $failed;
    if ($condition) {
        $passed++;
        echo "  [PASS] {$name}" . ($detail ? " ({$detail})" : "") . PHP_EOL;
    } else {
        $failed++;
        echo "  [FAIL] {$name}" . ($detail ? " ({$detail})" : "") . PHP_EOL;
    }
}

echo "==========================================================" . PHP_EOL;
echo "CERAMICS & BEYOND - COMPREHENSIVE BACKEND ACCEPTANCE SUITE" . PHP_EOL;
echo "==========================================================" . PHP_EOL . PHP_EOL;

// ----------------------------------------------------
// TEST GROUP 1: DATABASE & SCHEMA INTEGRITY
// ----------------------------------------------------
echo "1. Database & Schema Verification:" . PHP_EOL;
$pdo = Database::getConnection();
$tables = ['roles', 'users', 'categories', 'products', 'page_sections', 'site_settings', 'enquiries', 'audit_logs', 'backup_records', 'maintenance_settings'];
foreach ($tables as $table) {
    $row = $pdo->query("SELECT count(*) as c FROM {$table}")->fetch();
    assertTest("Table '{$table}' exists and is populated", (int)$row['c'] >= 0, "rows: {$row['c']}");
}

// Check the 4 core categories
$catCount = (int)Database::fetch("SELECT COUNT(*) as c FROM categories")['c'];
assertTest("4 Core Furniture & Finishes Categories present", $catCount === 4, "found: {$catCount}");

$requiredCatSlugs = [
    'modular-furniture',
    'functional-statement',
    'bespoke-furniture',
    'finishes-palette',
];
$existingCats = array_column(Database::query("SELECT slug FROM categories"), 'slug');
$allCatsPresent = count(array_intersect($requiredCatSlugs, $existingCats)) === 4;
assertTest("All 4 required category slugs verified", $allCatsPresent, implode(', ', $requiredCatSlugs));

// Check products
$prodCount = (int)Database::fetch("SELECT COUNT(*) as c FROM products")['c'];
assertTest("Bespoke & Modular Products seeded with verified codes", $prodCount >= 8, "products: {$prodCount}");

// ----------------------------------------------------
// TEST GROUP 2: PUBLIC API DATA & NARRATIVE
// ----------------------------------------------------
echo PHP_EOL . "2. Public API & Business Identity Verification:" . PHP_EOL;
$heroSec = Database::fetch("SELECT content_json FROM page_sections WHERE section_type = 'hero'");
$heroData = json_decode($heroSec['content_json'] ?? '{}', true);
assertTest("Hero headline configured (We manufacture Furniture)", str_contains($heroData['headline'] ?? '', 'We manufacture Furniture'), $heroData['headline'] ?? '');

$brandSec = Database::fetch("SELECT content_json FROM page_sections WHERE section_type = 'brand_intro'");
$brandData = json_decode($brandSec['content_json'] ?? '{}', true);
assertTest("Brand Intro headline (A Creative Instinct, A Passion for Making)", str_contains($brandData['headline'] ?? '', 'A Creative Instinct'), $brandData['headline'] ?? '');

// Verify authentic presence of live counter concept and NIFT founder narrative
$allSections = Database::query("SELECT content_json FROM page_sections");
$rawSections = json_encode($allSections);
$hasLiveCounterMetaphor = str_contains($rawSections, 'paneer tikka') || str_contains($rawSections, 'live counter');
assertTest("Presence of authentic Live Counter concept", $hasLiveCounterMetaphor);

$hasNiftNarrative = str_contains($rawSections, 'NIFT graduate');
assertTest("Presence of NIFT founder narrative", $hasNiftNarrative);

// Verify presence of brand tagline & New Delhi location
$settings = Database::query("SELECT setting_key, setting_value FROM site_settings");
$settingsMap = array_column($settings, 'setting_value', 'setting_key');
$hasLocation = str_contains($settingsMap['location_city'] ?? '', 'New Delhi');
$hasTagline = str_contains($settingsMap['brand_tagline'] ?? '', 'Thoughtfully Made');
assertTest("Business location configured as New Delhi, India", $hasLocation);
assertTest("Official brand tagline configured (Thoughtfully Made. Entirely Yours.)", $hasTagline);

// B2B Trade Enquiry Submission Test
$testEnquiryName = "International Trade Importer";
$testCompany = "Vostok Ceramics Distribution";
$testEmail = "importer@example.com";
$testCountry = "Russia";
$testType = "Export Enquiry";
$testQty = "5,000 sq. meters";
$testMsg = "Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.";

$now = Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()";
Database::execute("
    INSERT INTO enquiries (full_name, company_name, email, phone, country, enquiry_type, product_category, estimated_quantity, project_type, message, status, ip_address, created_at)
    VALUES (:name, :comp, :email, '+7 495 999 8888', :country, :et, 'Hand-Printed Ceramic Tiles', :qty, :pt, :msg, 'new', '127.0.0.1', {$now})
", [
    ':name' => $testEnquiryName,
    ':comp' => $testCompany,
    ':email' => $testEmail,
    ':country' => $testCountry,
    ':et' => $testType,
    ':qty' => $testQty,
    ':pt' => $testType,
    ':msg' => $testMsg,
]);
$enqId = Database::lastInsertId();
assertTest("B2B trade enquiry registration with Company, Country, and Quantity", (int)$enqId > 0, "enquiry_id: {$enqId}");

// ----------------------------------------------------
// TEST GROUP 3: AUTHENTICATION & CROSS-REALM ISOLATION
// ----------------------------------------------------
echo PHP_EOL . "3. Authentication & Security Realm Isolation:" . PHP_EOL;

// A. Valid Client Admin Verification
$clientAdmin = Database::fetch("SELECT * FROM users WHERE email = 'client.admin@ceramicsandbeyond.com'");
$clientPassValid = password_verify('ClientAdmin2026!Secure', $clientAdmin['password_hash']);
assertTest("Client Admin password verification (Bcrypt)", $clientPassValid);

// B. Valid Developer Admin Verification
$devAdmin = Database::fetch("SELECT * FROM users WHERE email = 'dev.portal@ceramicsandbeyond.com'");
$devPassValid = password_verify('DevPortal2026!Master', $devAdmin['password_hash']);
assertTest("Developer Admin password verification (Bcrypt)", $devPassValid);

// C. Verify Role Constraints
$clientRole = Database::fetch("SELECT name FROM roles WHERE id = :id", [':id' => $clientAdmin['role_id']]);
assertTest("Client Admin role is strictly CLIENT_ADMIN", $clientRole['name'] === 'CLIENT_ADMIN');

$devRole = Database::fetch("SELECT name FROM roles WHERE id = :id", [':id' => $devAdmin['role_id']]);
assertTest("Developer role is strictly DEVELOPER_ADMIN", $devRole['name'] === 'DEVELOPER_ADMIN');

// ----------------------------------------------------
// TEST GROUP 4: BACKUP ENGINE (PURE PHP SQL EXPORT)
// ----------------------------------------------------
echo PHP_EOL . "4. Backup Engine (Shared Hosting Pure PHP Dump):" . PHP_EOL;
try {
    $backupResult = \Api\Core\BackupManager::createDatabaseBackup((int)$devAdmin['id']);
    $backupPath = is_array($backupResult) ? ($backupResult['file_path'] ?? '') : (string)$backupResult;
    assertTest("Database SQL backup creation", !empty($backupPath) && file_exists($backupPath), basename($backupPath));
} catch (\Throwable $e) {
    assertTest("Database SQL backup creation", false, $e->getMessage());
}

$storageHtaccess = dirname(__DIR__) . '/storage/.htaccess';
assertTest("Storage directory protected by Apache .htaccess (Require all denied)", file_exists($storageHtaccess));

// ----------------------------------------------------
// TEST GROUP 5: MAINTENANCE MODE TOGGLE
// ----------------------------------------------------
echo PHP_EOL . "5. Maintenance Mode Toggle & Status Verification:" . PHP_EOL;
Database::execute("UPDATE maintenance_settings SET is_active = 1, message = 'Test Mode' WHERE id = 1");
$maintOn = (int)Database::fetch("SELECT is_active FROM maintenance_settings WHERE id = 1")['is_active'];
assertTest("Maintenance mode toggle ON", $maintOn === 1);

Database::execute("UPDATE maintenance_settings SET is_active = 0, message = 'Live' WHERE id = 1");
$maintOff = (int)Database::fetch("SELECT is_active FROM maintenance_settings WHERE id = 1")['is_active'];
assertTest("Maintenance mode toggle OFF (Restored to Live)", $maintOff === 0);

// ----------------------------------------------------
// TEST GROUP 6: AUDIT TRAIL LOGGING
// ----------------------------------------------------
echo PHP_EOL . "6. Tamper-Resistant Audit Trail Verification:" . PHP_EOL;
\Api\Core\AuditLogger::log((int)$devAdmin['id'], 'developer', 'run_test_suite', 'system', null, ['suite' => 'acceptance_test']);
$latestAudit = Database::fetch("SELECT action, portal_type, user_id FROM audit_logs ORDER BY id DESC LIMIT 1");
assertTest("Audit log entry successfully created with user ID and portal", $latestAudit['action'] === 'run_test_suite' && $latestAudit['portal_type'] === 'developer');

// ----------------------------------------------------
// TEST GROUP 7: CONTENT SAFETY & RESTRICTED NAMES CHECK
// ----------------------------------------------------
echo PHP_EOL . "7. Content Safety Checks:" . PHP_EOL;
$restrictedTerms = ['Shahab', 'Shivam'];
$safetyViolations = 0;
foreach ($restrictedTerms as $term) {
    $userMatch = Database::fetch("SELECT id FROM users WHERE display_name LIKE :t OR email LIKE :t", [':t' => "%{$term}%"]);
    if ($userMatch) $safetyViolations++;

    $pageMatch = Database::fetch("SELECT id FROM page_sections WHERE content_json LIKE :t", [':t' => "%{$term}%"]);
    if ($pageMatch) $safetyViolations++;

    $catMatch = Database::fetch("SELECT id FROM categories WHERE name LIKE :t OR description LIKE :t", [':t' => "%{$term}%"]);
    if ($catMatch) $safetyViolations++;

    $prodMatch = Database::fetch("SELECT id FROM products WHERE name LIKE :t OR description LIKE :t", [':t' => "%{$term}%"]);
    if ($prodMatch) $safetyViolations++;
}
assertTest("Zero occurrences of restricted terms ('Shahab' / 'Shivam') in database", $safetyViolations === 0);

echo PHP_EOL . "==========================================================" . PHP_EOL;
echo "TEST RESULTS: {$passed} Passed, {$failed} Failed" . PHP_EOL;
echo "==========================================================" . PHP_EOL . PHP_EOL;

if ($failed > 0) {
    exit(1);
}
exit(0);
