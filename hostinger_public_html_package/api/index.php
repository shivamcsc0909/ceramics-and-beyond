<?php
declare(strict_types=1);

/**
 * Ceramics & Beyond - API Front Controller
 * Handles Public, Client CMS, and Private Developer Portal API requests.
 */

// Autoload core & controllers
spl_autoload_register(function ($class) {
    $prefix = 'Api\\';
    $baseDir = __DIR__ . '/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    // Convert namespace to path: e.g. Core\Database -> core/Database.php
    $parts = explode('\\', $relativeClass);
    if (count($parts) > 1) {
        $parts[0] = strtolower($parts[0]);
    }
    $file = $baseDir . implode('/', $parts) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

use Api\Core\Router;
use Api\Controllers\AuthController;
use Api\Controllers\PublicController;
use Api\Controllers\ClientAdminController;
// Initial database check: only seed if pages table does not exist or is empty
try {
    $pdo = \Api\Core\Database::getConnection();
    $hasPages = false;
    try {
        $pageCount = (int)$pdo->query("SELECT COUNT(*) FROM pages")->fetchColumn();
        if ($pageCount > 0) {
            $hasPages = true;
        }
    } catch (\Throwable $e) {
        $hasPages = false;
    }

    if (!$hasPages) {
        ob_start();
        require_once __DIR__ . '/database/seed.php';
        ob_end_clean();
    }
} catch (\Throwable $e) {
    error_log('Database initialization check: ' . $e->getMessage());
}

$router = new Router();

// ==========================================
// 1. PUBLIC API ROUTES
// ==========================================
$router->get('/sitemap.xml', function() {
    require __DIR__ . '/sitemap.php';
});
$router->get('/api/sitemap.php', function() {
    require __DIR__ . '/sitemap.php';
});

$router->get('/api/public/settings', [PublicController::class, 'getSettings']);
$router->get('/api/public/maintenance', [PublicController::class, 'getMaintenanceStatus']);
$router->get('/api/public/homepage', [PublicController::class, 'getHomepage']);

// Ceramic Tile Categories & Products
$router->get('/api/public/categories', [PublicController::class, 'getCategories']);
$router->get('/api/public/categories/{slug}', [PublicController::class, 'getCategory']);
$router->get('/api/public/products', [PublicController::class, 'getProducts']);
$router->get('/api/public/products/{slug}', [PublicController::class, 'getProduct']);

// Backward compatibility collections
$router->get('/api/public/collections', [PublicController::class, 'getCollections']);
$router->get('/api/public/collections/{slug}', [PublicController::class, 'getCollection']);

// B2B Trade & Customer Enquiries
$router->post('/api/public/enquiry', [PublicController::class, 'submitEnquiry']);

// ==========================================
// 2. AUTHENTICATION ROUTES (SEPARATE REALMS)
// ==========================================
// Client Admin Realm
$router->post('/api/auth/client/login', [AuthController::class, 'clientLogin']);
$router->get('/api/auth/client/check', [AuthController::class, 'clientCheck']);
$router->post('/api/auth/client/logout', [AuthController::class, 'clientLogout']);

// Private Developer Portal Realm
$router->post('/api/auth/developer/login', [AuthController::class, 'developerLogin']);
$router->get('/api/auth/developer/check', [AuthController::class, 'developerCheck']);
$router->post('/api/auth/developer/logout', [AuthController::class, 'developerLogout']);

// CSRF Token retrieval
$router->get('/api/auth/csrf', [AuthController::class, 'csrfToken']);

// ==========================================
// 3. CLIENT CMS ADMIN ROUTES (/api/admin/*)
// Protected by Auth::requireRole(CLIENT_ADMIN)
// ==========================================
$router->get('/api/admin/dashboard', [ClientAdminController::class, 'getDashboardStats']);
$router->get('/api/admin/homepage/sections', [ClientAdminController::class, 'getHomepageSections']);
$router->put('/api/admin/homepage/sections/{id}', [ClientAdminController::class, 'updateHomepageSection']);
$router->post('/api/admin/homepage/reorder', [ClientAdminController::class, 'reorderHomepageSections']);

// Categories Manager
$router->get('/api/admin/categories', [ClientAdminController::class, 'getCategories']);
$router->post('/api/admin/categories', [ClientAdminController::class, 'saveCategory']);
$router->put('/api/admin/categories/{id}', [ClientAdminController::class, 'saveCategory']);
$router->delete('/api/admin/categories/{id}', [ClientAdminController::class, 'deleteCategory']);

// Products Manager (Ceramic Tiles)
$router->get('/api/admin/products', [ClientAdminController::class, 'getProducts']);
$router->post('/api/admin/products', [ClientAdminController::class, 'saveProduct']);
$router->put('/api/admin/products/{id}', [ClientAdminController::class, 'saveProduct']);
$router->delete('/api/admin/products/{id}', [ClientAdminController::class, 'deleteProduct']);

// Collections (Compatibility)
$router->get('/api/admin/collections', [ClientAdminController::class, 'getCollections']);
$router->post('/api/admin/collections', [ClientAdminController::class, 'saveCollection']);
$router->put('/api/admin/collections/{id}', [ClientAdminController::class, 'saveCollection']);
$router->delete('/api/admin/collections/{id}', [ClientAdminController::class, 'deleteCollection']);

// Media Library
$router->get('/api/admin/media', [ClientAdminController::class, 'getMediaList']);
$router->post('/api/admin/media/upload', [ClientAdminController::class, 'uploadMedia']);
$router->delete('/api/admin/media/{id}', [ClientAdminController::class, 'deleteMedia']);

// Trade & Customer Enquiries
$router->get('/api/admin/enquiries', [ClientAdminController::class, 'getEnquiries']);
$router->put('/api/admin/enquiries/{id}/status', [ClientAdminController::class, 'updateEnquiryStatus']);

// Site Settings
$router->get('/api/admin/settings', [ClientAdminController::class, 'getSettings']);
$router->put('/api/admin/settings', [ClientAdminController::class, 'updateSettings']);

// ==========================================
// 4. PRIVATE DEVELOPER PORTAL ROUTES (/api/developer/*)
// Protected by Auth::requireRole(DEVELOPER_ADMIN)
// ==========================================
$router->get('/api/developer/health', [DeveloperPortalController::class, 'getSystemHealth']);
$router->get('/api/developer/admins', [DeveloperPortalController::class, 'getAdmins']);
$router->post('/api/developer/admins', [DeveloperPortalController::class, 'createAdmin']);
$router->put('/api/developer/admins/{id}/status', [DeveloperPortalController::class, 'setAdminStatus']);
$router->put('/api/developer/admins/{id}/password', [DeveloperPortalController::class, 'resetAdminPassword']);

$router->get('/api/developer/logs', [DeveloperPortalController::class, 'getAuditLogs']);

$router->get('/api/developer/backups', [DeveloperPortalController::class, 'getBackups']);
$router->post('/api/developer/backups/database', [DeveloperPortalController::class, 'createDatabaseBackup']);
$router->post('/api/developer/backups/media', [DeveloperPortalController::class, 'createMediaBackup']);

$router->put('/api/developer/maintenance', [DeveloperPortalController::class, 'updateMaintenance']);

// Dispatch matching route
$router->dispatch();
