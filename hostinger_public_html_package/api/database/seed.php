<?php
declare(strict_types=1);

/**
 * Ceramics & Beyond - Database Initializer and Seeder
 * Bespoke & Modular Furniture Manufacturer, Factory & Experience Centre, New Delhi, India
 * Run via CLI: php -d opcache.enable_cli=0 api/database/seed.php
 */

require_once dirname(__DIR__) . '/core/Database.php';
require_once dirname(__DIR__) . '/core/Security.php';

use Api\Core\Database;
use Api\Core\Security;

echo "==> Initializing Ceramics & Beyond Database (Bespoke Furniture Manufacturer)...\n";

$driver = Database::getDriver();
$pdo = Database::getConnection();

if ($driver === 'sqlite') {
    // 1. Roles
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role_id INTEGER NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        display_name TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        failed_logins INTEGER NOT NULL DEFAULT 0,
        lockout_until TEXT,
        last_login_at TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (role_id) REFERENCES roles (id)
    );

    CREATE TABLE IF NOT EXISTS login_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT NOT NULL,
        portal_type TEXT NOT NULL,
        email_attempted TEXT NOT NULL,
        successful INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        portal_type TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        user_agent TEXT,
        last_activity INTEGER NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        meta_title TEXT,
        meta_description TEXT,
        og_image_url TEXT,
        status TEXT NOT NULL DEFAULT 'published',
        updated_by INTEGER,
        published_at TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS page_sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_id INTEGER NOT NULL,
        section_type TEXT NOT NULL,
        section_order INTEGER NOT NULL DEFAULT 0,
        is_visible INTEGER NOT NULL DEFAULT 1,
        content_json TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (page_id) REFERENCES pages (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        subtitle TEXT,
        description TEXT NOT NULL,
        cover_image_url TEXT NOT NULL,
        image_alt TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        category_slug TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        product_code TEXT,
        short_description TEXT NOT NULL,
        description TEXT NOT NULL,
        pattern_design TEXT,
        material_finish TEXT,
        dimensions_json TEXT,
        applications_json TEXT,
        technical_sheet_url TEXT,
        cover_image_url TEXT NOT NULL,
        image_alt TEXT NOT NULL,
        is_featured INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'published',
        meta_title TEXT,
        meta_description TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS product_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        alt_text TEXT NOT NULL,
        caption TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS collections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        subtitle TEXT,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        cover_image_url TEXT NOT NULL,
        image_alt TEXT NOT NULL,
        characteristics_json TEXT,
        finishes_json TEXT,
        applications_json TEXT,
        features_json TEXT,
        status TEXT NOT NULL DEFAULT 'published',
        meta_title TEXT,
        meta_description TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS collection_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        collection_id INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        alt_text TEXT NOT NULL,
        caption TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        original_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        mime_type TEXT NOT NULL,
        width INTEGER,
        height INTEGER,
        alt_text TEXT,
        uploaded_by INTEGER,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        company_name TEXT,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        country TEXT DEFAULT 'India',
        enquiry_type TEXT NOT NULL DEFAULT 'General Business',
        product_category TEXT,
        estimated_quantity TEXT,
        project_type TEXT,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        ip_address TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting_key TEXT NOT NULL UNIQUE,
        setting_value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS content_versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity_type TEXT NOT NULL,
        entity_id INTEGER NOT NULL,
        version_data_json TEXT NOT NULL,
        created_by INTEGER,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        portal_type TEXT NOT NULL,
        action TEXT NOT NULL,
        entity_type TEXT,
        entity_id INTEGER,
        details_json TEXT,
        ip_address TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS maintenance_settings (
        id INTEGER PRIMARY KEY,
        is_active INTEGER NOT NULL DEFAULT 0,
        message TEXT NOT NULL,
        reason TEXT,
        activated_by INTEGER,
        activated_at TEXT,
        allowed_ips_json TEXT,
        updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS backup_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        file_path TEXT NOT NULL,
        backup_type TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        created_by INTEGER,
        status TEXT NOT NULL DEFAULT 'completed',
        created_at TEXT DEFAULT (datetime('now'))
    );
    ");

    // Ensure columns exist on SQLite if previously created without them
    $cols = $pdo->query("PRAGMA table_info(enquiries)")->fetchAll(\PDO::FETCH_ASSOC);
    $colNames = array_column($cols, 'name');
    if (!in_array('company_name', $colNames, true)) {
        $pdo->exec("ALTER TABLE enquiries ADD COLUMN company_name TEXT;");
    }
    if (!in_array('country', $colNames, true)) {
        $pdo->exec("ALTER TABLE enquiries ADD COLUMN country TEXT DEFAULT 'India';");
    }
    if (!in_array('enquiry_type', $colNames, true)) {
        $pdo->exec("ALTER TABLE enquiries ADD COLUMN enquiry_type TEXT DEFAULT 'General Business';");
    }
    if (!in_array('product_category', $colNames, true)) {
        $pdo->exec("ALTER TABLE enquiries ADD COLUMN product_category TEXT;");
    }
    if (!in_array('estimated_quantity', $colNames, true)) {
        $pdo->exec("ALTER TABLE enquiries ADD COLUMN estimated_quantity TEXT;");
    }
} else {
    $schemaFile = __DIR__ . '/schema_mysql.sql';
    if (file_exists($schemaFile)) {
        $sql = file_get_contents($schemaFile);
        $pdo->exec($sql);
    }
}

echo "✓ Schema verified.\n";

// 1. Roles
$ignoreKeyword = ($driver === 'mysql') ? 'INSERT IGNORE' : 'INSERT OR IGNORE';
$pdo->exec("{$ignoreKeyword} INTO roles (name, description) VALUES ('CLIENT_ADMIN', 'Client content and collections manager');");
$pdo->exec("{$ignoreKeyword} INTO roles (name, description) VALUES ('DEVELOPER_ADMIN', 'Private system administrator');");

$clientRole = Database::fetch("SELECT id FROM roles WHERE name = 'CLIENT_ADMIN'");
$devRole = Database::fetch("SELECT id FROM roles WHERE name = 'DEVELOPER_ADMIN'");

// 2. Administrators
$clientEmail = 'client.admin@ceramicsandbeyond.com';
$clientPass = 'ClientAdmin2026!Secure';

$devEmail = 'dev.portal@ceramicsandbeyond.com';
$devPass = 'DevPortal2026!Master';

if (!Database::fetch("SELECT id FROM users WHERE email = :email", [':email' => $clientEmail])) {
    Database::execute("
        INSERT INTO users (role_id, email, password_hash, display_name, status)
        VALUES (:role_id, :email, :hash, 'Client Administrator', 'active')
    ", [
        ':role_id' => $clientRole['id'],
        ':email' => $clientEmail,
        ':hash' => Security::hashPassword($clientPass),
    ]);
    echo "✓ Created Client Administrator: {$clientEmail}\n";
}

if (!Database::fetch("SELECT id FROM users WHERE email = :email", [':email' => $devEmail])) {
    Database::execute("
        INSERT INTO users (role_id, email, password_hash, display_name, status)
        VALUES (:role_id, :email, :hash, 'Principal System Architect', 'active')
    ", [
        ':role_id' => $devRole['id'],
        ':email' => $devEmail,
        ':hash' => Security::hashPassword($devPass),
    ]);
    echo "✓ Created Private Developer Administrator: {$devEmail}\n";
}

// 3. Site Settings (Thoughtfully Made. Entirely Yours.)
$settings = [
    'brand_name' => 'Ceramics & Beyond',
    'brand_tagline' => 'Thoughtfully Made. Entirely Yours.',
    'brand_description' => 'Ceramics & Beyond is a bespoke and modular furniture design and manufacturing studio founded by a NIFT graduate and woman entrepreneur. We craft modular kitchens, wardrobes, and living furniture with factory & experience centre under one roof. Simple yet seen. Practical yet personal. Made for the way you live.',
    'business_category' => 'Bespoke & Modular Furniture Manufacturer',
    'founder_identity' => 'NIFT Graduate & Woman Entrepreneur',
    'philosophy' => 'Simple yet seen. Practical yet personal. Made for the way you live.',
    'live_counter_concept' => 'Think of it like watching your paneer tikka being prepared fresh at a live counter — except this time, it is your kitchen taking shape.',
    'location_city' => 'New Delhi',
    'location_state' => 'Delhi',
    'location_country' => 'India',
    'contact_email' => 'hello@example.com',
    'contact_phone' => '+91 98765 43210',
    'contact_address' => 'Experience Centre & Factory, New Delhi, Delhi, India',
    'contact_hours' => 'Monday – Saturday: 10:00 AM – 7:00 PM IST',
    'meta_title' => 'Ceramics & Beyond | Thoughtfully Made. Entirely Yours. | New Delhi',
    'meta_description' => 'Modular kitchens, wardrobes, and bespoke furniture crafted with factory and experience centre under one roof. Founded by a NIFT graduate.',
];


foreach ($settings as $key => $val) {
    if (Database::fetch("SELECT id FROM site_settings WHERE setting_key = :k", [':k' => $key])) {
        Database::execute("UPDATE site_settings SET setting_value = :v WHERE setting_key = :k", [
            ':k' => $key,
            ':v' => $val,
        ]);
    } else {
        Database::execute("INSERT INTO site_settings (setting_key, setting_value) VALUES (:k, :v)", [
            ':k' => $key,
            ':v' => $val,
        ]);
    }
}
// Clean any legacy tile/bansal settings
Database::execute("DELETE FROM site_settings WHERE setting_key IN ('heritage_name', 'heritage_origin', 'heritage_year', 'establishment_year') OR setting_value LIKE '%Bansal%' OR setting_value LIKE '%ceramic tile%'");
echo "✓ Site settings seeded.\n";

// 4. Maintenance Settings
Database::execute("DELETE FROM maintenance_settings WHERE id = 1");
Database::execute("
    INSERT INTO maintenance_settings (id, is_active, message, reason, allowed_ips_json)
    VALUES (1, 0, 'We are updating our furniture lookbook and collection. Please return shortly.', 'Lookbook Maintenance', '[]')
");

// 5. Product Categories (4 Core Lines)
$categoriesData = [
    [
        'slug' => 'modular-furniture',
        'name' => 'Modular Furniture',
        'subtitle' => 'Kitchens, Wardrobes, Doors',
        'description' => 'Precision-engineered modular kitchens, walk-in closets, and flush architectural doors fitted exclusively with German Blum, Hettich, and Hafele hardware.',
        'cover_image_url' => '/images/fluted-island-kitchen.jpeg',
        'image_alt' => 'Modular kitchen island with seamless finishes and integrated German hardware',
        'sort_order' => 1,
    ],
    [
        'slug' => 'functional-statement',
        'name' => 'Functional & Statement Pieces',
        'subtitle' => 'TV Panels, Vanities, Bars, Mandirs & Consoles',
        'description' => 'Architectural living room TV panels, waterproof PU bathroom vanities, sacred mandirs, private home bars, bookshelves, consoles, and shoe racks made for the way you live.',
        'cover_image_url' => '/images/floating-tv-console.jpeg',
        'image_alt' => 'Modern fluted TV unit console and architectural living room paneling',
        'sort_order' => 2,
    ],
    [
        'slug' => 'bespoke-furniture',
        'name' => 'Bespoke Furniture',
        'subtitle' => 'Beds, Dining Tables, Coffee & Accent Pieces',
        'description' => 'Completely made-to-order beds, solid wood and veneer dining tables, sculptural centre tables, side consoles, and customised creations tailored to your exact space.',
        'cover_image_url' => '/images/dining-hall.jpeg',
        'image_alt' => 'Bespoke wooden dining table and designer chairs handcrafted with organic curves',
        'sort_order' => 3,
    ],
    [
        'slug' => 'finishes-palette',
        'name' => 'Finishes & Materials Palette',
        'subtitle' => 'Specialty PU Paint, Natural Veneer, Duco, Glass & Rattan',
        'description' => 'Specialty PU Paint with unlimited RAL & Pantone colour matching, rich natural wood veneers, duco lacquer, tinted glass, acrylic, raw wood, and artisanal combinations including rattan and louvers.',
        'cover_image_url' => '/images/finishes-palette.jpeg',
        'image_alt' => 'Specialty finishes swatches including PU paint and natural wood veneer',
        'sort_order' => 4,
    ],
];

foreach ($categoriesData as $cat) {
    $existing = Database::fetch("SELECT id FROM categories WHERE slug = :s", [':s' => $cat['slug']]);
    if ($existing) {
        Database::execute("
            UPDATE categories 
            SET name = :n, subtitle = :sub, description = :d, cover_image_url = :img, image_alt = :alt, sort_order = :ord
            WHERE slug = :s
        ", [
            ':n' => $cat['name'],
            ':sub' => $cat['subtitle'],
            ':d' => $cat['description'],
            ':img' => $cat['cover_image_url'],
            ':alt' => $cat['image_alt'],
            ':ord' => $cat['sort_order'],
            ':s' => $cat['slug'],
        ]);
    } else {
        Database::execute("
            INSERT INTO categories (slug, name, subtitle, description, cover_image_url, image_alt, sort_order, status)
            VALUES (:s, :n, :sub, :d, :img, :alt, :ord, 'published')
        ", [
            ':s' => $cat['slug'],
            ':n' => $cat['name'],
            ':sub' => $cat['subtitle'],
            ':d' => $cat['description'],
            ':img' => $cat['cover_image_url'],
            ':alt' => $cat['image_alt'],
            ':ord' => $cat['sort_order'],
        ]);
    }
}
echo "✓ Product categories seeded (6 categories).\n";

// Also seed into collections table for backward compatibility
Database::execute("DELETE FROM collections WHERE category LIKE '%tile%' OR description LIKE '%ceramic%'");
foreach ($categoriesData as $cat) {
    $existing = Database::fetch("SELECT id FROM collections WHERE slug = :s", [':s' => $cat['slug']]);
    if ($existing) {
        Database::execute("
            UPDATE collections SET
                title = :t,
                subtitle = :sub,
                category = 'Bespoke & Modular Living',
                description = :d,
                cover_image_url = :img,
                image_alt = :alt,
                sort_order = :ord,
                status = 'published'
            WHERE id = :id
        ", [
            ':id' => $existing['id'],
            ':t' => $cat['name'],
            ':sub' => $cat['subtitle'],
            ':d' => $cat['description'],
            ':img' => $cat['cover_image_url'],
            ':alt' => $cat['image_alt'],
            ':ord' => $cat['sort_order'],
        ]);
    } else {
        Database::execute("
            INSERT INTO collections (slug, title, subtitle, category, description, cover_image_url, image_alt, sort_order, status)
            VALUES (:s, :t, :sub, 'Bespoke & Modular Living', :d, :img, :alt, :ord, 'published')
        ", [
            ':s' => $cat['slug'],
            ':t' => $cat['name'],
            ':sub' => $cat['subtitle'],
            ':d' => $cat['description'],
            ':img' => $cat['cover_image_url'],
            ':alt' => $cat['image_alt'],
            ':ord' => $cat['sort_order'],
        ]);
    }
}

// 6. Products (Bespoke Furniture & Modular Collections)
$productsData = [
    [
        'category_slug' => 'modular-furniture',
        'slug' => 'atelier-modular-kitchen-island',
        'name' => 'Atelier Modular Kitchen & Island',
        'product_code' => 'CB-KIT-01',
        'short_description' => 'Precision engineered modular kitchen with concealed handle profiles, German Blum runners, and PU finish.',
        'description' => 'Custom island and cabinetry system featuring Blum motion technology, anti-scratch matte PU paint, quartz surfaces, and fully tailored corner solutions.',
        'pattern_design' => 'Contemporary Minimalist with Seamless Gola Profile',
        'material_finish' => 'Specialty Matte PU Paint & Fluted Oak Veneer',
        'dimensions' => ['Bespoke Custom Dimensions', 'Standard depth 600mm / Counter 860mm'],
        'applications' => ['Open Concept Kitchens', 'Island Dining', 'Walk-in Pantries'],
        'cover_image_url' => '/images/fluted-island-kitchen.jpeg',
        'image_alt' => 'Atelier modular kitchen with seamless island and integrated German hardware',
        'is_featured' => 1,
        'sort_order' => 1,
    ],
    [
        'category_slug' => 'modular-furniture',
        'slug' => 'signature-walk-in-wardrobe',
        'name' => 'Signature Walk-In Wardrobe Suite',
        'product_code' => 'CB-WRD-02',
        'short_description' => 'Floor-to-ceiling modular wardrobe system with sensor LED profiles, tinted glass doors, and soft-close drawers.',
        'description' => 'Modular wardrobe with custom accessory trays, velvet jewelry compartments, illuminated hanging rails, and dust-proof magnetic seals.',
        'pattern_design' => 'Floor-to-Ceiling Architectural Closetry',
        'material_finish' => 'Smoked Glass, Fluted Louvers & Warm Walnut Veneer',
        'dimensions' => ['Floor to Ceiling Custom Build', 'Depth 650mm'],
        'applications' => ['Master Bedroom Suites', 'Walk-In Closets', 'Dressing Lounges'],
        'cover_image_url' => '/images/translucent-glass-wardrobe.jpeg',
        'image_alt' => 'Floor-to-ceiling walk-in wardrobe closet suite with integrated lighting',
        'is_featured' => 1,
        'sort_order' => 2,
    ],
    [
        'category_slug' => 'functional-statement',
        'slug' => 'statement-tv-unit-fluted-panel',
        'name' => 'Floating TV Panel & Console',
        'product_code' => 'CB-TV-03',
        'short_description' => 'Architectural wall-hung media console featuring curved fluted louvers, back-lit stone accents, and concealed wire chases.',
        'description' => 'A sculptural living room statement piece integrating acoustic damping slats, push-to-open drawer storage, and concealed power management.',
        'pattern_design' => 'Curved Fluted Wall Panel with Floating Console',
        'material_finish' => 'Satin Duco Lacquer & Natural Teak Flutes',
        'dimensions' => ['Width 2400mm – 3600mm Bespoke', 'Depth 400mm'],
        'applications' => ['Living Room Media Walls', 'Private Theatre Lounges', 'Executive Suites'],
        'cover_image_url' => '/images/floating-tv-console.jpeg',
        'image_alt' => 'Floating modern TV unit console with fluted wood paneling',
        'is_featured' => 1,
        'sort_order' => 3,
    ],
    [
        'category_slug' => 'functional-statement',
        'slug' => 'bespoke-pu-bathroom-vanity',
        'name' => 'Fluted Floating Bathroom Vanity',
        'product_code' => 'CB-VAN-04',
        'short_description' => 'Moisture-resistant high-density PU vanity with seamless sintered stone basin and Blum tip-on soft-close drawers.',
        'description' => 'Engineered for high humidity environments using multi-coat polyurethane waterproofing, solid brass hardware, and integrated LED undermount glows.',
        'pattern_design' => 'Vertical Micro-Ribbed Floating Vanity',
        'material_finish' => 'Waterproof PU Paint in Sage Mist (RAL 7032)',
        'dimensions' => ['Single Basin (900mm)', 'Double Basin (1500mm – 1800mm)'],
        'applications' => ['Master Bathrooms', 'Powder Rooms', 'Wellness Sanctuaries'],
        'cover_image_url' => '/images/luxury-bathroom-vanity.jpeg',
        'image_alt' => 'Fluted bathroom vanity with seamless undermount basin',
        'is_featured' => 1,
        'sort_order' => 4,
    ],
    [
        'category_slug' => 'functional-statement',
        'slug' => 'contemporary-sanctuary-mandir',
        'name' => 'Contemporary Sanctuary Mandir',
        'product_code' => 'CB-MDR-05',
        'short_description' => 'Sacred prayer unit combining CNC-carved jali details, warm concealed ambient lighting, and storage pull-outs.',
        'description' => 'Designed with reverence and architectural finesse, featuring pull-out bhog trays, brass bells integration, and concealed diya storage.',
        'pattern_design' => 'Sacred Geometric Jali Lattice & Arch',
        'material_finish' => 'Raw Teak Wood with Antique Brass & PU Inlays',
        'dimensions' => ['Width 1200mm – 1800mm', 'Height 2100mm'],
        'applications' => ['Dedicated Pooja Rooms', 'Living Room Niches', 'Foyer Sanctuaries'],
        'cover_image_url' => '/images/sanctum-mandir.jpeg',
        'image_alt' => 'Contemporary sanctum prayer mandir with warm lighting and jali paneling',
        'is_featured' => 1,
        'sort_order' => 5,
    ],
    [
        'category_slug' => 'bespoke-furniture',
        'slug' => 'sculptural-dining-table',
        'name' => 'Monolithic Dining Table & Credenza',
        'product_code' => 'CB-DNG-06',
        'short_description' => 'Handcrafted solid wood and veneer dining centerpiece with organic chamfered edges and bespoke matching credenza.',
        'description' => 'Sculptural curved legs supporting a continuous grain bookmatched tabletop, hand-finished with silky polyurethane matte lacquer.',
        'pattern_design' => 'Sculptural Organic Silhouette',
        'material_finish' => 'Natural American Walnut with Clear Matte Polyurethane',
        'dimensions' => ['8-Seater (2400mm × 1050mm)', '10-Seater (3000mm × 1100mm)'],
        'applications' => ['Formal Dining Rooms', 'Penthouse Great Rooms', 'Bespoke Boardrooms'],
        'cover_image_url' => '/images/dining-hall.jpeg',
        'image_alt' => 'Bespoke wooden dining table with sculptured organic edges',
        'is_featured' => 1,
        'sort_order' => 6,
    ],
    [
        'category_slug' => 'bespoke-furniture',
        'slug' => 'artisan-platform-bed-suite',
        'name' => 'Upholstered Platform Bed & Nightstands',
        'product_code' => 'CB-BED-07',
        'short_description' => 'Tailored master bedroom suite featuring an extended acoustic headboard, integrated wireless charging, and floating side consoles.',
        'description' => 'Low-slung contemporary bedframe with cantilevered floating effect, curved corners, and soft bouclé fabric upholstery.',
        'pattern_design' => 'Extended Acoustic Panel Headboard',
        'material_finish' => 'Textured Bouclé, Natural Oak & PU Matte Accents',
        'dimensions' => ['King (1800mm × 2000mm)', 'Super King (2000mm × 2000mm)'],
        'applications' => ['Master Bedroom Suites', 'Guest Sanctuaries', 'Luxury Villas'],
        'cover_image_url' => '/images/bedroom.jpeg',
        'image_alt' => 'Artisan upholstered platform bed with continuous headboard panel',
        'is_featured' => 1,
        'sort_order' => 7,
    ],
    [
        'category_slug' => 'finishes-palette',
        'slug' => 'specialty-pu-paint-veneer-swatches',
        'name' => 'Specialty PU & Veneer Palette',
        'product_code' => 'CB-MAT-08',
        'short_description' => 'Unlimited RAL & Pantone colour-matched PU paints, natural veneers, duco, acrylic, and rattan panels.',
        'description' => 'Our complete library of curated interior finishes, allowing architects and homeowners to touch, compare, and harmonize tactile textures.',
        'pattern_design' => 'Curated Material & Color Swatch System',
        'material_finish' => 'Matte, Satin, High-Gloss PU & Hand-Woven Rattan',
        'dimensions' => ['Full Physical Swatch Kits Available on Consultation'],
        'applications' => ['Kitchens', 'Wardrobes', 'Wall Paneling', 'Bespoke Consoles'],
        'cover_image_url' => '/images/finishes-palette.jpeg',
        'image_alt' => 'Specialty finishes swatches including PU paint and natural wood veneer',
        'is_featured' => 1,
        'sort_order' => 8,
    ],
];

foreach ($productsData as $prod) {
    $cat = Database::fetch("SELECT id FROM categories WHERE slug = :cs", [':cs' => $prod['category_slug']]);
    $catId = $cat ? (int)$cat['id'] : null;

    $existing = Database::fetch("SELECT id FROM products WHERE slug = :s", [':s' => $prod['slug']]);
    if ($existing) {
        Database::execute("
            UPDATE products 
            SET category_id = :cid, category_slug = :cs, name = :n, product_code = :pc,
                short_description = :sd, description = :d, pattern_design = :pd, material_finish = :mf,
                dimensions_json = :dim, applications_json = :app, cover_image_url = :cov, image_alt = :alt,
                is_featured = :feat, sort_order = :ord
            WHERE slug = :s
        ", [
            ':cid' => $catId,
            ':cs' => $prod['category_slug'],
            ':n' => $prod['name'],
            ':pc' => $prod['product_code'],
            ':sd' => $prod['short_description'],
            ':d' => $prod['description'],
            ':pd' => $prod['pattern_design'],
            ':mf' => $prod['material_finish'],
            ':dim' => json_encode($prod['dimensions']),
            ':app' => json_encode($prod['applications']),
            ':cov' => $prod['cover_image_url'],
            ':alt' => $prod['image_alt'],
            ':feat' => $prod['is_featured'],
            ':ord' => $prod['sort_order'],
            ':s' => $prod['slug'],
        ]);
    } else {
        Database::execute("
            INSERT INTO products (category_id, category_slug, slug, name, product_code, short_description, description, pattern_design, material_finish, dimensions_json, applications_json, cover_image_url, image_alt, is_featured, sort_order, status)
            VALUES (:cid, :cs, :s, :n, :pc, :sd, :d, :pd, :mf, :dim, :app, :cov, :alt, :feat, :ord, 'published')
        ", [
            ':cid' => $catId,
            ':cs' => $prod['category_slug'],
            ':s' => $prod['slug'],
            ':n' => $prod['name'],
            ':pc' => $prod['product_code'],
            ':sd' => $prod['short_description'],
            ':d' => $prod['description'],
            ':pd' => $prod['pattern_design'],
            ':mf' => $prod['material_finish'],
            ':dim' => json_encode($prod['dimensions']),
            ':app' => json_encode($prod['applications']),
            ':cov' => $prod['cover_image_url'],
            ':alt' => $prod['image_alt'],
            ':feat' => $prod['is_featured'],
            ':ord' => $prod['sort_order'],
        ]);
    }
}
echo "✓ Products seeded (" . count($productsData) . " furniture creations).\n";

// 7. Homepage Sections (Exact Headlines and Requirements from Brief)
$homePage = Database::fetch("SELECT id FROM pages WHERE slug = 'home'");
if (!$homePage) {
    Database::execute("
        INSERT INTO pages (slug, title, meta_title, meta_description, status)
        VALUES ('home', 'Home', 'Ceramics & Beyond | Thoughtfully Made Furniture · Factory & Experience Centre', 'Thoughtfully made furniture, entirely yours. Modular kitchens, bespoke wardrobes, statement vanities, and custom furniture crafted with in-house manufacturing in New Delhi.', 'published')
    ");
    $homePage = Database::fetch("SELECT id FROM pages WHERE slug = 'home'");
} else {
    Database::execute("
        UPDATE pages SET 
            meta_title = 'Ceramics & Beyond | Thoughtfully Made Furniture · Factory & Experience Centre',
            meta_description = 'Thoughtfully made furniture, entirely yours. Modular kitchens, bespoke wardrobes, statement vanities, and custom furniture crafted with in-house manufacturing in New Delhi.'
        WHERE slug = 'home'
    ");
}
$pageId = (int)$homePage['id'];

// Remove legacy sections
Database::execute("DELETE FROM page_sections WHERE page_id = :pid", [':pid' => $pageId]);

// Section 1: Hero Section
Database::execute("
    INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content_json)
    VALUES (:pid, 'hero', 1, 1, :json)
", [
    ':pid' => $pageId,
    ':json' => json_encode([
        'eyebrow' => 'Factory & Experience Centre · New Delhi',
        'headline' => 'We manufacture Furniture',
        'headline_accent' => 'Thoughtfully Made. Entirely Yours.',
        'supporting_text' => 'Custom Sofas, Wooden Furniture, Modular Kitchens, Wardrobes & Designer Tiles. Handcrafted in our New Delhi workshop for your home.',
        'cta_primary_label' => 'EXPLORE WHAT WE MAKE',
        'cta_primary_url' => '/products',
        'cta_secondary_label' => 'CONTACT US',
        'cta_secondary_url' => '/contact',
        'image_desktop' => '/images/sofa.jpeg',
        'image_mobile' => '/images/sofa.jpeg',
        'image_alt' => 'Handcrafted custom sofas, wooden furniture and designer tiles by Ceramics & Beyond',
    ]),
]);

// Section 2: Brand Introduction
Database::execute("
    INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content_json)
    VALUES (:pid, 'brand_intro', 2, 1, :json)
", [
    ':pid' => $pageId,
    ':json' => json_encode([
        'tag' => '1. Our Story · A Creative Instinct, A Passion for Making',
        'headline' => 'A Creative Instinct, A Passion for Making.',
        'paragraph_1' => 'I have always been drawn to the art of making things beautiful. As a NIFT graduate, design has always been a part of who I am — from the smallest details to the way an entire space comes together. Over time, that creative instinct found its way into furniture, and what began as a love for design grew into a passion for creating things that are as practical as they are beautiful. That passion became Ceramics & Beyond.',
        'paragraph_2' => 'As a woman entrepreneur in a traditionally male-dominated, manufacturing-intensive industry, I wanted to build something that reflected my own beliefs: thoughtful design, practical solutions, complete customisation and a personal involvement in every detail. I believe a home should be designed around the people living in it, not the other way around. Every corner should have a purpose. Every piece should feel like it belongs. And the process of creating it should be honest, transparent and joyful.',
        'heritage_note' => 'Because making a house look good is one thing. Making it feel like home? That\'s our job.',
        'metric_1_val' => 'NIFT',
        'metric_1_lbl' => 'Design Pedigree',
        'metric_2_val' => '100%',
        'metric_2_lbl' => 'In-House Factory',
        'metric_3_val' => '0',
        'metric_3_lbl' => 'Middlemen / Markup',
        'image_url' => '/images/founder-story.jpeg',
        'image_alt' => 'Bespoke architectural furniture craftsmanship by Ceramics & Beyond',
    ]),
]);

// Section 3: Manufacturing & Craftsmanship
Database::execute("
    INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content_json)
    VALUES (:pid, 'craftsmanship', 3, 1, :json)
", [
    ':pid' => $pageId,
    ':json' => json_encode([
        'section_tag' => '4. Why Ceramics & Beyond? · The Live Counter Concept',
        'headline' => 'Factory & Experience Centre Under One Roof.',
        'supporting_text' => 'Think of it like watching your paneer tikka being prepared fresh at a live counter — except this time, it\'s your kitchen taking shape. Total transparency from raw boards to precision assembly.',
        'feature_1_title' => 'Complete In-House Manufacturing',
        'feature_1_text' => 'Zero-gap seamless polyurethane edge-banding, computerized sizing, and dust-free spray booths under one roof.',
        'feature_2_title' => 'Unlimited Finishes & Customisation',
        'feature_2_text' => 'Specialty PU paint with unlimited RAL & Pantone colour matching, natural wood veneer, duco, glass, laminates, acrylic, and rattan.',
        'feature_3_title' => 'German Hardware Standard',
        'feature_3_text' => 'Fitted exclusively with Blum, Hettich, and Hafele hinges, runners, and lift-up systems for silent, lifelong operation.',
        'cta_label' => 'EXPERIENCE THE LIVE COUNTER',
        'cta_url' => '/craftsmanship',
        'image_url' => '/images/in-house-cnc.jpeg',
        'image_alt' => 'Precision manufacturing and craftsmanship on the factory floor',
    ]),
]);

// Section 4: Consultation Enquiries
Database::execute("
    INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content_json)
    VALUES (:pid, 'export_enquiries', 4, 1, :json)
", [
    ':pid' => $pageId,
    ':json' => json_encode([
        'section_tag' => 'Custom Furniture Consultation',
        'headline' => 'Want Custom Furniture for Your Home?',
        'supporting_text' => 'Talk directly with our team. Whether you need a comfortable custom sofa, solid wood furniture, modular kitchen, wardrobes, or designer tiles, we make everything right here in our New Delhi workshop.',
        'cta_label' => 'TALK TO OUR TEAM',
        'cta_url' => '/contact',
        'markets_served' => 'Serving homeowners, architects, and interior designers across Delhi NCR and pan-India with bespoke modular living solutions.',
    ]),
]);

// Section 5: Final CTA
Database::execute("
    INSERT INTO page_sections (page_id, section_type, section_order, is_visible, content_json)
    VALUES (:pid, 'final_cta', 5, 1, :json)
", [
    ':pid' => $pageId,
    ':json' => json_encode([
        'headline' => 'Making a house look good is one thing. Making it feel like home? That’s our job.',
        'supporting_text' => 'Simple yet seen. Practical yet personal. Made for the way you live. Explore bespoke furniture and in-house modular manufacturing tailored around you.',
        'cta_primary_label' => 'EXPLORE WHAT WE MAKE',
        'cta_primary_url' => '/products',
        'cta_secondary_label' => 'TALK TO OUR TEAM',
        'cta_secondary_url' => '/contact',
    ]),
]);
echo "✓ Homepage sections updated with manufacturer copy.\n";

// 8. Sample Enquiries
Database::execute("DELETE FROM enquiries WHERE product_category LIKE '%tile%' OR message LIKE '%tile%' OR message LIKE '%Petersburg%' OR company_name LIKE '%Vostok%' OR country = 'Russia'");

if (Database::fetch("SELECT COUNT(*) as c FROM enquiries")['c'] < 2) {
    Database::execute("
        INSERT INTO enquiries (full_name, company_name, email, phone, country, enquiry_type, product_category, project_type, estimated_quantity, message, status, ip_address)
        VALUES ('Priya Sharma', 'Vasant Vihar Residence', 'priya.sharma@example.com', '+91 98111 22334', 'India', 'Modular Kitchen Enquiry', 'Modular Furniture', 'Modular Kitchens', 'Full Villa Scope', 'Looking for a handleless acrylic and veneer modular kitchen with Blum hardware and integrated breakfast counter.', 'new', '127.0.0.1')
    ");
    Database::execute("
        INSERT INTO enquiries (full_name, company_name, email, phone, country, enquiry_type, product_category, project_type, estimated_quantity, message, status, ip_address)
        VALUES ('Vikram Malhotra', 'Malhotra & Associates Architects', 'vikram@example.com', '+91 98100 44556', 'India', 'Architect / Designer Collaboration', 'Bespoke Furniture', 'Bespoke Furniture', '5 Bedroom Penthouse', 'Need custom PU paint wardrobes with fluted glass doors and bespoke dining table for our GK-2 project.', 'in_review', '127.0.0.1')
    ");
}

echo "✓ Seed completed successfully!\n";
