-- Ceramics & Beyond - Production MySQL / MariaDB Database Schema
-- Compatible with Hostinger Shared Hosting (MySQL 8.0+ / MariaDB 10.5+)

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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

SET FOREIGN_KEY_CHECKS = 1;
