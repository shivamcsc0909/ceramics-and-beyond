-- Ceramics & Beyond Database Backup
-- Generated: 2026-10-15 06:45:24
-- Driver: sqlite

DROP TABLE IF EXISTS "roles";
CREATE TABLE roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "roles" ("id", "name", "description", "created_at") VALUES ('1', 'CLIENT_ADMIN', 'Client content and collections manager', '2026-10-15 06:01:44');
INSERT INTO "roles" ("id", "name", "description", "created_at") VALUES ('2', 'DEVELOPER_ADMIN', 'Private system administrator', '2026-10-15 06:01:44');

DROP TABLE IF EXISTS "users";
CREATE TABLE users (
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

INSERT INTO "users" ("id", "role_id", "email", "password_hash", "display_name", "status", "failed_logins", "lockout_until", "last_login_at", "created_at", "updated_at") VALUES ('1', '1', 'client.admin@ceramicsandbeyond.com', '$2y$12$xO993b4a20mANjtJy7evs.PKkENgd50e1LdnD9JfH/qiwN2ANgZei', 'Client Administrator', 'active', '0', NULL, '2026-10-15 06:03:37', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "users" ("id", "role_id", "email", "password_hash", "display_name", "status", "failed_logins", "lockout_until", "last_login_at", "created_at", "updated_at") VALUES ('2', '2', 'dev.portal@ceramicsandbeyond.com', '$2y$12$c7G5l5UtGiUMYYvR147J5.Nh5eIkI9jY3iNZkRxzSkdzS5Y5QCtGG', 'Principal System Architect', 'active', '0', NULL, '2026-10-15 06:03:47', '2026-10-15 06:01:45', '2026-10-15 06:01:45');

DROP TABLE IF EXISTS "login_attempts";
CREATE TABLE login_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT NOT NULL,
        portal_type TEXT NOT NULL,
        email_attempted TEXT NOT NULL,
        successful INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "login_attempts" ("id", "ip_address", "portal_type", "email_attempted", "successful", "created_at") VALUES ('1', '0.0.0.0', 'client', 'client.admin@ceramicsandbeyond.com', '1', '2026-10-15 06:03:37');
INSERT INTO "login_attempts" ("id", "ip_address", "portal_type", "email_attempted", "successful", "created_at") VALUES ('2', '0.0.0.0', 'developer', 'client.admin@ceramicsandbeyond.com', '0', '2026-10-15 06:03:42');
INSERT INTO "login_attempts" ("id", "ip_address", "portal_type", "email_attempted", "successful", "created_at") VALUES ('3', '0.0.0.0', 'developer', 'dev.portal@ceramicsandbeyond.com', '1', '2026-10-15 06:03:47');

DROP TABLE IF EXISTS "sessions";
CREATE TABLE sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        portal_type TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        user_agent TEXT,
        last_activity INTEGER NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );


DROP TABLE IF EXISTS "pages";
CREATE TABLE pages (
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

INSERT INTO "pages" ("id", "slug", "title", "meta_title", "meta_description", "og_image_url", "status", "updated_by", "published_at", "created_at", "updated_at") VALUES ('1', 'home', 'Home', 'Ceramics & Beyond | Beyond Surfaces', 'Curated architectural surfaces & live kitchen manufacturing', NULL, 'published', NULL, NULL, '2026-10-15 06:01:45', '2026-10-15 06:01:45');

DROP TABLE IF EXISTS "page_sections";
CREATE TABLE page_sections (
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

INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('4', '1', 'hero', '1', '1', '{"eyebrow":"Ceramic Tile Manufacturer & Exporter \u00b7 New Delhi, India","headline":"Crafted in Ceramic.","headline_accent":"Designed to Stand Apart.","supporting_text":"Discover distinctive ceramic tiles, handcrafted patterns, decorative surfaces, and timeless designs from Ceramics & Beyond.","cta_primary_label":"EXPLORE OUR PRODUCTS","cta_primary_url":"\/products","cta_secondary_label":"ENQUIRE FOR BUSINESS","cta_secondary_url":"\/export-enquiries","image_desktop":"https:\/\/images.unsplash.com\/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=2400&q=90","image_mobile":"https:\/\/images.unsplash.com\/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85","image_alt":"Artisanal decorative ceramic tiles showcase with rich glazes and patterns"}', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('5', '1', 'brand_intro', '2', '1', '{"tag":"Manufacturer Profile \u00b7 Est. 1993","headline":"A Legacy of Ceramic Craftsmanship.","paragraph_1":"Ceramics & Beyond brings together a diverse range of ceramic tiles, decorative patterns, handmade finishes, and mosaic designs for buyers seeking distinctive products and reliable business relationships.","paragraph_2":"With heritage referencing Bansal Marbles And Tiles and an operating foundation established in 1993 in New Delhi, India, we cater to B2B distributors, wholesalers, architects, builders, and international export partners across Asia, Russia, and global markets.","heritage_note":"Reported establishment year: 1993. Heritage origin: Bansal Marbles And Tiles. All manufacturing specifications subject to client confirmation.","metric_1_val":"1993","metric_1_lbl":"Heritage Founded","metric_2_val":"6","metric_2_lbl":"Specialized Categories","metric_3_val":"B2B","metric_3_lbl":"Export Oriented","image_url":"https:\/\/images.unsplash.com\/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85","image_alt":"Handmade ceramic tiles drying in artisanal workshop setting"}', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('6', '1', 'craftsmanship', '3', '1', '{"section_tag":"Manufacturing & Craftsmanship","headline":"Every Pattern Tells a Story.","supporting_text":"Explore decorative ceramic designs, distinctive patterns, and a variety of tile styles created for buyers seeking character and individuality in ceramic surfaces.","feature_1_title":"Hand-Printed Precision","feature_1_text":"Screen and relief stamping with vibrant mineral glazes that withstand wear and preserve vibrant color integrity.","feature_2_title":"Handmade Individuality","feature_2_text":"Each tile reflects artisanal shaping, subtle tonal undulations, and organic contours that machine pressing cannot duplicate.","feature_3_title":"Sandblast & Relief Textures","feature_3_text":"Controlled surface abrasion creating delicate micro-grooves, shadows, and architectural tactile depth.","cta_label":"LEARN ABOUT OUR CRAFTSMANSHIP","cta_url":"\/craftsmanship","image_url":"https:\/\/images.unsplash.com\/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85","image_alt":"Artisans detailing decorative ceramic tile patterns"}', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('7', '1', 'export_enquiries', '4', '1', '{"section_tag":"B2B Trade & Global Export","headline":"Looking for the Right Ceramic Tile Supplier?","supporting_text":"Connect with Ceramics & Beyond to discuss product availability, catalogue requirements, bulk enquiries, distribution opportunities, and export-related business requirements.","cta_label":"SEND A BUSINESS ENQUIRY","cta_url":"\/export-enquiries","markets_served":"Supplying distributors, dealers, architects, builders, and international importers across Asia, Russia, and global regions from New Delhi, India."}', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('8', '1', 'final_cta', '5', '1', '{"headline":"Find Your Next Ceramic Collection.","supporting_text":"Browse our catalog of handmade, hand-printed, sandblast, border, mosaic, and decorative tiles, or speak directly with our export team.","cta_primary_label":"EXPLORE PRODUCTS","cta_primary_url":"\/products","cta_secondary_label":"REQUEST CATALOGUE","cta_secondary_url":"\/catalogue"}', '2026-10-15 06:25:34', '2026-10-15 06:25:34');

DROP TABLE IF EXISTS "collections";
CREATE TABLE collections (
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

INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('1', 'bespoke-kitchens', 'Bespoke Kitchens & Cabinetry', 'Architectural Precision & Live Factory Craft', 'Kitchen Architecture', 'Engineered with German precision hardware and handcrafted by master joiners. Designed from monolithic stone islands to tactile fluted timber cabinetry, crafted transparently on our live factory floor.', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85', 'Bespoke architectural kitchen with precision cabinetry and stone waterfall island', '[{"label":"Hardware","value":"German Blum & Grass concealed soft-motion systems"},{"label":"Carcass Core","value":"Marine-grade high density moisture resistant substrate"},{"label":"Front Finishes","value":"Bookmatched veneer, sintered stone, matte lacquer"},{"label":"Warranty","value":"10-Year Comprehensive Atelier Guarantee"}]', '["Sintered Stone Fronts","Smoked Oak Veneer","Super-Matte Anti-Fingerprint","Brushed Metallic Bronze"]', '["Open-Plan Living Kitchens","Chef Pantries","Breakfast Bars","Entertaining Islands"]', '["Live factory-floor fabrication walkthrough","Concealed pocket doors and seamless appliance integration","Integrated architectural LED under-glow channels","Ergonomic dual-height worktop zoning"]', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('2', 'porcelain-surfaces', 'Continuous Porcelain Surfaces', 'Ultra-Compact Monolithic Slabs', 'Large-Format Slabs', 'Seamless large-format porcelain slabs up to 3200 × 1600mm. Virtually zero porosity, UV-resistant, scratch-proof, and heat-impervious, bridging indoor living with architectural exterior facades.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85', 'Large format porcelain surface in a contemporary open-concept pavilion', '[{"label":"Slab Dimensions","value":"Up to 3200mm \u00d7 1600mm"},{"label":"Thickness Range","value":"6mm (facades\/walls), 12mm (countertops), 20mm (heavy traffic)"},{"label":"Absorption Rate","value":"< 0.05% (near total impermeability)"},{"label":"Fire Rating","value":"Class A1 Non-combustible"}]', '["Silk Matte","Polished Glass Reflective","Structured Slate","Honed Velvet"]', '["Countertops & Islands","Continuous Flooring","Fireplace Surrounds","Ventilated Facades"]', '["Stain, wine, and acid resistant without periodic sealing","Direct pan-to-surface heat resistance up to 300\u00b0C","Seamless vein matching across multiple consecutive slabs"]', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('3', 'marble-natural-stone', 'Marble & Natural Stone', 'Earth’s Rare Geological Formations', 'Natural Quarried Stone', 'Individually hand-selected blocks quarried from premier European and Mediterranean deposits. Every slab is an unrepeatable work of natural art, meticulously bookmatched and finished by artisan stonemasons.', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85', 'Calacatta Gold marble slab installed in luxury residence', '[{"label":"Origins","value":"Carrara, Tuscany, Greece, and Portugal"},{"label":"Matching","value":"Mirror bookmatch & quad-match available"},{"label":"Edge Finishing","value":"Shark-nose, double mitre, bullnose, chiseled"},{"label":"Sealing","value":"Nano-molecular protective impregnating barrier"}]', '["Antique Honed","High-Gloss Mirror Polish","Leathered Patina","Brushed Flamed"]', '["Feature Statement Walls","Custom Bath Vanities","Staircases & Landings","Sculptural Islands"]', '["Hand-inspected slab curation directly from historic quarries","Custom precision water-jet and CNC fabrication","Bespoke bookmatching visualization prior to cutting"]', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('4', 'ceramic-tiles', 'Artisanal Ceramic Tiles', 'Tactile Textures & Refined Geometry', 'Ceramic Architecture', 'A tribute to ancient ceramic craftsmanship infused with contemporary architectural geometry. Characterized by subtle undulating surfaces, organic glazes, and rich earthy pigmentation.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85', 'Warm minimalist space clad in artisanal earthy ceramic tiles', '[{"label":"Firing Process","value":"Double-fired high temperature Italian kiln"},{"label":"Glaze Finish","value":"Mineral pigment reactive matte & crackle"},{"label":"Rectification","value":"Precision ground square edges"},{"label":"Eco-Rating","value":"100% natural clay & recycled mineral body"}]', '["Zellige Hand-Crafted Glaze","Matte Biscuit","Craquelure Glaze","Ribbed Terracotta"]', '["Kitchen Backsplashes","Shower Enclosures","Artisan Feature Columns","Powder Rooms"]', '["Subtle organic variations between tiles for authentic depth","High chemical resistance to everyday domestic agents"]', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('5', 'designer-wall-tiles', 'Designer 3D & Wall Surfaces', 'Acoustic Depth & Bas-Relief Murals', 'Sculptural Surfaces', 'Elevate vertical architecture with sculptural three-dimensional surfaces, fluted stone reliefs, and geometric ceramic forms designed to interact dynamically with daylight and shadow.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85', 'Fluted 3D ceramic feature wall in luxury living room', '[{"label":"Relief Depth","value":"12mm to 45mm dimensional extrusion"},{"label":"Acoustics","value":"Sound diffusion and dampening profile"},{"label":"Installation","value":"Interlocking modular system with concealed anchoring"}]', '["Fluted Pillar Relief","Micro-Ribbed Ridge","Wave Texture"]', '["Living Room Accent Walls","Hotel Reception Portals","Dining Backdrops"]', '["Creates striking shadows under directional grazing light","Improves room acoustic comfort while maintaining stone durability"]', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('6', 'flooring-solutions', 'Architectural Flooring Solutions', 'Continuous Underfoot Grandeur', 'Flooring Systems', 'Curated large-format porcelain, engineered natural stone, and micro-terrazzo engineered for high foot traffic, underfloor heating compatibility, and slip resistance.', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85', 'Seamless expansive stone floor in high-ceiling modern home', '[{"label":"Slip Rating","value":"R10 \/ R11 PTV 36+ (Wet & Dry Certified)"},{"label":"Thermal Transfer","value":"Optimized for radiant hydronic floor heating"},{"label":"Wear Rating","value":"PEI V (Maximum heavy commercial traffic)"}]', '["Soft-Touch Satin","Brushed Anti-Slip","Honed Limestone"]', '["Open Living Salons","Boutique Lobbies","Terraces & Pool Surrounds"]', '["Uniform calibration allows for 1.5mm minimal joint widths","High thermal mass retains ambient room temperature efficiently"]', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('7', 'bathroom-surfaces', 'Sanctuary Bathroom Surfaces', 'Monolithic Moisture Impervious Stone', 'Wellness & Bath', 'Transforming wet spaces into spa retreats. Seamless slab shower surrounds, integrated stone basins, and antibacterial non-porous porcelain surfaces engineered for wet-room luxury.', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1800&q=85', 'Minimalist master bathroom with freestanding stone tub and continuous porcelain walls', '[{"label":"Hygiene","value":"Silver-ion antibacterial surface treatment"},{"label":"Water Absorption","value":"< 0.02% (Impervious to mold & mildew)"},{"label":"Customization","value":"Bespoke carved basins & shower trays"}]', '["Velvet Matte Honed","Micro-Grit Textured Anti-Slip","Polished Marble Glow"]', '["Walk-in Wet Rooms","Custom Vanity Tops","Floating Sinks"]', '["Zero grout lines inside showers with our 3-meter continuous slabs","Resistant to bath salts, essential oils, and limescale buildup"]', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('8', 'hand-printed-tiles', 'Hand-Printed Ceramic Tiles', 'Floral, Traditional & Contemporary Motifs', 'Ceramic Tiles', 'Artisanal hand-printed ceramic tiles featuring delicate botanical florals, intricate traditional motifs, and contemporary coordinated patterns. Each tile exhibits authentic glaze depth and crisp pattern definition.', 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85', 'Hand-printed ceramic tile with intricate decorative pattern and fine glazing', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '1', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('9', 'handmade-tiles', 'Handmade Ceramic Tiles', 'Square, Hexagonal & Artisan Shapes', 'Ceramic Tiles', 'Individually crafted ceramic tiles with organic tactile surface undulations, subtle tonal variations, and hand-finished edges. Available in square, hexagonal, and custom artisan silhouettes.', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85', 'Handmade glazed ceramic tiles displaying artisanal texture and organic finish', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '2', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('10', 'sandblast-tiles', 'Sandblast Tiles', 'Textured Relief & Patterned Finishes', 'Ceramic Tiles', 'Precision sandblasted ceramic tiles offering tactile depth, carved geometric relief, and matte architectural surface finishes suitable for feature walls and statement applications.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', 'Sandblast textured ceramic tile surface with tactile geometric relief', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '3', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('11', 'border-tiles', 'Border Tiles', 'Decorative Bands & Mosaic Trims', 'Ceramic Tiles', 'Coordinated ceramic border tiles, listello accents, and decorative trims designed to frame wall installations, transition spaces, and add artisanal distinction to tiled surfaces.', 'https://images.unsplash.com/photo-1527352774811-1970678572b2?auto=format&fit=crop&w=1200&q=85', 'Decorative ceramic border tiles with classical listello pattern', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '4', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('12', 'mosaic-tiles', 'Mosaic Tiles', 'Sheet-Mounted Wall & Accent Mosaics', 'Ceramic Tiles', 'Precision sheet-mounted ceramic and stone mosaics crafted in herringbone, hexagonal, square, and custom tesserae layouts for backsplashes, shower sanctuaries, and feature walls.', 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=85', 'Ceramic mosaic tile sheets with geometric tesserae pattern', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '5', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('13', 'decorative-tiles', 'Decorative & Special-Pattern Tiles', 'Cross-Line, Geometric & Medallion Motifs', 'Ceramic Tiles', 'Distinctive patterned ceramic tiles featuring geometric cross-line structures, encaustic-inspired medallions, and traditional decorative designs for expressive interior surfaces.', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85', 'Decorative ceramic tiles featuring geometric and medallion patterns', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '6', '2026-10-15 06:25:34', '2026-10-15 06:25:34');

DROP TABLE IF EXISTS "collection_images";
CREATE TABLE collection_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        collection_id INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        alt_text TEXT NOT NULL,
        caption TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
    );


DROP TABLE IF EXISTS "projects";
CREATE TABLE projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        location TEXT NOT NULL,
        year TEXT NOT NULL,
        description TEXT NOT NULL,
        brief TEXT,
        materials_json TEXT,
        cover_image_url TEXT NOT NULL,
        image_alt TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        meta_title TEXT,
        meta_description TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "projects" ("id", "slug", "title", "category", "location", "year", "description", "brief", "materials_json", "cover_image_url", "image_alt", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('1', 'the-zenith-penthouse', 'The Zenith Penthouse', 'Residential Architecture', 'Worli, Mumbai', '2025', 'A 6,500 sq.ft triplex penthouse overlooking the Arabian Sea, featuring a dramatic 4.2-meter bookmatched Calacatta island and live-fabricated smoked oak cabinetry.', 'The client sought a fluid architectural dialogue between expansive panoramic sea views and tactile, organic surfaces. We engineered a seamless transition from the open salon into a culinary theatre featuring custom pocket-door cabinetry and monolithic stone islands.', '["Calacatta Oro Natural Marble (Bookmatched)","Smoked Rift Oak Cabinetry with German Soft-Motion","Large-Format Silk Honed Porcelain Flooring (3200 \u00d7 1600mm)","Fluted Bisque Ceramic Feature Wall"]', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85', 'The Zenith Penthouse open-concept kitchen and living salon', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "projects" ("id", "slug", "title", "category", "location", "year", "description", "brief", "materials_json", "cover_image_url", "image_alt", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('2', 'alila-coastal-villa', 'Alila Coastal Villa', 'Private Sanctuary', 'North Goa', '2025', 'A tropical modernist residence built around a courtyard, utilizing earthy fluted terracotta, textured slate, and weather-impervious outdoor sintered stone.', 'Designed to blur indoor living with lush tropical gardens. The challenge was selecting materials capable of withstanding coastal monsoon humidity and salt-laden air while maintaining understated artisanal beauty.', '["Fluted Ochre Terracotta Ceramic Wall Tiles","Charcoal Basalt Ultra-Compact Sintered Worktops","R11 Textured Outdoor Porcelain Pavers"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', 'Alila Coastal Villa courtyard and indoor-outdoor living pavilion', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "projects" ("id", "slug", "title", "category", "location", "year", "description", "brief", "materials_json", "cover_image_url", "image_alt", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('3', 'atelier-m-flagship', 'Atelier M Flagship', 'Retail Architecture', 'Chanakyapuri, New Delhi', '2024', 'A premier luxury couture boutique featuring monolithic travertine display plinths, acoustic bas-relief 3D ceramic walls, and bronze shadow-gap detailing.', 'The client requested a gallery-like backdrop where high-fashion garments are treated like museum artifacts. We designed custom travertine blocks and floor-to-ceiling sculptural wall modules.', '["Travertine Romano Filled & Satin Honed","Designer 3D Extruded Ceramic Bas-Relief Panels","Satin Black Sintered Countertops"]', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85', 'Atelier M Flagship retail gallery interior', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "projects" ("id", "slug", "title", "category", "location", "year", "description", "brief", "materials_json", "cover_image_url", "image_alt", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('4', 'soma-wellness-pavilion', 'Soma Wellness Pavilion', 'Hospitality & Spa', 'Whitefield, Bengaluru', '2024', 'An urban wellness refuge utilizing silky velvet matte porcelain, monolithic carved stone pools, and steam-resistant mineral finishes.', 'Crafting an environment of absolute sensorial tranquility. Every stone surface was chosen for its tactile warmth under bare feet and natural resistance to organic oils and steam.', '["Velvet Honed Basaltina Porcelain Slabs","Slip-Resistant R11 Satin Stone Pavers","Silver-Ion Antibacterial Wet Wall Liners"]', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85', 'Soma Wellness Pavilion indoor mineral bath and stone sanctuary', 'published', NULL, NULL, '0', '2026-10-15 06:01:45', '2026-10-15 06:01:45');

DROP TABLE IF EXISTS "project_images";
CREATE TABLE project_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        alt_text TEXT NOT NULL,
        caption TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
    );


DROP TABLE IF EXISTS "articles";
CREATE TABLE articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT NOT NULL DEFAULT 'Editorial Studio',
        excerpt TEXT NOT NULL,
        content_json TEXT NOT NULL,
        featured_image_url TEXT NOT NULL,
        image_alt TEXT NOT NULL,
        read_time TEXT NOT NULL DEFAULT '5 min read',
        status TEXT NOT NULL DEFAULT 'published',
        meta_title TEXT,
        meta_description TEXT,
        published_at TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "articles" ("id", "slug", "title", "category", "author", "excerpt", "content_json", "featured_image_url", "image_alt", "read_time", "status", "meta_title", "meta_description", "published_at", "created_at", "updated_at") VALUES ('1', 'choosing-ceramic-surfaces', 'Choosing the Right Ceramic Surfaces: The Architect’s Material Guide', 'Material Selection', 'Editorial Studio', 'A comprehensive architectural analysis on balancing slip resistance, thermal conductivity, light reflectance, and aesthetic character when specifying large-format porcelain vs ceramic.', '{"heading":"The Intersection of Engineering and Emotion","body":"Specifying surfaces for contemporary architecture requires looking far beyond superficial color cards. A surface is the only architectural plane that human occupants touch with every step, every lean against an island, and every resting hand on a vanity."}', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', 'Architect reviewing large ceramic and porcelain material samples', '6 min read', 'published', NULL, NULL, NULL, '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "articles" ("id", "slug", "title", "category", "author", "excerpt", "content_json", "featured_image_url", "image_alt", "read_time", "status", "meta_title", "meta_description", "published_at", "created_at", "updated_at") VALUES ('2', 'the-live-kitchen-revolution', 'The Live Kitchen Revolution: Why Transparency Changes Everything', 'Design Philosophy', 'Editorial Studio', 'No secret ingredients, no mystery middlemen. How inviting homeowners directly onto the factory floor to watch their kitchens being manufactured has redefined luxury joinery.', '{"heading":"The Food Analogy: Seeing Your Recipe Cooked Live","body":"Ever watched your favourite culinary dish being prepared live right in front of you? There is a primal trust and tactile delight in witnessing skilled hands orchestrate raw ingredients into a masterpiece. We bring that exact transparency to kitchen fabrication."}', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85', 'Master joiners working on high precision kitchen components in factory', '5 min read', 'published', NULL, NULL, NULL, '2026-10-15 06:01:45', '2026-10-15 06:01:45');

DROP TABLE IF EXISTS "media";
CREATE TABLE media (
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


DROP TABLE IF EXISTS "enquiries";
CREATE TABLE enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        project_type TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        ip_address TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    , company_name TEXT, country TEXT DEFAULT 'India', enquiry_type TEXT DEFAULT 'General Business', product_category TEXT, estimated_quantity TEXT);

INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('1', 'Acceptance Test Architect', 'architect@example.com', '+91 98765 00000', 'Bespoke Kitchen & Live Experience', 'Inquiring about 3200x1600mm continuous porcelain slabs for coastal villa.', 'new', '127.0.0.1', '2026-10-15 06:18:52', '2026-10-15 06:18:52', NULL, 'India', 'General Business', NULL, NULL);
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('2', 'Acceptance Test Architect', 'architect@example.com', '+91 98765 00000', 'Bespoke Kitchen & Live Experience', 'Inquiring about 3200x1600mm continuous porcelain slabs for coastal villa.', 'new', '127.0.0.1', '2026-10-15 06:19:35', '2026-10-15 06:19:35', NULL, 'India', 'General Business', NULL, NULL);
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('3', 'Acceptance Test Architect', 'architect@example.com', '+91 98765 00000', 'Bespoke Kitchen & Live Experience', 'Inquiring about 3200x1600mm continuous porcelain slabs for coastal villa.', 'new', '127.0.0.1', '2026-10-15 06:20:03', '2026-10-15 06:20:03', NULL, 'India', 'General Business', NULL, NULL);
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('4', 'Acceptance Test Architect', 'architect@example.com', '+91 98765 00000', 'Bespoke Kitchen & Live Experience', 'Inquiring about 3200x1600mm continuous porcelain slabs for coastal villa.', 'new', '127.0.0.1', '2026-10-15 06:21:51', '2026-10-15 06:21:51', NULL, 'India', 'General Business', NULL, NULL);
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('5', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-15 06:27:31', '2026-10-15 06:27:31', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('6', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-15 06:27:48', '2026-10-15 06:27:48', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('7', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-15 06:34:29', '2026-10-15 06:34:29', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('8', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-15 06:40:46', '2026-10-15 06:40:46', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('9', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-15 06:42:01', '2026-10-15 06:42:01', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('10', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-15 06:45:24', '2026-10-15 06:45:24', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');

DROP TABLE IF EXISTS "site_settings";
CREATE TABLE site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting_key TEXT NOT NULL UNIQUE,
        setting_value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        updated_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('1', 'brand_name', 'Ceramics & Beyond', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('2', 'brand_tagline', 'Crafted in Ceramic. Designed to Stand Apart.', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('3', 'brand_description', 'Ceramics & Beyond is a premier ceramic tile manufacturer and exporter based in New Delhi, India. Established in 1993 with roots in Bansal Marbles And Tiles, offering handmade ceramic tiles, hand-printed tiles, sandblast tiles, border tiles, mosaic tiles, and decorative ceramic surfaces for B2B distributors, architects, builders, and international export markets.', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('4', 'contact_email', 'hello@example.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('5', 'contact_phone', '+91 98765 43210', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('6', 'contact_address', 'New Delhi, Delhi, India', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('7', 'contact_hours', 'Monday – Saturday: 10:00 AM – 7:00 PM IST', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('8', 'social_instagram', 'https://instagram.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('9', 'social_pinterest', 'https://pinterest.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('10', 'social_linkedin', 'https://linkedin.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('11', 'meta_title', 'Ceramics & Beyond | Ceramic Tile Manufacturer & Exporter | New Delhi, India', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('12', 'meta_description', 'Manufacturer and exporter of handmade, hand-printed, sandblast, border, mosaic, and decorative ceramic tiles based in New Delhi, India. Est. 1993.', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('13', 'business_category', 'Ceramic Tile Manufacturer & Exporter', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('14', 'establishment_year', '1993', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('15', 'heritage_name', 'Bansal Marbles And Tiles', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('16', 'location_city', 'New Delhi', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('17', 'location_state', 'Delhi', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('18', 'location_country', 'India', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('19', 'export_markets', 'Asia and Russia', 'general', '2026-10-15 06:25:34');

DROP TABLE IF EXISTS "content_versions";
CREATE TABLE content_versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity_type TEXT NOT NULL,
        entity_id INTEGER NOT NULL,
        version_data_json TEXT NOT NULL,
        created_by INTEGER,
        created_at TEXT DEFAULT (datetime('now'))
    );


DROP TABLE IF EXISTS "audit_logs";
CREATE TABLE audit_logs (
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

INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('1', '1', 'client', 'login_success', 'user', '1', '{"portal":"client"}', '0.0.0.0', '2026-10-15 06:03:37');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('2', '1', 'developer', 'unauthorized_portal_access_attempt', 'user', '1', '{"attempted_portal":"developer","user_role":"CLIENT_ADMIN"}', '0.0.0.0', '2026-10-15 06:03:42');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('3', '2', 'developer', 'login_success', 'user', '2', '{"portal":"developer"}', '0.0.0.0', '2026-10-15 06:03:47');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('4', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_061852.sql","size":35288}', '0.0.0.0', '2026-10-15 06:18:52');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('5', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_061936.sql","size":36386}', '0.0.0.0', '2026-10-15 06:19:36');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('6', '2', 'developer', 'automated_suite_verification', 'test', NULL, '{"suite":"active"}', '0.0.0.0', '2026-10-15 06:19:36');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('7', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_062004.sql","size":37696}', '0.0.0.0', '2026-10-15 06:20:04');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('8', '2', 'developer', 'automated_suite_verification', 'test', NULL, '{"suite":"active"}', '0.0.0.0', '2026-10-15 06:20:04');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('9', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_062152.sql","size":39068}', '0.0.0.0', '2026-10-15 06:21:52');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('10', '2', 'developer', 'automated_suite_verification', 'test', NULL, '{"suite":"active"}', '0.0.0.0', '2026-10-15 06:21:52');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('11', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_062731.sql","size":64865}', '0.0.0.0', '2026-10-15 06:27:31');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('12', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 06:27:31');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('13', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_062749.sql","size":66400}', '0.0.0.0', '2026-10-15 06:27:49');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('14', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 06:27:49');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('15', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_063429.sql","size":67955}', '0.0.0.0', '2026-10-15 06:34:29');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('16', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 06:34:29');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('17', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_064047.sql","size":69510}', '0.0.0.0', '2026-10-15 06:40:47');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('18', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 06:40:47');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('19', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_064202.sql","size":71065}', '0.0.0.0', '2026-10-15 06:42:02');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('20', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 06:42:02');

DROP TABLE IF EXISTS "maintenance_settings";
CREATE TABLE maintenance_settings (
        id INTEGER PRIMARY KEY,
        is_active INTEGER NOT NULL DEFAULT 0,
        message TEXT NOT NULL,
        reason TEXT,
        activated_by INTEGER,
        activated_at TEXT,
        allowed_ips_json TEXT,
        updated_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "maintenance_settings" ("id", "is_active", "message", "reason", "activated_by", "activated_at", "allowed_ips_json", "updated_at") VALUES ('1', '0', 'Live', 'Routine Maintenance', NULL, NULL, '[]', '2026-10-15 06:01:45');

DROP TABLE IF EXISTS "backup_records";
CREATE TABLE backup_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        file_path TEXT NOT NULL,
        backup_type TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        created_by INTEGER,
        status TEXT NOT NULL DEFAULT 'completed',
        created_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('1', 'backup_db_20261015_060356.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_060356.sql', 'database', '34509', '2', 'completed', '2026-10-15 06:03:56');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('2', 'backup_db_20261015_061852.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_061852.sql', 'database', '35288', '2', 'completed', '2026-10-15 06:18:52');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('3', 'backup_db_20261015_061936.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_061936.sql', 'database', '36386', '2', 'completed', '2026-10-15 06:19:36');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('4', 'backup_db_20261015_062004.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_062004.sql', 'database', '37696', '2', 'completed', '2026-10-15 06:20:04');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('5', 'backup_db_20261015_062152.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_062152.sql', 'database', '39068', '2', 'completed', '2026-10-15 06:21:52');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('6', 'backup_db_20261015_062731.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_062731.sql', 'database', '64865', '2', 'completed', '2026-10-15 06:27:31');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('7', 'backup_db_20261015_062749.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_062749.sql', 'database', '66400', '2', 'completed', '2026-10-15 06:27:49');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('8', 'backup_db_20261015_063429.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_063429.sql', 'database', '67955', '2', 'completed', '2026-10-15 06:34:29');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('9', 'backup_db_20261015_064047.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_064047.sql', 'database', '69510', '2', 'completed', '2026-10-15 06:40:47');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('10', 'backup_db_20261015_064202.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_064202.sql', 'database', '71065', '2', 'completed', '2026-10-15 06:42:02');

DROP TABLE IF EXISTS "categories";
CREATE TABLE categories (
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

INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('1', 'hand-printed-tiles', 'Hand-Printed Ceramic Tiles', 'Floral, Traditional & Contemporary Motifs', 'Artisanal hand-printed ceramic tiles featuring delicate botanical florals, intricate traditional motifs, and contemporary coordinated patterns. Each tile exhibits authentic glaze depth and crisp pattern definition.', 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85', 'Hand-printed ceramic tile with intricate decorative pattern and fine glazing', 'published', '1', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('2', 'handmade-tiles', 'Handmade Ceramic Tiles', 'Square, Hexagonal & Artisan Shapes', 'Individually crafted ceramic tiles with organic tactile surface undulations, subtle tonal variations, and hand-finished edges. Available in square, hexagonal, and custom artisan silhouettes.', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85', 'Handmade glazed ceramic tiles displaying artisanal texture and organic finish', 'published', '2', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('3', 'sandblast-tiles', 'Sandblast Tiles', 'Textured Relief & Patterned Finishes', 'Precision sandblasted ceramic tiles offering tactile depth, carved geometric relief, and matte architectural surface finishes suitable for feature walls and statement applications.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', 'Sandblast textured ceramic tile surface with tactile geometric relief', 'published', '3', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('4', 'border-tiles', 'Border Tiles', 'Decorative Bands & Mosaic Trims', 'Coordinated ceramic border tiles, listello accents, and decorative trims designed to frame wall installations, transition spaces, and add artisanal distinction to tiled surfaces.', 'https://images.unsplash.com/photo-1527352774811-1970678572b2?auto=format&fit=crop&w=1200&q=85', 'Decorative ceramic border tiles with classical listello pattern', 'published', '4', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('5', 'mosaic-tiles', 'Mosaic Tiles', 'Sheet-Mounted Wall & Accent Mosaics', 'Precision sheet-mounted ceramic and stone mosaics crafted in herringbone, hexagonal, square, and custom tesserae layouts for backsplashes, shower sanctuaries, and feature walls.', 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=85', 'Ceramic mosaic tile sheets with geometric tesserae pattern', 'published', '5', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('6', 'decorative-tiles', 'Decorative & Special-Pattern Tiles', 'Cross-Line, Geometric & Medallion Motifs', 'Distinctive patterned ceramic tiles featuring geometric cross-line structures, encaustic-inspired medallions, and traditional decorative designs for expressive interior surfaces.', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85', 'Decorative ceramic tiles featuring geometric and medallion patterns', 'published', '6', '2026-10-15 06:25:34', '2026-10-15 06:25:34');

DROP TABLE IF EXISTS "products";
CREATE TABLE products (
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

INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('1', '1', 'hand-printed-tiles', 'floreale-hand-printed-tile', 'Floreale Botanical Hand-Printed Tile', 'CB-HP-101', 'Artisanal hand-printed ceramic tile adorned with classical botanical motifs and semi-gloss glaze.', 'The Floreale collection celebrates traditional screen and hand-stamped printing techniques on high-fire ceramic biscuits. Each motif is carefully aligned, creating seamless repeats when grouped or serving as striking single accent pieces.', 'Classical Botanical Floral Motif', 'Ceramic biscuit with semi-gloss hand-applied glaze', '["150mm \u00d7 150mm \u00d7 9mm","200mm \u00d7 200mm \u00d7 10mm"]', '["Interior Feature Walls","Kitchen Backsplashes","Bathroom Vanities","Accent Borders"]', NULL, 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85', 'Floreale botanical hand-printed ceramic tile', '1', 'published', NULL, NULL, '1', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('2', '1', 'hand-printed-tiles', 'damasco-printed-accent-tile', 'Damasco Ornamental Hand-Printed Tile', 'CB-HP-102', 'Intricate damask-inspired printed tile with rich mineral pigments and subtle antique crazing.', 'Crafted with mineral oxides that develop rich tonal variations during firing. Damasco pairs seamlessly with neutral field tiles or creates an ornate continuous wall tapestry.', 'Traditional Damask & Arabesque Motif', 'Glazed Ceramic with satin antique patina', '["200mm \u00d7 200mm \u00d7 10mm"]', '["Foyer Accent Walls","Powder Room Splashes","Fireplace Surrounds"]', NULL, 'https://images.unsplash.com/photo-1527352774811-1970678572b2?auto=format&fit=crop&w=1000&q=85', 'Damasco ornamental hand-printed tile with rich mineral glazes', '1', 'published', NULL, NULL, '2', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('3', '2', 'handmade-tiles', 'artisan-square-zellige-tile', 'Artisan Square Glazed Handmade Tile', 'CB-HM-201', 'Hand-moulded square ceramic tile with authentic undulating surface and translucent depth.', 'Formed by hand using fine ceramic clay, each Artisan Square tile possesses subtle differences in surface flatness and edge contour. Fired with traditional reactive glazes that catch ambient light organically.', 'Organic Hand-Moulded Surface', 'Glossy reactive glaze with micro-crackle depth', '["100mm \u00d7 100mm \u00d7 12mm","130mm \u00d7 130mm \u00d7 12mm"]', '["Kitchen Walls","Walk-in Showers","Bar Fronts","Hospitality Accents"]', NULL, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85', 'Artisan square glazed handmade tile showing uneven organic surface', '1', 'published', NULL, NULL, '3', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('4', '2', 'handmade-tiles', 'hexagon-handcrafted-tile', 'Artisan Hexagon Handmade Tile', 'CB-HM-202', 'Hand-cut hexagonal ceramic tile with rich earthy undertones and matte satin glaze.', 'The Artisan Hexagon offers a geometric silhouette with the warmth of hand craftsmanship. Each hexagon is pressed and trimmed individually, ensuring crisp geometry without mechanical rigidity.', 'Geometric Hexagonal Artisan Form', 'Matte satin ceramic glaze over terracotta body', '["150mm side-to-side \u00d7 10mm thickness"]', '["Bathroom Walls & Low-Traffic Floors","Niche Inserts","Display Accents"]', NULL, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85', 'Artisan hexagonal handmade ceramic tile layout', '1', 'published', NULL, NULL, '4', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('5', '3', 'sandblast-tiles', 'carved-geometric-sandblast-tile', 'Geometric Relief Sandblast Tile', 'CB-SB-301', 'Textured ceramic tile with carved linear sandblast relief and slip-resistant tactile surface.', 'Subjected to controlled abrasive sandblasting, this surface reveals micro-textures that produce soft shadow gradients across the wall. Exceptional for modern architectural feature surfaces.', 'Parallel Micro-Groove Linear Sandblast', 'Matte sandblasted textured ceramic', '["300mm \u00d7 600mm \u00d7 10mm","600mm \u00d7 600mm \u00d7 10mm"]', '["Exterior Cladding Features","Entrance Foyers","Commercial Accent Walls"]', NULL, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85', 'Sandblast textured ceramic relief tile with linear carving', '1', 'published', NULL, NULL, '5', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('6', '4', 'border-tiles', 'classical-listello-border-tile', 'Classical Listello Ceramic Border Tile', 'CB-BD-401', 'Coordinated decorative ceramic border strip with relief moulding and contrast glazing.', 'Engineered as a transition and frame tile, the Classical Listello provides an elegant boundary between plain field tiles or different wall materials. Fired to ensure exact color match with our primary collection.', 'Moulded Guilloche and Ribbon Relief', 'Semi-gloss ceramic glaze with accent wash', '["75mm \u00d7 200mm \u00d7 12mm","100mm \u00d7 300mm \u00d7 12mm"]', '["Dado Rail Borders","Mirror Surrounds","Wainscot Transitions"]', NULL, 'https://images.unsplash.com/photo-1527352774811-1970678572b2?auto=format&fit=crop&w=1000&q=85', 'Classical listello ceramic border tile with relief detailing', '1', 'published', NULL, NULL, '6', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('7', '5', 'mosaic-tiles', 'herringbone-sheet-mosaic', 'Herringbone Mesh-Mounted Mosaic Tile', 'CB-MS-501', 'Precision sheet-mounted herringbone mosaic with rectified edges and matte ceramic glaze.', 'Pre-mounted on durable fiberglass mesh for straightforward installation. Ideal for wet zones, curved architectural surfaces, and delicate residential backsplashes.', 'Interlocking Herringbone Tesserae', 'Fine matte porcelain-ceramic blend', '["Sheet: 300mm \u00d7 300mm (Chip: 25mm \u00d7 75mm \u00d7 8mm)"]', '["Shower Enclosures","Kitchen Splashbacks","Columns & Curved Walls"]', NULL, 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=85', 'Mesh-mounted herringbone ceramic mosaic tile sheet', '1', 'published', NULL, NULL, '7', '2026-10-15 06:25:34', '2026-10-15 06:25:34');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('8', '6', 'decorative-tiles', 'cross-line-encaustic-tile', 'Cross-Line Geometric Decorative Tile', 'CB-DC-601', 'High-contrast cross-line patterned ceramic tile engineered for rhythmic floor and wall designs.', 'A bold graphic pattern that forms secondary diamond and star motifs when laid in multiples. The dense ceramic biscuit offers excellent durability under moderate foot traffic and daily wear.', 'Geometric Cross-Line & Diamond Interlock', 'Matte non-reflective ceramic surface', '["200mm \u00d7 200mm \u00d7 10mm"]', '["Flooring in Verandas & Cafes","Feature Accent Panels","Courtyard Walls"]', NULL, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85', 'Cross-line geometric decorative ceramic tile', '1', 'published', NULL, NULL, '8', '2026-10-15 06:25:34', '2026-10-15 06:25:34');

DROP TABLE IF EXISTS "product_images";
CREATE TABLE product_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        alt_text TEXT NOT NULL,
        caption TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    );


