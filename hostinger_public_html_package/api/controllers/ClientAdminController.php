<?php
declare(strict_types=1);

namespace Api\Controllers;

use Api\Core\Auth;
use Api\Core\Database;
use Api\Core\Response;
use Api\Core\Security;
use Api\Core\AuditLogger;

class ClientAdminController
{
    private array $currentUser;

    public function __construct()
    {
        $this->currentUser = Auth::requireRole(Auth::ROLE_CLIENT_ADMIN, 'client');
    }

    public function getDashboardStats(): void
    {
        $productCount = Database::fetch("SELECT COUNT(*) as c FROM products")['c'] ?? 0;
        $categoryCount = Database::fetch("SELECT COUNT(*) as c FROM categories")['c'] ?? 0;
        $pageCount = Database::fetch("SELECT COUNT(*) as c FROM pages")['c'] ?? 0;
        $colCount = Database::fetch("SELECT COUNT(*) as c FROM collections")['c'] ?? 0;
        $enqCount = Database::fetch("SELECT COUNT(*) as c FROM enquiries WHERE status = 'new'")['c'] ?? 0;
        $mediaCount = Database::fetch("SELECT COUNT(*) as c FROM media")['c'] ?? 0;

        $recentEnquiries = Database::query("
            SELECT id, full_name, company_name, email, phone, country, enquiry_type, product_category, estimated_quantity, status, created_at 
            FROM enquiries 
            ORDER BY created_at DESC 
            LIMIT 6
        ");

        $recentRevisions = Database::query("
            SELECT entity_type, entity_id, created_at 
            FROM content_versions 
            ORDER BY created_at DESC 
            LIMIT 6
        ");

        Response::success([
            'counts' => [
                'products' => (int)$productCount,
                'categories' => (int)$categoryCount,
                'pages' => (int)$pageCount,
                'collections' => (int)$colCount,
                'unread_enquiries' => (int)$enqCount,
                'media' => (int)$mediaCount,
            ],
            'recent_enquiries' => $recentEnquiries,
            'recent_revisions' => $recentRevisions,
        ]);
    }

    // -------------------------------------------------------------
    // Homepage Sections
    // -------------------------------------------------------------
    public function getHomepageSections(): void
    {
        $page = Database::fetch("SELECT id FROM pages WHERE slug = 'home'");
        if (!$page) {
            Response::notFound('Homepage not found');
        }

        $sections = Database::query("
            SELECT id, section_type, section_order, is_visible, content_json, updated_at 
            FROM page_sections 
            WHERE page_id = :pid 
            ORDER BY section_order ASC
        ", [':pid' => $page['id']]);

        foreach ($sections as &$s) {
            $s['content'] = json_decode($s['content_json'], true);
            $s['is_visible'] = (bool)$s['is_visible'];
            unset($s['content_json']);
        }

        Response::success($sections);
    }

    public function updateHomepageSection(array $params, array $body): void
    {
        $id = (int)($params['id'] ?? 0);
        $section = Database::fetch("SELECT * FROM page_sections WHERE id = :id", [':id' => $id]);
        if (!$section) {
            Response::notFound('Section not found');
        }

        $now = Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()";

        // Save current version before updating
        Database::execute("
            INSERT INTO content_versions (entity_type, entity_id, version_data_json, created_by, created_at)
            VALUES ('page_section', :id, :data, :uid, {$now})
        ", [
            ':id' => $id,
            ':data' => $section['content_json'],
            ':uid' => $this->currentUser['id'],
        ]);

        $isVisible = isset($body['is_visible']) ? ($body['is_visible'] ? 1 : 0) : $section['is_visible'];
        $order = isset($body['section_order']) ? (int)$body['section_order'] : $section['section_order'];
        $content = isset($body['content']) ? json_encode($body['content']) : $section['content_json'];

        Database::execute("
            UPDATE page_sections 
            SET is_visible = :vis, section_order = :ord, content_json = :c, updated_at = {$now}
            WHERE id = :id
        ", [
            ':vis' => $isVisible,
            ':ord' => $order,
            ':c' => $content,
            ':id' => $id,
        ]);

        AuditLogger::log($this->currentUser['id'], 'client', 'update_homepage_section', 'page_section', $id, [
            'section_type' => $section['section_type'],
        ]);

        Response::success(null, 'Section updated successfully');
    }

    public function reorderHomepageSections(array $params, array $body): void
    {
        $orderList = $body['order'] ?? [];
        if (!is_array($orderList)) {
            Response::error('Invalid order payload', 422);
        }

        foreach ($orderList as $item) {
            $id = (int)($item['id'] ?? 0);
            $ord = (int)($item['order'] ?? 0);
            Database::execute("UPDATE page_sections SET section_order = :ord WHERE id = :id", [
                ':ord' => $ord,
                ':id' => $id,
            ]);
        }

        Response::success(null, 'Sections reordered');
    }

    // -------------------------------------------------------------
    // Product Categories (CRUD)
    // -------------------------------------------------------------
    public function getCategories(): void
    {
        $rows = Database::query("SELECT * FROM categories ORDER BY sort_order ASC, id ASC");
        Response::success($rows);
    }

    public function saveCategory(array $params, array $body): void
    {
        $id = !empty($params['id']) ? (int)$params['id'] : null;
        $name = Security::sanitizeString((string)($body['name'] ?? ''));
        $slug = Security::sanitizeString((string)($body['slug'] ?? ''));
        $subtitle = Security::sanitizeString((string)($body['subtitle'] ?? ''));
        $description = trim((string)($body['description'] ?? ''));
        $coverImageUrl = (string)($body['cover_image_url'] ?? '');
        $imageAlt = Security::sanitizeString((string)($body['image_alt'] ?? ''));
        $sortOrder = (int)($body['sort_order'] ?? 0);
        $status = in_array($body['status'] ?? '', ['draft', 'published'], true) ? $body['status'] : 'published';

        if (empty($name) || empty($slug)) {
            Response::error('Category name and slug are required', 422);
        }

        if ($id) {
            Database::execute("
                UPDATE categories 
                SET name = :n, slug = :s, subtitle = :sub, description = :d,
                    cover_image_url = :img, image_alt = :alt, sort_order = :ord, status = :st
                WHERE id = :id
            ", [
                ':n' => $name, ':s' => $slug, ':sub' => $subtitle, ':d' => $description,
                ':img' => $coverImageUrl, ':alt' => $imageAlt, ':ord' => $sortOrder, ':st' => $status,
                ':id' => $id,
            ]);
            AuditLogger::log($this->currentUser['id'], 'client', 'update_category', 'category', $id, ['name' => $name]);
            Response::success(['id' => $id], 'Category updated successfully');
        } else {
            Database::execute("
                INSERT INTO categories (name, slug, subtitle, description, cover_image_url, image_alt, sort_order, status)
                VALUES (:n, :s, :sub, :d, :img, :alt, :ord, :st)
            ", [
                ':n' => $name, ':s' => $slug, ':sub' => $subtitle, ':d' => $description,
                ':img' => $coverImageUrl, ':alt' => $imageAlt, ':ord' => $sortOrder, ':st' => $status,
            ]);
            $newId = (int)Database::lastInsertId();
            AuditLogger::log($this->currentUser['id'], 'client', 'create_category', 'category', $newId, ['name' => $name]);
            Response::success(['id' => $newId], 'Category created successfully');
        }
    }

    public function deleteCategory(array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        Database::execute("DELETE FROM categories WHERE id = :id", [':id' => $id]);
        AuditLogger::log($this->currentUser['id'], 'client', 'delete_category', 'category', $id);
        Response::success(null, 'Category deleted successfully');
    }

    // -------------------------------------------------------------
    // Products (Ceramic Tiles CRUD)
    // -------------------------------------------------------------
    public function getProducts(): void
    {
        $rows = Database::query("
            SELECT p.*, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.sort_order ASC, p.id ASC
        ");

        foreach ($rows as &$r) {
            $r['dimensions'] = json_decode($r['dimensions_json'] ?? '[]', true);
            $r['applications'] = json_decode($r['applications_json'] ?? '[]', true);
        }

        Response::success($rows);
    }

    public function saveProduct(array $params, array $body): void
    {
        $id = !empty($params['id']) ? (int)$params['id'] : null;
        $name = Security::sanitizeString((string)($body['name'] ?? ''));
        $slug = Security::sanitizeString((string)($body['slug'] ?? ''));
        $categorySlug = Security::sanitizeString((string)($body['category_slug'] ?? ''));
        $productCode = Security::sanitizeString((string)($body['product_code'] ?? ''));
        $shortDescription = trim((string)($body['short_description'] ?? ''));
        $description = trim((string)($body['description'] ?? ''));
        $patternDesign = Security::sanitizeString((string)($body['pattern_design'] ?? ''));
        $materialFinish = Security::sanitizeString((string)($body['material_finish'] ?? ''));
        $coverImageUrl = (string)($body['cover_image_url'] ?? '');
        $imageAlt = Security::sanitizeString((string)($body['image_alt'] ?? ''));
        $isFeatured = !empty($body['is_featured']) ? 1 : 0;
        $sortOrder = (int)($body['sort_order'] ?? 0);
        $status = in_array($body['status'] ?? '', ['draft', 'published'], true) ? $body['status'] : 'published';

        if (empty($name) || empty($slug)) {
            Response::error('Product name and slug are required', 422);
        }

        $cat = Database::fetch("SELECT id FROM categories WHERE slug = :cs", [':cs' => $categorySlug]);
        $categoryId = $cat ? (int)$cat['id'] : null;

        $dimJson = json_encode($body['dimensions'] ?? []);
        $appJson = json_encode($body['applications'] ?? []);

        if ($id) {
            Database::execute("
                UPDATE products 
                SET name = :n, slug = :s, category_id = :cid, category_slug = :cs, product_code = :pc,
                    short_description = :sd, description = :d, pattern_design = :pd, material_finish = :mf,
                    dimensions_json = :dim, applications_json = :app, cover_image_url = :cov, image_alt = :alt,
                    is_featured = :feat, sort_order = :ord, status = :st
                WHERE id = :id
            ", [
                ':n' => $name, ':s' => $slug, ':cid' => $categoryId, ':cs' => $categorySlug, ':pc' => $productCode,
                ':sd' => $shortDescription, ':d' => $description, ':pd' => $patternDesign, ':mf' => $materialFinish,
                ':dim' => $dimJson, ':app' => $appJson, ':cov' => $coverImageUrl, ':alt' => $imageAlt,
                ':feat' => $isFeatured, ':ord' => $sortOrder, ':st' => $status, ':id' => $id,
            ]);
            AuditLogger::log($this->currentUser['id'], 'client', 'update_product', 'product', $id, ['name' => $name]);
            Response::success(['id' => $id], 'Product updated successfully');
        } else {
            Database::execute("
                INSERT INTO products (name, slug, category_id, category_slug, product_code, short_description, description, pattern_design, material_finish, dimensions_json, applications_json, cover_image_url, image_alt, is_featured, sort_order, status)
                VALUES (:n, :s, :cid, :cs, :pc, :sd, :d, :pd, :mf, :dim, :app, :cov, :alt, :feat, :ord, :st)
            ", [
                ':n' => $name, ':s' => $slug, ':cid' => $categoryId, ':cs' => $categorySlug, ':pc' => $productCode,
                ':sd' => $shortDescription, ':d' => $description, ':pd' => $patternDesign, ':mf' => $materialFinish,
                ':dim' => $dimJson, ':app' => $appJson, ':cov' => $coverImageUrl, ':alt' => $imageAlt,
                ':feat' => $isFeatured, ':ord' => $sortOrder, ':st' => $status,
            ]);
            $newId = (int)Database::lastInsertId();
            AuditLogger::log($this->currentUser['id'], 'client', 'create_product', 'product', $newId, ['name' => $name]);
            Response::success(['id' => $newId], 'Product created successfully');
        }
    }

    public function deleteProduct(array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        Database::execute("DELETE FROM products WHERE id = :id", [':id' => $id]);
        AuditLogger::log($this->currentUser['id'], 'client', 'delete_product', 'product', $id);
        Response::success(null, 'Product deleted successfully');
    }

    // -------------------------------------------------------------
    // Collections (Backward Compatibility CRUD)
    // -------------------------------------------------------------
    public function getCollections(): void
    {
        $rows = Database::query("SELECT * FROM collections ORDER BY sort_order ASC, id ASC");
        foreach ($rows as &$r) {
            $r['characteristics'] = json_decode($r['characteristics_json'] ?? '[]', true);
            $r['finishes'] = json_decode($r['finishes_json'] ?? '[]', true);
            $r['applications'] = json_decode($r['applications_json'] ?? '[]', true);
            $r['features'] = json_decode($r['features_json'] ?? '[]', true);
        }
        Response::success($rows);
    }

    public function saveCollection(array $params, array $body): void
    {
        $id = !empty($params['id']) ? (int)$params['id'] : null;
        $title = Security::sanitizeString((string)($body['title'] ?? ''));
        $slug = Security::sanitizeString((string)($body['slug'] ?? ''));
        $subtitle = Security::sanitizeString((string)($body['subtitle'] ?? ''));
        $category = Security::sanitizeString((string)($body['category'] ?? ''));
        $description = trim((string)($body['description'] ?? ''));
        $coverImageUrl = (string)($body['cover_image_url'] ?? '');
        $imageAlt = Security::sanitizeString((string)($body['image_alt'] ?? ''));
        $status = in_array($body['status'] ?? '', ['draft', 'published'], true) ? $body['status'] : 'published';

        if (empty($title) || empty($slug)) {
            Response::error('Title and slug are required', 422);
        }

        $charJson = json_encode($body['characteristics'] ?? []);
        $finJson = json_encode($body['finishes'] ?? []);
        $appJson = json_encode($body['applications'] ?? []);
        $featJson = json_encode($body['features'] ?? []);

        if ($id) {
            Database::execute("
                UPDATE collections 
                SET title = :t, slug = :s, subtitle = :sub, category = :cat, description = :d,
                    cover_image_url = :cov, image_alt = :alt, characteristics_json = :char,
                    finishes_json = :fin, applications_json = :app, features_json = :feat, status = :st
                WHERE id = :id
            ", [
                ':t' => $title, ':s' => $slug, ':sub' => $subtitle, ':cat' => $category, ':d' => $description,
                ':cov' => $coverImageUrl, ':alt' => $imageAlt, ':char' => $charJson, ':fin' => $finJson,
                ':app' => $appJson, ':feat' => $featJson, ':st' => $status, ':id' => $id,
            ]);
            AuditLogger::log($this->currentUser['id'], 'client', 'update_collection', 'collection', $id, ['title' => $title]);
            Response::success(['id' => $id], 'Collection updated');
        } else {
            Database::execute("
                INSERT INTO collections (slug, title, subtitle, category, description, cover_image_url, image_alt, characteristics_json, finishes_json, applications_json, features_json, status)
                VALUES (:s, :t, :sub, :cat, :d, :cov, :alt, :char, :fin, :app, :feat, :st)
            ", [
                ':s' => $slug, ':t' => $title, ':sub' => $subtitle, ':cat' => $category, ':d' => $description,
                ':cov' => $coverImageUrl, ':alt' => $imageAlt, ':char' => $charJson, ':fin' => $finJson,
                ':app' => $appJson, ':feat' => $featJson, ':st' => $status,
            ]);
            $newId = (int)Database::lastInsertId();
            AuditLogger::log($this->currentUser['id'], 'client', 'create_collection', 'collection', $newId, ['title' => $title]);
            Response::success(['id' => $newId], 'Collection created');
        }
    }

    public function deleteCollection(array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        Database::execute("DELETE FROM collections WHERE id = :id", [':id' => $id]);
        AuditLogger::log($this->currentUser['id'], 'client', 'delete_collection', 'collection', $id);
        Response::success(null, 'Collection deleted');
    }

    // -------------------------------------------------------------
    // Enquiries (B2B Trade Enquiries with CSV Export)
    // -------------------------------------------------------------
    public function getEnquiries(): void
    {
        $status = $_GET['status'] ?? null;
        $sql = "SELECT * FROM enquiries";
        $params = [];
        if ($status && in_array($status, ['new', 'in_review', 'contacted', 'archived'], true)) {
            $sql .= " WHERE status = :st";
            $params[':st'] = $status;
        }
        $sql .= " ORDER BY created_at DESC";
        $rows = Database::query($sql, $params);
        Response::success($rows);
    }

    public function updateEnquiryStatus(array $params, array $body): void
    {
        $id = (int)($params['id'] ?? 0);
        $status = $body['status'] ?? 'in_review';
        if (!in_array($status, ['new', 'in_review', 'contacted', 'archived'], true)) {
            Response::error('Invalid enquiry status', 422);
        }
        Database::execute("UPDATE enquiries SET status = :st WHERE id = :id", [
            ':st' => $status,
            ':id' => $id,
        ]);
        AuditLogger::log($this->currentUser['id'], 'client', 'update_enquiry_status', 'enquiry', $id, ['new_status' => $status]);
        Response::success(null, 'Enquiry status updated');
    }

    // -------------------------------------------------------------
    // Media Library
    // -------------------------------------------------------------
    public function getMediaList(): void
    {
        $rows = Database::query("SELECT * FROM media ORDER BY created_at DESC");
        Response::success($rows);
    }

    public function uploadMedia(): void
    {
        if (empty($_FILES['file'])) {
            Response::error('No file provided for upload', 422);
        }

        try {
            $fileData = Security::validateAndStoreUpload($_FILES['file']);
            $altText = Security::sanitizeString((string)($_POST['alt_text'] ?? $fileData['original_name']));
            $now = Database::getDriver() === 'sqlite' ? "datetime('now')" : "NOW()";

            Database::execute("
                INSERT INTO media (filename, original_name, file_path, file_size, mime_type, width, height, alt_text, uploaded_by, created_at)
                VALUES (:fn, :on, :fp, :fs, :mime, :w, :h, :alt, :uid, {$now})
            ", [
                ':fn' => $fileData['filename'],
                ':on' => $fileData['original_name'],
                ':fp' => $fileData['file_path'],
                ':fs' => $fileData['file_size'],
                ':mime' => $fileData['mime_type'],
                ':w' => $fileData['width'],
                ':h' => $fileData['height'],
                ':alt' => $altText,
                ':uid' => $this->currentUser['id'],
            ]);

            $id = (int)Database::lastInsertId();
            AuditLogger::log($this->currentUser['id'], 'client', 'upload_media', 'media', $id, ['filename' => $fileData['filename']]);

            Response::success(array_merge($fileData, ['id' => $id, 'alt_text' => $altText]), 'Media uploaded successfully');
        } catch (\Exception $e) {
            Response::error($e->getMessage(), 400);
        }
    }

    public function deleteMedia(array $params): void
    {
        $id = (int)($params['id'] ?? 0);
        $media = Database::fetch("SELECT * FROM media WHERE id = :id", [':id' => $id]);
        if (!$media) {
            Response::notFound('Media not found');
        }

        $fullPath = dirname(__DIR__, 2) . $media['file_path'];
        if (file_exists($fullPath)) {
            @unlink($fullPath);
        }

        Database::execute("DELETE FROM media WHERE id = :id", [':id' => $id]);
        AuditLogger::log($this->currentUser['id'], 'client', 'delete_media', 'media', $id, ['filename' => $media['filename']]);

        Response::success(null, 'Media file removed');
    }

    // -------------------------------------------------------------
    // Site Settings
    // -------------------------------------------------------------
    public function getSettings(): void
    {
        $rows = Database::query("SELECT setting_key, setting_value, category FROM site_settings");
        $settings = [];
        foreach ($rows as $r) {
            $settings[$r['setting_key']] = $r['setting_value'];
        }
        Response::success($settings);
    }

    public function updateSettings(array $params, array $body): void
    {
        $settings = $body['settings'] ?? [];
        if (!is_array($settings)) {
            Response::error('Invalid settings payload', 422);
        }

        foreach ($settings as $key => $val) {
            $safeVal = is_string($val) ? trim($val) : json_encode($val);
            Database::execute("
                UPDATE site_settings SET setting_value = :v WHERE setting_key = :k
            ", [
                ':v' => $safeVal,
                ':k' => $key,
            ]);
        }

        AuditLogger::log($this->currentUser['id'], 'client', 'update_site_settings', 'settings', null, ['keys' => array_keys($settings)]);
        Response::success(null, 'Site settings updated');
    }
}
