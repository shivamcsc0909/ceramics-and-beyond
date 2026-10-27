<?php
declare(strict_types=1);

namespace Api\Controllers;

use Api\Core\Database;
use Api\Core\Response;
use Api\Core\Security;

class PublicController
{
    public function getSettings(): void
    {
        $rows = Database::query("SELECT setting_key, setting_value FROM site_settings");
        $settings = [];
        foreach ($rows as $row) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
        Response::success($settings);
    }

    public function getMaintenanceStatus(): void
    {
        $status = Database::fetch("SELECT is_active, message FROM maintenance_settings WHERE id = 1");
        $clientIp = Security::getClientIp();

        $isActive = (bool)($status['is_active'] ?? false);
        $allowedIps = [];

        if ($isActive) {
            $row = Database::fetch("SELECT allowed_ips_json FROM maintenance_settings WHERE id = 1");
            if (!empty($row['allowed_ips_json'])) {
                $allowedIps = json_decode($row['allowed_ips_json'], true) ?: [];
            }
            if (in_array($clientIp, $allowedIps, true)) {
                $isActive = false; // Exempted IP
            }
        }

        Response::success([
            'is_maintenance' => $isActive,
            'message' => $status['message'] ?? 'Site under maintenance',
        ]);
    }

    public function getHomepage(): void
    {
        $page = Database::fetch("SELECT * FROM pages WHERE slug = 'home' AND status = 'published'");
        if (!$page) {
            Response::notFound('Homepage configuration not found.');
        }

        $sections = Database::query("
            SELECT id, section_type, section_order, content_json 
            FROM page_sections 
            WHERE page_id = :pid AND is_visible = 1 
            ORDER BY section_order ASC
        ", [':pid' => $page['id']]);

        foreach ($sections as &$sec) {
            $sec['content'] = json_decode($sec['content_json'], true);
            unset($sec['content_json']);
        }

        $page['sections'] = $sections;
        Response::success($page);
    }

    // -------------------------------------------------------------
    // Product Categories
    // -------------------------------------------------------------
    public function getCategories(): void
    {
        $categories = Database::query("
            SELECT id, slug, name, subtitle, description, cover_image_url, image_alt, sort_order
            FROM categories 
            WHERE status = 'published' 
            ORDER BY sort_order ASC, id ASC
        ");

        // Attach product count to each category
        foreach ($categories as &$cat) {
            $countRow = Database::fetch("
                SELECT COUNT(*) as c FROM products 
                WHERE category_slug = :slug AND status = 'published'
            ", [':slug' => $cat['slug']]);
            $cat['product_count'] = (int)($countRow['c'] ?? 0);
        }

        Response::success($categories);
    }

    public function getCategory(array $params): void
    {
        $slug = $params['slug'] ?? '';
        $category = Database::fetch("
            SELECT * FROM categories WHERE slug = :slug AND status = 'published'
        ", [':slug' => $slug]);

        if (!$category) {
            Response::notFound('Category not found.');
        }

        $products = Database::query("
            SELECT id, slug, name, product_code, short_description, pattern_design, material_finish,
                   dimensions_json, cover_image_url, image_alt, is_featured
            FROM products 
            WHERE category_slug = :slug AND status = 'published'
            ORDER BY sort_order ASC, id ASC
        ", [':slug' => $slug]);

        foreach ($products as &$p) {
            $p['dimensions'] = json_decode($p['dimensions_json'] ?? '[]', true);
            unset($p['dimensions_json']);
        }

        $category['products'] = $products;
        Response::success($category);
    }

    // -------------------------------------------------------------
    // Products (Ceramic Tiles)
    // -------------------------------------------------------------
    public function getProducts(): void
    {
        $categorySlug = $_GET['category'] ?? null;
        $isFeatured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;
        $search = trim($_GET['search'] ?? '');

        $sql = "
            SELECT p.id, p.category_id, p.category_slug, p.slug, p.name, p.product_code,
                   p.short_description, p.pattern_design, p.material_finish, p.dimensions_json,
                   p.applications_json, p.cover_image_url, p.image_alt, p.is_featured, p.sort_order,
                   c.name as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.status = 'published'
        ";
        $bindings = [];

        if (!empty($categorySlug)) {
            $sql .= " AND p.category_slug = :cat";
            $bindings[':cat'] = $categorySlug;
        }

        if ($isFeatured !== null) {
            $sql .= " AND p.is_featured = :feat";
            $bindings[':feat'] = $isFeatured;
        }

        if (!empty($search)) {
            $sql .= " AND (p.name LIKE :q OR p.product_code LIKE :q OR p.pattern_design LIKE :q OR p.description LIKE :q)";
            $bindings[':q'] = "%{$search}%";
        }

        $sql .= " ORDER BY p.sort_order ASC, p.id ASC";

        $products = Database::query($sql, $bindings);

        foreach ($products as &$p) {
            $p['dimensions'] = json_decode($p['dimensions_json'] ?? '[]', true);
            $p['applications'] = json_decode($p['applications_json'] ?? '[]', true);
            unset($p['dimensions_json'], $p['applications_json']);
        }

        Response::success($products);
    }

    public function getProduct(array $params): void
    {
        $slug = $params['slug'] ?? '';
        $product = Database::fetch("
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.slug = :slug AND p.status = 'published'
        ", [':slug' => $slug]);

        if (!$product) {
            Response::notFound('Product not found.');
        }

        $product['dimensions'] = json_decode($product['dimensions_json'] ?? '[]', true);
        $product['applications'] = json_decode($product['applications_json'] ?? '[]', true);
        unset($product['dimensions_json'], $product['applications_json']);

        // Product gallery images
        $gallery = Database::query("
            SELECT image_url, alt_text, caption 
            FROM product_images 
            WHERE product_id = :pid 
            ORDER BY sort_order ASC
        ", [':pid' => $product['id']]);
        $product['gallery'] = $gallery;

        // Related products in the same category
        $related = Database::query("
            SELECT id, slug, name, product_code, short_description, cover_image_url, image_alt, pattern_design
            FROM products 
            WHERE category_slug = :cat AND id != :pid AND status = 'published'
            ORDER BY sort_order ASC, id ASC
            LIMIT 4
        ", [
            ':cat' => $product['category_slug'],
            ':pid' => $product['id'],
        ]);
        $product['related_products'] = $related;

        Response::success($product);
    }

    // -------------------------------------------------------------
    // Collections (Backward Compatibility Layer)
    // -------------------------------------------------------------
    public function getCollections(): void
    {
        $collections = Database::query("
            SELECT id, slug, title, subtitle, category, description, cover_image_url, image_alt,
                   characteristics_json, finishes_json, applications_json, features_json
            FROM collections 
            WHERE status = 'published' 
            ORDER BY sort_order ASC, id ASC
        ");

        foreach ($collections as &$col) {
            $col['characteristics'] = json_decode($col['characteristics_json'] ?? '[]', true);
            $col['finishes'] = json_decode($col['finishes_json'] ?? '[]', true);
            $col['applications'] = json_decode($col['applications_json'] ?? '[]', true);
            $col['features'] = json_decode($col['features_json'] ?? '[]', true);
            unset($col['characteristics_json'], $col['finishes_json'], $col['applications_json'], $col['features_json']);
        }

        Response::success($collections);
    }

    public function getCollection(array $params): void
    {
        $slug = $params['slug'] ?? '';
        $collection = Database::fetch("
            SELECT * FROM collections WHERE slug = :slug AND status = 'published'
        ", [':slug' => $slug]);

        if (!$collection) {
            Response::notFound('Collection not found.');
        }

        $collection['characteristics'] = json_decode($collection['characteristics_json'] ?? '[]', true);
        $collection['finishes'] = json_decode($collection['finishes_json'] ?? '[]', true);
        $collection['applications'] = json_decode($collection['applications_json'] ?? '[]', true);
        $collection['features'] = json_decode($collection['features_json'] ?? '[]', true);
        unset($collection['characteristics_json'], $collection['finishes_json'], $collection['applications_json'], $collection['features_json']);

        Response::success($collection);
    }

    // -------------------------------------------------------------
    // B2B Trade & Customer Enquiries
    // -------------------------------------------------------------
    public function submitEnquiry(array $params, array $body): void
    {
        $name = Security::sanitizeString((string)($body['fullName'] ?? $body['full_name'] ?? ''));
        $companyName = Security::sanitizeString((string)($body['companyName'] ?? $body['company_name'] ?? ''));
        $email = trim((string)($body['email'] ?? ''));
        $phone = Security::sanitizeString((string)($body['phone'] ?? ''));
        $country = Security::sanitizeString((string)($body['country'] ?? 'India'));
        $enquiryType = Security::sanitizeString((string)($body['enquiryType'] ?? $body['enquiry_type'] ?? 'General Business'));
        $productCategory = Security::sanitizeString((string)($body['productCategory'] ?? $body['product_category'] ?? ''));
        $estimatedQuantity = Security::sanitizeString((string)($body['estimatedQuantity'] ?? $body['estimated_quantity'] ?? ''));
        $message = Security::sanitizeString((string)($body['message'] ?? ''));

        if (empty($name)) {
            Response::error('Full name is required', 422);
        }
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::error('A valid business email address is required', 422);
        }
        if (empty($phone)) {
            Response::error('Phone number is required', 422);
        }
        if (empty($message) || strlen($message) < 10) {
            Response::error('Please provide at least 10 characters describing your requirement or enquiry', 422);
        }

        $ip = Security::getClientIp();
        $now = Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()";

        Database::execute("
            INSERT INTO enquiries (full_name, company_name, email, phone, country, enquiry_type, product_category, estimated_quantity, project_type, message, status, ip_address, created_at)
            VALUES (:name, :comp, :email, :phone, :country, :et, :cat, :qty, :pt, :msg, 'new', :ip, {$now})
        ", [
            ':name' => $name,
            ':comp' => $companyName,
            ':email' => $email,
            ':phone' => $phone,
            ':country' => $country,
            ':et' => $enquiryType,
            ':cat' => $productCategory,
            ':qty' => $estimatedQuantity,
            ':pt' => $enquiryType,
            ':msg' => $message,
            ':ip' => $ip,
        ]);

        Response::success([
            'reference_id' => Database::lastInsertId(),
            'name' => $name,
            'company' => $companyName,
        ], 'Your trade enquiry has been submitted to Ceramics & Beyond. Our export/commercial sales team will respond promptly.');
    }
}
