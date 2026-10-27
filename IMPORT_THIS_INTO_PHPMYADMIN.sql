/* ====================================================================
   CERAMICS & BEYOND — PRODUCTION MYSQL / MARIADB IMPORT DUMP
   Tested for Hostinger Shared Hosting (MySQL 8.0+ / MariaDB 10.5+)
   Brand: Thoughtfully Made. Entirely Yours.
   ==================================================================== */

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

/* --------------------------------------------------------------------
   STEP 1: CLEAN DROP OF EXISTING TABLES (REVERSE DEPENDENCY ORDER)
   -------------------------------------------------------------------- */
DROP TABLE IF EXISTS `backup_records`, `audit_logs`, `content_versions`, `maintenance_settings`, `site_settings`, `enquiries`, `media`, `collection_images`, `collections`, `product_images`, `products`, `categories`, `page_sections`, `pages`, `sessions`, `login_attempts`, `users`, `roles`;

/* --------------------------------------------------------------------
   STEP 2: CREATE PRODUCTION TABLES
   -------------------------------------------------------------------- */
-- Ceramics & Beyond - Production MySQL / MariaDB Database Schema
-- Compatible with Hostinger Shared Hosting (MySQL 8.0+ / MariaDB 10.5+)



-- 1. Roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `role_id` INT UNSIGNED NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `display_name` VARCHAR(100) NOT NULL,
  `status` ENUM('active', 'revoked', 'locked') NOT NULL DEFAULT 'active',
  `failed_logins` INT UNSIGNED NOT NULL DEFAULT 0,
  `lockout_until` DATETIME NULL,
  `last_login_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_role_status` (`role_id`, `status`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Login Attempts & Rate Limiting
CREATE TABLE IF NOT EXISTS `login_attempts` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `ip_address` VARCHAR(45) NOT NULL,
  `portal_type` VARCHAR(20) NOT NULL,
  `email_attempted` VARCHAR(150) NOT NULL,
  `successful` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_ip_portal_time` (`ip_address`, `portal_type`, `created_at`),
  INDEX `idx_email_portal_time` (`email_attempted`, `portal_type`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` VARCHAR(128) PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `portal_type` VARCHAR(20) NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `user_agent` TEXT NULL,
  `last_activity` INT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_user_portal` (`user_id`, `portal_type`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Pages
CREATE TABLE IF NOT EXISTS `pages` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(200) NOT NULL,
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `og_image_url` VARCHAR(500) NULL,
  `status` ENUM('draft', 'published') NOT NULL DEFAULT 'published',
  `updated_by` INT UNSIGNED NULL,
  `published_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug_status` (`slug`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Page Sections
CREATE TABLE IF NOT EXISTS `page_sections` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `page_id` INT UNSIGNED NOT NULL,
  `section_type` VARCHAR(50) NOT NULL,
  `section_order` INT NOT NULL DEFAULT 0,
  `is_visible` TINYINT(1) NOT NULL DEFAULT 1,
  `content_json` LONGTEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_page_order` (`page_id`, `section_order`),
  CONSTRAINT `fk_sections_page` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Product Categories (Hand-Printed, Handmade, Sandblast, Border, Mosaic, Decorative)
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(200) NOT NULL,
  `subtitle` VARCHAR(255) NULL,
  `description` TEXT NOT NULL,
  `cover_image_url` VARCHAR(500) NOT NULL,
  `image_alt` VARCHAR(255) NOT NULL,
  `status` ENUM('draft', 'published') NOT NULL DEFAULT 'published',
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_cat_slug_status` (`slug`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Products (Bespoke & Modular Furniture Creations)
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT UNSIGNED NULL,
  `category_slug` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `name` VARCHAR(200) NOT NULL,
  `product_code` VARCHAR(50) NULL,
  `short_description` VARCHAR(300) NOT NULL,
  `description` TEXT NOT NULL,
  `pattern_design` VARCHAR(200) NULL,
  `material_finish` VARCHAR(200) NULL,
  `dimensions_json` TEXT NULL,
  `applications_json` TEXT NULL,
  `technical_sheet_url` VARCHAR(500) NULL,
  `cover_image_url` VARCHAR(500) NOT NULL,
  `image_alt` VARCHAR(255) NOT NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('draft', 'published') NOT NULL DEFAULT 'published',
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_prod_slug_status` (`slug`, `status`),
  INDEX `idx_prod_cat` (`category_slug`),
  CONSTRAINT `fk_prod_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Product Images
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255) NOT NULL,
  `caption` VARCHAR(255) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  CONSTRAINT `fk_prod_img_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Collections (Compatibility / Alias Layer)
CREATE TABLE IF NOT EXISTS `collections` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(200) NOT NULL,
  `subtitle` VARCHAR(200) NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `cover_image_url` VARCHAR(500) NOT NULL,
  `image_alt` VARCHAR(255) NOT NULL,
  `characteristics_json` TEXT NULL,
  `finishes_json` TEXT NULL,
  `applications_json` TEXT NULL,
  `features_json` TEXT NULL,
  `status` ENUM('draft', 'published') NOT NULL DEFAULT 'published',
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_col_slug_status` (`slug`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Collection Images
CREATE TABLE IF NOT EXISTS `collection_images` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `collection_id` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255) NOT NULL,
  `caption` VARCHAR(255) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  CONSTRAINT `fk_col_img_collection` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Media Library
CREATE TABLE IF NOT EXISTS `media` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(500) NOT NULL,
  `file_size` INT UNSIGNED NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `width` INT UNSIGNED NULL,
  `height` INT UNSIGNED NULL,
  `alt_text` VARCHAR(255) NULL,
  `uploaded_by` INT UNSIGNED NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_media_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Enquiries (B2B Trade & Product Enquiries)
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `company_name` VARCHAR(150) NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `country` VARCHAR(100) NULL DEFAULT 'India',
  `enquiry_type` VARCHAR(100) NOT NULL DEFAULT 'General Business',
  `product_category` VARCHAR(128) NULL,
  `estimated_quantity` VARCHAR(100) NULL,
  `project_type` VARCHAR(100) NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'in_review', 'contacted', 'archived') NOT NULL DEFAULT 'new',
  `ip_address` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_enq_status` (`status`),
  INDEX `idx_enq_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Site Settings
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` LONGTEXT NOT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'general',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. Content Versions (Revision History)
CREATE TABLE IF NOT EXISTS `content_versions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `entity_type` VARCHAR(50) NOT NULL,
  `entity_id` INT UNSIGNED NOT NULL,
  `version_data_json` LONGTEXT NOT NULL,
  `created_by` INT UNSIGNED NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_entity_version` (`entity_type`, `entity_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. Audit Logs
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NULL,
  `portal_type` VARCHAR(20) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity_type` VARCHAR(50) NULL,
  `entity_id` INT UNSIGNED NULL,
  `details_json` LONGTEXT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_audit_user` (`user_id`, `created_at`),
  INDEX `idx_audit_action` (`action`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. Maintenance Settings
CREATE TABLE IF NOT EXISTS `maintenance_settings` (
  `id` INT UNSIGNED PRIMARY KEY DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 0,
  `message` TEXT NOT NULL,
  `reason` VARCHAR(255) NULL,
  `activated_by` INT UNSIGNED NULL,
  `activated_at` DATETIME NULL,
  `allowed_ips_json` TEXT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. Backup Records
CREATE TABLE IF NOT EXISTS `backup_records` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(500) NOT NULL,
  `backup_type` VARCHAR(50) NOT NULL,
  `file_size` BIGINT UNSIGNED NOT NULL,
  `created_by` INT UNSIGNED NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'completed',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_backup_time` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* --------------------------------------------------------------------
   STEP 3: SEED PRODUCTION DATA (REPLACE INTO FOR IDEMPOTENCY)
   -------------------------------------------------------------------- */

/* Data for roles (2 rows) */
REPLACE INTO `roles` (`id`, `name`, `description`, `created_at`) VALUES ('1', 'CLIENT_ADMIN', 'Client content and collections manager', '2026-10-15 06:01:44');
REPLACE INTO `roles` (`id`, `name`, `description`, `created_at`) VALUES ('2', 'DEVELOPER_ADMIN', 'Private system administrator', '2026-10-15 06:01:44');

/* Data for users (2 rows) */
REPLACE INTO `users` (`id`, `role_id`, `email`, `password_hash`, `display_name`, `status`, `failed_logins`, `lockout_until`, `last_login_at`, `created_at`, `updated_at`) VALUES ('1', '1', 'client.admin@ceramicsandbeyond.com', '$2y$12$xO993b4a20mANjtJy7evs.PKkENgd50e1LdnD9JfH/qiwN2ANgZei', 'Client Administrator', 'active', '0', NULL, '2026-10-15 06:03:37', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
REPLACE INTO `users` (`id`, `role_id`, `email`, `password_hash`, `display_name`, `status`, `failed_logins`, `lockout_until`, `last_login_at`, `created_at`, `updated_at`) VALUES ('2', '2', 'dev.portal@ceramicsandbeyond.com', '$2y$12$c7G5l5UtGiUMYYvR147J5.Nh5eIkI9jY3iNZkRxzSkdzS5Y5QCtGG', 'Principal System Architect', 'active', '0', NULL, '2026-10-15 10:48:15', '2026-10-15 06:01:45', '2026-10-15 06:01:45');

/* Data for categories (4 rows) */
REPLACE INTO `categories` (`id`, `slug`, `name`, `subtitle`, `description`, `cover_image_url`, `image_alt`, `status`, `sort_order`, `created_at`, `updated_at`) VALUES ('7', 'modular-furniture', 'Modular Furniture', 'Kitchens, Wardrobes, Doors', 'Precision-engineered modular kitchens, walk-in closets, and flush architectural doors fitted exclusively with German Blum, Hettich, and Hafele hardware.', '/images/fluted-island-kitchen.jpeg', 'Modular kitchen island with seamless finishes and integrated German hardware', 'published', '1', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `categories` (`id`, `slug`, `name`, `subtitle`, `description`, `cover_image_url`, `image_alt`, `status`, `sort_order`, `created_at`, `updated_at`) VALUES ('8', 'functional-statement', 'Functional & Statement Pieces', 'TV Panels, Vanities, Bars, Mandirs & Consoles', 'Architectural living room TV panels, waterproof PU bathroom vanities, sacred mandirs, private home bars, bookshelves, consoles, and shoe racks made for the way you live.', '/images/floating-tv-console.jpeg', 'Modern fluted TV unit console and architectural living room paneling', 'published', '2', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `categories` (`id`, `slug`, `name`, `subtitle`, `description`, `cover_image_url`, `image_alt`, `status`, `sort_order`, `created_at`, `updated_at`) VALUES ('9', 'bespoke-furniture', 'Bespoke Furniture', 'Beds, Dining Tables, Coffee & Accent Pieces', 'Completely made-to-order beds, solid wood and veneer dining tables, sculptural centre tables, side consoles, and customised creations tailored to your exact space.', '/images/dining-hall.jpeg', 'Bespoke wooden dining table and designer chairs handcrafted with organic curves', 'published', '3', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `categories` (`id`, `slug`, `name`, `subtitle`, `description`, `cover_image_url`, `image_alt`, `status`, `sort_order`, `created_at`, `updated_at`) VALUES ('10', 'finishes-palette', 'Finishes & Materials Palette', 'Specialty PU Paint, Natural Veneer, Duco, Glass & Rattan', 'Specialty PU Paint with unlimited RAL & Pantone colour matching, rich natural wood veneers, duco lacquer, tinted glass, acrylic, raw wood, and artisanal combinations including rattan and louvers.', '/images/finishes-palette.jpeg', 'Specialty finishes swatches including PU paint and natural wood veneer', 'published', '4', '2026-10-20 20:12:01', '2026-10-20 20:12:01');

/* Data for products (8 rows) */
REPLACE INTO `products` (`id`, `category_id`, `category_slug`, `slug`, `name`, `product_code`, `short_description`, `description`, `pattern_design`, `material_finish`, `dimensions_json`, `applications_json`, `technical_sheet_url`, `cover_image_url`, `image_alt`, `is_featured`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('9', '7', 'modular-furniture', 'atelier-modular-kitchen-island', 'Atelier Modular Kitchen & Island', 'CB-KIT-01', 'Precision engineered modular kitchen with concealed handle profiles, German Blum runners, and PU finish.', 'Custom island and cabinetry system featuring Blum motion technology, anti-scratch matte PU paint, quartz surfaces, and fully tailored corner solutions.', 'Contemporary Minimalist with Seamless Gola Profile', 'Specialty Matte PU Paint & Fluted Oak Veneer', '["Bespoke Custom Dimensions","Standard depth 600mm \/ Counter 860mm"]', '["Open Concept Kitchens","Island Dining","Walk-in Pantries"]', NULL, '/images/fluted-island-kitchen.jpeg', 'Atelier modular kitchen with seamless island and integrated German hardware', '1', 'published', NULL, NULL, '1', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `products` (`id`, `category_id`, `category_slug`, `slug`, `name`, `product_code`, `short_description`, `description`, `pattern_design`, `material_finish`, `dimensions_json`, `applications_json`, `technical_sheet_url`, `cover_image_url`, `image_alt`, `is_featured`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('10', '7', 'modular-furniture', 'signature-walk-in-wardrobe', 'Signature Walk-In Wardrobe Suite', 'CB-WRD-02', 'Floor-to-ceiling modular wardrobe system with sensor LED profiles, tinted glass doors, and soft-close drawers.', 'Modular wardrobe with custom accessory trays, velvet jewelry compartments, illuminated hanging rails, and dust-proof magnetic seals.', 'Floor-to-Ceiling Architectural Closetry', 'Smoked Glass, Fluted Louvers & Warm Walnut Veneer', '["Floor to Ceiling Custom Build","Depth 650mm"]', '["Master Bedroom Suites","Walk-In Closets","Dressing Lounges"]', NULL, '/images/translucent-glass-wardrobe.jpeg', 'Floor-to-ceiling walk-in wardrobe closet suite with integrated lighting', '1', 'published', NULL, NULL, '2', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `products` (`id`, `category_id`, `category_slug`, `slug`, `name`, `product_code`, `short_description`, `description`, `pattern_design`, `material_finish`, `dimensions_json`, `applications_json`, `technical_sheet_url`, `cover_image_url`, `image_alt`, `is_featured`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('11', '8', 'functional-statement', 'statement-tv-unit-fluted-panel', 'Floating TV Panel & Console', 'CB-TV-03', 'Architectural wall-hung media console featuring curved fluted louvers, back-lit stone accents, and concealed wire chases.', 'A sculptural living room statement piece integrating acoustic damping slats, push-to-open drawer storage, and concealed power management.', 'Curved Fluted Wall Panel with Floating Console', 'Satin Duco Lacquer & Natural Teak Flutes', '["Width 2400mm \u2013 3600mm Bespoke","Depth 400mm"]', '["Living Room Media Walls","Private Theatre Lounges","Executive Suites"]', NULL, '/images/floating-tv-console.jpeg', 'Floating modern TV unit console with fluted wood paneling', '1', 'published', NULL, NULL, '3', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `products` (`id`, `category_id`, `category_slug`, `slug`, `name`, `product_code`, `short_description`, `description`, `pattern_design`, `material_finish`, `dimensions_json`, `applications_json`, `technical_sheet_url`, `cover_image_url`, `image_alt`, `is_featured`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('12', '8', 'functional-statement', 'bespoke-pu-bathroom-vanity', 'Fluted Floating Bathroom Vanity', 'CB-VAN-04', 'Moisture-resistant high-density PU vanity with seamless sintered stone basin and Blum tip-on soft-close drawers.', 'Engineered for high humidity environments using multi-coat polyurethane waterproofing, solid brass hardware, and integrated LED undermount glows.', 'Vertical Micro-Ribbed Floating Vanity', 'Waterproof PU Paint in Sage Mist (RAL 7032)', '["Single Basin (900mm)","Double Basin (1500mm \u2013 1800mm)"]', '["Master Bathrooms","Powder Rooms","Wellness Sanctuaries"]', NULL, '/images/luxury-bathroom-vanity.jpeg', 'Fluted bathroom vanity with seamless undermount basin', '1', 'published', NULL, NULL, '4', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `products` (`id`, `category_id`, `category_slug`, `slug`, `name`, `product_code`, `short_description`, `description`, `pattern_design`, `material_finish`, `dimensions_json`, `applications_json`, `technical_sheet_url`, `cover_image_url`, `image_alt`, `is_featured`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('13', '8', 'functional-statement', 'contemporary-sanctuary-mandir', 'Contemporary Sanctuary Mandir', 'CB-MDR-05', 'Sacred prayer unit combining CNC-carved jali details, warm concealed ambient lighting, and storage pull-outs.', 'Designed with reverence and architectural finesse, featuring pull-out bhog trays, brass bells integration, and concealed diya storage.', 'Sacred Geometric Jali Lattice & Arch', 'Raw Teak Wood with Antique Brass & PU Inlays', '["Width 1200mm \u2013 1800mm","Height 2100mm"]', '["Dedicated Pooja Rooms","Living Room Niches","Foyer Sanctuaries"]', NULL, '/images/sanctum-mandir.jpeg', 'Contemporary sanctum prayer mandir with warm lighting and jali paneling', '1', 'published', NULL, NULL, '5', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `products` (`id`, `category_id`, `category_slug`, `slug`, `name`, `product_code`, `short_description`, `description`, `pattern_design`, `material_finish`, `dimensions_json`, `applications_json`, `technical_sheet_url`, `cover_image_url`, `image_alt`, `is_featured`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('14', '9', 'bespoke-furniture', 'sculptural-dining-table', 'Monolithic Dining Table & Credenza', 'CB-DNG-06', 'Handcrafted solid wood and veneer dining centerpiece with organic chamfered edges and bespoke matching credenza.', 'Sculptural curved legs supporting a continuous grain bookmatched tabletop, hand-finished with silky polyurethane matte lacquer.', 'Sculptural Organic Silhouette', 'Natural American Walnut with Clear Matte Polyurethane', '["8-Seater (2400mm \u00d7 1050mm)","10-Seater (3000mm \u00d7 1100mm)"]', '["Formal Dining Rooms","Penthouse Great Rooms","Bespoke Boardrooms"]', NULL, '/images/dining-hall.jpeg', 'Bespoke wooden dining table with sculptured organic edges', '1', 'published', NULL, NULL, '6', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `products` (`id`, `category_id`, `category_slug`, `slug`, `name`, `product_code`, `short_description`, `description`, `pattern_design`, `material_finish`, `dimensions_json`, `applications_json`, `technical_sheet_url`, `cover_image_url`, `image_alt`, `is_featured`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('15', '9', 'bespoke-furniture', 'artisan-platform-bed-suite', 'Upholstered Platform Bed & Nightstands', 'CB-BED-07', 'Tailored master bedroom suite featuring an extended acoustic headboard, integrated wireless charging, and floating side consoles.', 'Low-slung contemporary bedframe with cantilevered floating effect, curved corners, and soft bouclé fabric upholstery.', 'Extended Acoustic Panel Headboard', 'Textured Bouclé, Natural Oak & PU Matte Accents', '["King (1800mm \u00d7 2000mm)","Super King (2000mm \u00d7 2000mm)"]', '["Master Bedroom Suites","Guest Sanctuaries","Luxury Villas"]', NULL, '/images/bedroom.jpeg', 'Artisan upholstered platform bed with continuous headboard panel', '1', 'published', NULL, NULL, '7', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
REPLACE INTO `products` (`id`, `category_id`, `category_slug`, `slug`, `name`, `product_code`, `short_description`, `description`, `pattern_design`, `material_finish`, `dimensions_json`, `applications_json`, `technical_sheet_url`, `cover_image_url`, `image_alt`, `is_featured`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('16', '10', 'finishes-palette', 'specialty-pu-paint-veneer-swatches', 'Specialty PU & Veneer Palette', 'CB-MAT-08', 'Unlimited RAL & Pantone colour-matched PU paints, natural veneers, duco, acrylic, and rattan panels.', 'Our complete library of curated interior finishes, allowing architects and homeowners to touch, compare, and harmonize tactile textures.', 'Curated Material & Color Swatch System', 'Matte, Satin, High-Gloss PU & Hand-Woven Rattan', '["Full Physical Swatch Kits Available on Consultation"]', '["Kitchens","Wardrobes","Wall Paneling","Bespoke Consoles"]', NULL, '/images/finishes-palette.jpeg', 'Specialty finishes swatches including PU paint and natural wood veneer', '1', 'published', NULL, NULL, '8', '2026-10-20 20:12:01', '2026-10-20 20:12:01');

/* Data for collections (4 rows) */
REPLACE INTO `collections` (`id`, `slug`, `title`, `subtitle`, `category`, `description`, `cover_image_url`, `image_alt`, `characteristics_json`, `finishes_json`, `applications_json`, `features_json`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('18', 'modular-furniture', 'Modular Furniture', 'Kitchens, Wardrobes, Doors', 'Bespoke & Modular Living', 'Precision-engineered modular kitchens, walk-in closets, and flush architectural doors fitted exclusively with German Blum, Hettich, and Hafele hardware.', '/images/fluted-island-kitchen.jpeg', 'Modular kitchen island with seamless finishes and integrated German hardware', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '1', '2026-10-21 19:35:27', '2026-10-21 19:35:27');
REPLACE INTO `collections` (`id`, `slug`, `title`, `subtitle`, `category`, `description`, `cover_image_url`, `image_alt`, `characteristics_json`, `finishes_json`, `applications_json`, `features_json`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('19', 'functional-statement', 'Functional & Statement Pieces', 'TV Panels, Vanities, Bars, Mandirs & Consoles', 'Bespoke & Modular Living', 'Architectural living room TV panels, waterproof PU bathroom vanities, sacred mandirs, private home bars, bookshelves, consoles, and shoe racks made for the way you live.', '/images/floating-tv-console.jpeg', 'Modern fluted TV unit console and architectural living room paneling', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '2', '2026-10-21 19:35:27', '2026-10-21 19:35:27');
REPLACE INTO `collections` (`id`, `slug`, `title`, `subtitle`, `category`, `description`, `cover_image_url`, `image_alt`, `characteristics_json`, `finishes_json`, `applications_json`, `features_json`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('20', 'bespoke-furniture', 'Bespoke Furniture', 'Beds, Dining Tables, Coffee & Accent Pieces', 'Bespoke & Modular Living', 'Completely made-to-order beds, solid wood and veneer dining tables, sculptural centre tables, side consoles, and customised creations tailored to your exact space.', '/images/dining-hall.jpeg', 'Bespoke wooden dining table and designer chairs handcrafted with organic curves', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '3', '2026-10-21 19:35:27', '2026-10-21 19:35:27');
REPLACE INTO `collections` (`id`, `slug`, `title`, `subtitle`, `category`, `description`, `cover_image_url`, `image_alt`, `characteristics_json`, `finishes_json`, `applications_json`, `features_json`, `status`, `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`) VALUES ('21', 'finishes-palette', 'Finishes & Materials Palette', 'Specialty PU Paint, Natural Veneer, Duco, Glass & Rattan', 'Bespoke & Modular Living', 'Specialty PU Paint with unlimited RAL & Pantone colour matching, rich natural wood veneers, duco lacquer, tinted glass, acrylic, raw wood, and artisanal combinations including rattan and louvers.', '/images/finishes-palette.jpeg', 'Specialty finishes swatches including PU paint and natural wood veneer', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '4', '2026-10-21 19:35:27', '2026-10-21 19:35:27');

/* Data for page_sections (5 rows) */
REPLACE INTO `page_sections` (`id`, `page_id`, `section_type`, `section_order`, `is_visible`, `content_json`, `created_at`, `updated_at`) VALUES ('54', '1', 'hero', '1', '1', '{"eyebrow":"Factory & Experience Centre \u00b7 New Delhi","headline":"We manufacture Furniture","headline_accent":"Thoughtfully Made. Entirely Yours.","supporting_text":"Custom Sofas, Wooden Furniture, Modular Kitchens, Wardrobes & Designer Tiles. Handcrafted in our New Delhi workshop for your home.","cta_primary_label":"EXPLORE WHAT WE MAKE","cta_primary_url":"\/products","cta_secondary_label":"CONTACT US","cta_secondary_url":"\/contact","image_desktop":"\/images\/sofa.jpeg","image_mobile":"\/images\/sofa.jpeg","image_alt":"Handcrafted custom sofas, wooden furniture and designer tiles by Ceramics & Beyond"}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');
REPLACE INTO `page_sections` (`id`, `page_id`, `section_type`, `section_order`, `is_visible`, `content_json`, `created_at`, `updated_at`) VALUES ('55', '1', 'brand_intro', '2', '1', '{"tag":"1. Our Story \u00b7 A Creative Instinct, A Passion for Making","headline":"A Creative Instinct, A Passion for Making.","paragraph_1":"I have always been drawn to the art of making things beautiful. As a NIFT graduate, design has always been a part of who I am \u2014 from the smallest details to the way an entire space comes together. Over time, that creative instinct found its way into furniture, and what began as a love for design grew into a passion for creating things that are as practical as they are beautiful. That passion became Ceramics & Beyond.","paragraph_2":"As a woman entrepreneur in a traditionally male-dominated, manufacturing-intensive industry, I wanted to build something that reflected my own beliefs: thoughtful design, practical solutions, complete customisation and a personal involvement in every detail. I believe a home should be designed around the people living in it, not the other way around. Every corner should have a purpose. Every piece should feel like it belongs. And the process of creating it should be honest, transparent and joyful.","heritage_note":"Because making a house look good is one thing. Making it feel like home? That''s our job.","metric_1_val":"NIFT","metric_1_lbl":"Design Pedigree","metric_2_val":"100%","metric_2_lbl":"In-House Factory","metric_3_val":"0","metric_3_lbl":"Middlemen \/ Markup","image_url":"\/images\/founder-story.jpeg","image_alt":"Bespoke architectural furniture craftsmanship by Ceramics & Beyond"}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');
REPLACE INTO `page_sections` (`id`, `page_id`, `section_type`, `section_order`, `is_visible`, `content_json`, `created_at`, `updated_at`) VALUES ('56', '1', 'craftsmanship', '3', '1', '{"section_tag":"4. Why Ceramics & Beyond? \u00b7 The Live Counter Concept","headline":"Factory & Experience Centre Under One Roof.","supporting_text":"Think of it like watching your paneer tikka being prepared fresh at a live counter \u2014 except this time, it''s your kitchen taking shape. Total transparency from raw boards to precision assembly.","feature_1_title":"Complete In-House Manufacturing","feature_1_text":"Zero-gap seamless polyurethane edge-banding, computerized sizing, and dust-free spray booths under one roof.","feature_2_title":"Unlimited Finishes & Customisation","feature_2_text":"Specialty PU paint with unlimited RAL & Pantone colour matching, natural wood veneer, duco, glass, laminates, acrylic, and rattan.","feature_3_title":"German Hardware Standard","feature_3_text":"Fitted exclusively with Blum, Hettich, and Hafele hinges, runners, and lift-up systems for silent, lifelong operation.","cta_label":"EXPERIENCE THE LIVE COUNTER","cta_url":"\/craftsmanship","image_url":"\/images\/in-house-cnc.jpeg","image_alt":"Precision manufacturing and craftsmanship on the factory floor"}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');
REPLACE INTO `page_sections` (`id`, `page_id`, `section_type`, `section_order`, `is_visible`, `content_json`, `created_at`, `updated_at`) VALUES ('57', '1', 'export_enquiries', '4', '1', '{"section_tag":"Custom Furniture Consultation","headline":"Want Custom Furniture for Your Home?","supporting_text":"Talk directly with our team. Whether you need a comfortable custom sofa, solid wood furniture, modular kitchen, wardrobes, or designer tiles, we make everything right here in our New Delhi workshop.","cta_label":"TALK TO OUR TEAM","cta_url":"\/contact","markets_served":"Serving homeowners, architects, and interior designers across Delhi NCR and pan-India with bespoke modular living solutions."}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');
REPLACE INTO `page_sections` (`id`, `page_id`, `section_type`, `section_order`, `is_visible`, `content_json`, `created_at`, `updated_at`) VALUES ('58', '1', 'final_cta', '5', '1', '{"headline":"Making a house look good is one thing. Making it feel like home? That\u2019s our job.","supporting_text":"Simple yet seen. Practical yet personal. Made for the way you live. Explore bespoke furniture and in-house modular manufacturing tailored around you.","cta_primary_label":"EXPLORE WHAT WE MAKE","cta_primary_url":"\/products","cta_secondary_label":"TALK TO OUR TEAM","cta_secondary_url":"\/contact"}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');

/* Data for pages (1 rows) */
REPLACE INTO `pages` (`id`, `slug`, `title`, `meta_title`, `meta_description`, `og_image_url`, `status`, `updated_by`, `published_at`, `created_at`, `updated_at`) VALUES ('1', 'home', 'Home', 'Ceramics & Beyond | Thoughtfully Made Furniture · Factory & Experience Centre', 'Thoughtfully made furniture, entirely yours. Modular kitchens, bespoke wardrobes, statement vanities, and custom furniture crafted with in-house manufacturing in New Delhi.', NULL, 'published', NULL, NULL, '2026-10-15 06:01:45', '2026-10-15 06:01:45');

/* Data for site_settings (20 rows) */
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('1', 'brand_name', 'Ceramics & Beyond', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('2', 'brand_tagline', 'Thoughtfully Made. Entirely Yours.', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('3', 'brand_description', 'Ceramics & Beyond is a bespoke and modular furniture design and manufacturing studio founded by a NIFT graduate and woman entrepreneur. We craft modular kitchens, wardrobes, and living furniture with factory & experience centre under one roof. Simple yet seen. Practical yet personal. Made for the way you live.', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('4', 'contact_email', 'hello@example.com', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('5', 'contact_phone', '+91 98765 43210', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('6', 'contact_address', 'Experience Centre & Factory, New Delhi, Delhi, India', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('7', 'contact_hours', 'Monday – Saturday: 10:00 AM – 7:00 PM IST', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('8', 'social_instagram', 'https://instagram.com', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('9', 'social_pinterest', 'https://pinterest.com', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('10', 'social_linkedin', 'https://linkedin.com', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('11', 'meta_title', 'Ceramics & Beyond | Thoughtfully Made. Entirely Yours. | New Delhi', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('12', 'meta_description', 'Modular kitchens, wardrobes, and bespoke furniture crafted with factory and experience centre under one roof. Founded by a NIFT graduate.', 'general', '2026-10-15 06:01:45');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('13', 'business_category', 'Bespoke & Modular Furniture Manufacturer', 'general', '2026-10-15 06:25:34');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('16', 'location_city', 'New Delhi', 'general', '2026-10-15 06:25:34');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('17', 'location_state', 'Delhi', 'general', '2026-10-15 06:25:34');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('18', 'location_country', 'India', 'general', '2026-10-15 06:25:34');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('19', 'export_markets', 'Asia and Russia', 'general', '2026-10-15 06:25:34');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('20', 'founder_identity', 'NIFT Graduate & Woman Entrepreneur', 'general', '2026-10-20 20:17:27');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('21', 'philosophy', 'Simple yet seen. Practical yet personal. Made for the way you live.', 'general', '2026-10-20 20:17:27');
REPLACE INTO `site_settings` (`id`, `setting_key`, `setting_value`, `category`, `updated_at`) VALUES ('22', 'live_counter_concept', 'Think of it like watching your paneer tikka being prepared fresh at a live counter — except this time, it is your kitchen taking shape.', 'general', '2026-10-20 20:17:27');

/* Data for maintenance_settings (1 rows) */
REPLACE INTO `maintenance_settings` (`id`, `is_active`, `message`, `reason`, `activated_by`, `activated_at`, `allowed_ips_json`, `updated_at`) VALUES ('1', '0', 'We are updating our furniture lookbook and collection. Please return shortly.', 'Lookbook Maintenance', NULL, NULL, '[]', '2026-10-26 06:50:46');

/* Data for enquiries (2 rows) */
REPLACE INTO `enquiries` (`id`, `full_name`, `email`, `phone`, `project_type`, `message`, `status`, `ip_address`, `created_at`, `updated_at`, `company_name`, `country`, `enquiry_type`, `product_category`, `estimated_quantity`) VALUES ('22', 'Priya Sharma', 'priya.sharma@example.com', '+91 98111 22334', 'Modular Kitchens', 'Looking for a handleless acrylic and veneer modular kitchen with Blum hardware and integrated breakfast counter.', 'new', '127.0.0.1', '2026-10-21 19:38:54', '2026-10-21 19:38:54', 'Vasant Vihar Residence', 'India', 'Modular Kitchen Enquiry', 'Modular Furniture', 'Full Villa Scope');
REPLACE INTO `enquiries` (`id`, `full_name`, `email`, `phone`, `project_type`, `message`, `status`, `ip_address`, `created_at`, `updated_at`, `company_name`, `country`, `enquiry_type`, `product_category`, `estimated_quantity`) VALUES ('23', 'Vikram Malhotra', 'vikram@example.com', '+91 98100 44556', 'Bespoke Furniture', 'Need custom PU paint wardrobes with fluted glass doors and bespoke dining table for our GK-2 project.', 'in_review', '127.0.0.1', '2026-10-21 19:38:54', '2026-10-21 19:38:54', 'Malhotra & Associates Architects', 'India', 'Architect / Designer Collaboration', 'Bespoke Furniture', '5 Bedroom Penthouse');

/* --------------------------------------------------------------------
   RESTORE SYSTEM SETTINGS & CHECKS
   -------------------------------------------------------------------- */
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
