-- Ceramics & Beyond Database Backup
-- Generated: 2026-10-15 06:21:52
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

INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('1', '1', 'hero', '1', '1', '{"eyebrow":"Architectural Surfaces \u00b7 Live Kitchen Atelier","headline":"Beyond Surfaces.","headline_accent":"Beyond Ordinary.","supporting_text":"Thoughtfully curated surfaces and materials for spaces that inspire. Witness your bespoke kitchen crafted live on our factory floor.","cta_primary_label":"Explore Our World","cta_primary_url":"\/collections","cta_secondary_label":"The Live Experience","cta_secondary_url":"\/experience","image_desktop":"https:\/\/images.unsplash.com\/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2400&q=90","image_mobile":"https:\/\/images.unsplash.com\/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85","image_alt":"Luxury architectural kitchen and stone surfaces"}', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('2', '1', 'brand_intro', '2', '1', '{"tag":"Our Editorial Philosophy","headline":"Materials That Shape Experiences.","paragraph_1":"At Ceramics & Beyond, we perceive architectural surfaces not as passive cladding, but as tactile canvases that orchestrate light, acoustic resonance, and human connection.","paragraph_2":"From continuous, monolithic porcelain slabs that erase indoor-outdoor boundaries to hand-quarried European marble and precision German-engineered cabinetry, our curation unites geological authenticity with uncompromising industrial craft.","metric_1_val":"3.2m","metric_1_lbl":"Continuous Slabs","metric_2_val":"100%","metric_2_lbl":"Live Transparency","metric_3_val":"0.1mm","metric_3_lbl":"CNC Precision","image_url":"https:\/\/images.unsplash.com\/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85","quote":"Architecture begins where the surface meets human touch."}', '2026-10-15 06:01:45', '2026-10-15 06:01:45');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('3', '1', 'experience_card', '3', '1', '{"section_tag":"CERAMICS & BEYOND \u00b7 THE EXPERIENCE","main_headline":"Ever watched your paneer tikka being made live? Now imagine the same experience with your kitchen!","supporting_copy":"At Ceramics & Beyond, you don\u2019t just choose your kitchen \u2014 you get to watch it come to life, right here on our factory floor. Complete transparency, from the first cut to the final finish.","concept_a_badge":"Brand Philosophy","concept_a_headline":"No secret ingredients. Just your dream kitchen.","concept_a_text":"Complete honesty in our raw timber cores, German hardware, and laser-guided mitring. Nothing concealed behind veneer.","concept_b_badge":"Creative Campaign","concept_b_headline":"Like teppanyaki, but for your interiors.","concept_b_text":"Dynamic, precision-driven, and mesmerizing to behold. Witness your cabinetry crafted live by master artisans.","card_label":"CERAMICS & BEYOND \u00b7 THE EXPERIENCE","card_headline":"Your kitchen, made in front of your eyes.","card_paragraph":"From the factory floor to your future favourite room, see your kitchen take shape in real time. No middlemen, no mystery \u2014 just craftsmanship you can witness for yourself.","card_punchline":"Come for the kitchen. Stay for the show.","card_cta_label":"EXPERIENCE OUR PROCESS","card_cta_url":"\/experience","workshop_image":"https:\/\/images.unsplash.com\/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=85","workshop_image_alt":"Master craftspeople and precision machinery assembling bespoke kitchen cabinetry on our factory floor"}', '2026-10-15 06:01:45', '2026-10-15 06:01:45');

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
    );

INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at") VALUES ('1', 'Acceptance Test Architect', 'architect@example.com', '+91 98765 00000', 'Bespoke Kitchen & Live Experience', 'Inquiring about 3200x1600mm continuous porcelain slabs for coastal villa.', 'new', '127.0.0.1', '2026-10-15 06:18:52', '2026-10-15 06:18:52');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at") VALUES ('2', 'Acceptance Test Architect', 'architect@example.com', '+91 98765 00000', 'Bespoke Kitchen & Live Experience', 'Inquiring about 3200x1600mm continuous porcelain slabs for coastal villa.', 'new', '127.0.0.1', '2026-10-15 06:19:35', '2026-10-15 06:19:35');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at") VALUES ('3', 'Acceptance Test Architect', 'architect@example.com', '+91 98765 00000', 'Bespoke Kitchen & Live Experience', 'Inquiring about 3200x1600mm continuous porcelain slabs for coastal villa.', 'new', '127.0.0.1', '2026-10-15 06:20:03', '2026-10-15 06:20:03');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at") VALUES ('4', 'Acceptance Test Architect', 'architect@example.com', '+91 98765 00000', 'Bespoke Kitchen & Live Experience', 'Inquiring about 3200x1600mm continuous porcelain slabs for coastal villa.', 'new', '127.0.0.1', '2026-10-15 06:21:51', '2026-10-15 06:21:51');

DROP TABLE IF EXISTS "site_settings";
CREATE TABLE site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting_key TEXT NOT NULL UNIQUE,
        setting_value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        updated_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('1', 'brand_name', 'Ceramics & Beyond', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('2', 'brand_tagline', 'Beyond Surfaces. Beyond Ordinary.', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('3', 'brand_description', 'An architectural destination for thoughtfully curated ceramics, continuous porcelain surfaces, natural marble, and a signature live kitchen manufacturing experience.', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('4', 'contact_email', 'hello@example.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('5', 'contact_phone', '+91 98765 43210', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('6', 'contact_address', 'Your Business Address, India', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('7', 'contact_hours', 'Monday – Saturday: 10:00 AM – 7:30 PM', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('8', 'social_instagram', 'https://instagram.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('9', 'social_pinterest', 'https://pinterest.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('10', 'social_linkedin', 'https://linkedin.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('11', 'meta_title', 'Ceramics & Beyond | Architectural Surfaces & Live Kitchen Manufacturing', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('12', 'meta_description', 'Curated luxury ceramic tiles, continuous porcelain slabs, marble, and bespoke German-precision kitchens crafted live on our factory floor.', 'general', '2026-10-15 06:01:45');

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

INSERT INTO "maintenance_settings" ("id", "is_active", "message", "reason", "activated_by", "activated_at", "allowed_ips_json", "updated_at") VALUES ('1', '0', 'Test Atelier Maintenance', 'Routine Maintenance', NULL, NULL, '[]', '2026-10-15 06:01:45');

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

