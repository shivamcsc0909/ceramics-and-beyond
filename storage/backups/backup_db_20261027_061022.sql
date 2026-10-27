-- Ceramics & Beyond Database Backup
-- Generated: 2026-10-27 06:10:22
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
INSERT INTO "users" ("id", "role_id", "email", "password_hash", "display_name", "status", "failed_logins", "lockout_until", "last_login_at", "created_at", "updated_at") VALUES ('2', '2', 'dev.portal@ceramicsandbeyond.com', '$2y$12$c7G5l5UtGiUMYYvR147J5.Nh5eIkI9jY3iNZkRxzSkdzS5Y5QCtGG', 'Principal System Architect', 'active', '0', NULL, '2026-10-15 10:48:15', '2026-10-15 06:01:45', '2026-10-15 06:01:45');

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
INSERT INTO "login_attempts" ("id", "ip_address", "portal_type", "email_attempted", "successful", "created_at") VALUES ('4', '0.0.0.0', 'developer', 'dev.portal@ceramicsandbeyond.com', '1', '2026-10-15 10:48:06');
INSERT INTO "login_attempts" ("id", "ip_address", "portal_type", "email_attempted", "successful", "created_at") VALUES ('5', '0.0.0.0', 'developer', 'dev.portal@ceramicsandbeyond.com', '1', '2026-10-15 10:48:15');

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

INSERT INTO "pages" ("id", "slug", "title", "meta_title", "meta_description", "og_image_url", "status", "updated_by", "published_at", "created_at", "updated_at") VALUES ('1', 'home', 'Home', 'Ceramics & Beyond | Thoughtfully Made Furniture · Factory & Experience Centre', 'Thoughtfully made furniture, entirely yours. Modular kitchens, bespoke wardrobes, statement vanities, and custom furniture crafted with in-house manufacturing in New Delhi.', NULL, 'published', NULL, NULL, '2026-10-15 06:01:45', '2026-10-15 06:01:45');

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

INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('54', '1', 'hero', '1', '1', '{"eyebrow":"Factory & Experience Centre \u00b7 New Delhi","headline":"We manufacture Furniture","headline_accent":"Thoughtfully Made. Entirely Yours.","supporting_text":"Custom Sofas, Wooden Furniture, Modular Kitchens, Wardrobes & Designer Tiles. Handcrafted in our New Delhi workshop for your home.","cta_primary_label":"EXPLORE WHAT WE MAKE","cta_primary_url":"\/products","cta_secondary_label":"CONTACT US","cta_secondary_url":"\/contact","image_desktop":"\/images\/sofa.jpeg","image_mobile":"\/images\/sofa.jpeg","image_alt":"Handcrafted custom sofas, wooden furniture and designer tiles by Ceramics & Beyond"}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('55', '1', 'brand_intro', '2', '1', '{"tag":"1. Our Story \u00b7 A Creative Instinct, A Passion for Making","headline":"A Creative Instinct, A Passion for Making.","paragraph_1":"I have always been drawn to the art of making things beautiful. As a NIFT graduate, design has always been a part of who I am \u2014 from the smallest details to the way an entire space comes together. Over time, that creative instinct found its way into furniture, and what began as a love for design grew into a passion for creating things that are as practical as they are beautiful. That passion became Ceramics & Beyond.","paragraph_2":"As a woman entrepreneur in a traditionally male-dominated, manufacturing-intensive industry, I wanted to build something that reflected my own beliefs: thoughtful design, practical solutions, complete customisation and a personal involvement in every detail. I believe a home should be designed around the people living in it, not the other way around. Every corner should have a purpose. Every piece should feel like it belongs. And the process of creating it should be honest, transparent and joyful.","heritage_note":"Because making a house look good is one thing. Making it feel like home? That''s our job.","metric_1_val":"NIFT","metric_1_lbl":"Design Pedigree","metric_2_val":"100%","metric_2_lbl":"In-House Factory","metric_3_val":"0","metric_3_lbl":"Middlemen \/ Markup","image_url":"\/images\/founder-story.jpeg","image_alt":"Bespoke architectural furniture craftsmanship by Ceramics & Beyond"}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('56', '1', 'craftsmanship', '3', '1', '{"section_tag":"4. Why Ceramics & Beyond? \u00b7 The Live Counter Concept","headline":"Factory & Experience Centre Under One Roof.","supporting_text":"Think of it like watching your paneer tikka being prepared fresh at a live counter \u2014 except this time, it''s your kitchen taking shape. Total transparency from raw boards to precision assembly.","feature_1_title":"Complete In-House Manufacturing","feature_1_text":"Zero-gap seamless polyurethane edge-banding, computerized sizing, and dust-free spray booths under one roof.","feature_2_title":"Unlimited Finishes & Customisation","feature_2_text":"Specialty PU paint with unlimited RAL & Pantone colour matching, natural wood veneer, duco, glass, laminates, acrylic, and rattan.","feature_3_title":"German Hardware Standard","feature_3_text":"Fitted exclusively with Blum, Hettich, and Hafele hinges, runners, and lift-up systems for silent, lifelong operation.","cta_label":"EXPERIENCE THE LIVE COUNTER","cta_url":"\/craftsmanship","image_url":"\/images\/in-house-cnc.jpeg","image_alt":"Precision manufacturing and craftsmanship on the factory floor"}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('57', '1', 'export_enquiries', '4', '1', '{"section_tag":"Custom Furniture Consultation","headline":"Want Custom Furniture for Your Home?","supporting_text":"Talk directly with our team. Whether you need a comfortable custom sofa, solid wood furniture, modular kitchen, wardrobes, or designer tiles, we make everything right here in our New Delhi workshop.","cta_label":"TALK TO OUR TEAM","cta_url":"\/contact","markets_served":"Serving homeowners, architects, and interior designers across Delhi NCR and pan-India with bespoke modular living solutions."}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');
INSERT INTO "page_sections" ("id", "page_id", "section_type", "section_order", "is_visible", "content_json", "created_at", "updated_at") VALUES ('58', '1', 'final_cta', '5', '1', '{"headline":"Making a house look good is one thing. Making it feel like home? That\u2019s our job.","supporting_text":"Simple yet seen. Practical yet personal. Made for the way you live. Explore bespoke furniture and in-house modular manufacturing tailored around you.","cta_primary_label":"EXPLORE WHAT WE MAKE","cta_primary_url":"\/products","cta_secondary_label":"TALK TO OUR TEAM","cta_secondary_url":"\/contact"}', '2026-10-26 06:50:46', '2026-10-26 06:50:46');

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

INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('18', 'modular-furniture', 'Modular Furniture', 'Kitchens, Wardrobes, Doors', 'Bespoke & Modular Living', 'Precision-engineered modular kitchens, walk-in closets, and flush architectural doors fitted exclusively with German Blum, Hettich, and Hafele hardware.', '/images/fluted-island-kitchen.jpeg', 'Modular kitchen island with seamless finishes and integrated German hardware', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '1', '2026-10-21 19:35:27', '2026-10-21 19:35:27');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('19', 'functional-statement', 'Functional & Statement Pieces', 'TV Panels, Vanities, Bars, Mandirs & Consoles', 'Bespoke & Modular Living', 'Architectural living room TV panels, waterproof PU bathroom vanities, sacred mandirs, private home bars, bookshelves, consoles, and shoe racks made for the way you live.', '/images/floating-tv-console.jpeg', 'Modern fluted TV unit console and architectural living room paneling', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '2', '2026-10-21 19:35:27', '2026-10-21 19:35:27');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('20', 'bespoke-furniture', 'Bespoke Furniture', 'Beds, Dining Tables, Coffee & Accent Pieces', 'Bespoke & Modular Living', 'Completely made-to-order beds, solid wood and veneer dining tables, sculptural centre tables, side consoles, and customised creations tailored to your exact space.', '/images/dining-hall.jpeg', 'Bespoke wooden dining table and designer chairs handcrafted with organic curves', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '3', '2026-10-21 19:35:27', '2026-10-21 19:35:27');
INSERT INTO "collections" ("id", "slug", "title", "subtitle", "category", "description", "cover_image_url", "image_alt", "characteristics_json", "finishes_json", "applications_json", "features_json", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('21', 'finishes-palette', 'Finishes & Materials Palette', 'Specialty PU Paint, Natural Veneer, Duco, Glass & Rattan', 'Bespoke & Modular Living', 'Specialty PU Paint with unlimited RAL & Pantone colour matching, rich natural wood veneers, duco lacquer, tinted glass, acrylic, raw wood, and artisanal combinations including rattan and louvers.', '/images/finishes-palette.jpeg', 'Specialty finishes swatches including PU paint and natural wood veneer', NULL, NULL, NULL, NULL, 'published', NULL, NULL, '4', '2026-10-21 19:35:27', '2026-10-21 19:35:27');

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

INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('22', 'Priya Sharma', 'priya.sharma@example.com', '+91 98111 22334', 'Modular Kitchens', 'Looking for a handleless acrylic and veneer modular kitchen with Blum hardware and integrated breakfast counter.', 'new', '127.0.0.1', '2026-10-21 19:38:54', '2026-10-21 19:38:54', 'Vasant Vihar Residence', 'India', 'Modular Kitchen Enquiry', 'Modular Furniture', 'Full Villa Scope');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('23', 'Vikram Malhotra', 'vikram@example.com', '+91 98100 44556', 'Bespoke Furniture', 'Need custom PU paint wardrobes with fluted glass doors and bespoke dining table for our GK-2 project.', 'in_review', '127.0.0.1', '2026-10-21 19:38:54', '2026-10-21 19:38:54', 'Malhotra & Associates Architects', 'India', 'Architect / Designer Collaboration', 'Bespoke Furniture', '5 Bedroom Penthouse');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('30', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-26 06:53:14', '2026-10-26 06:53:14', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('31', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-26 06:55:55', '2026-10-26 06:55:55', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('32', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-27 06:04:37', '2026-10-27 06:04:37', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');
INSERT INTO "enquiries" ("id", "full_name", "email", "phone", "project_type", "message", "status", "ip_address", "created_at", "updated_at", "company_name", "country", "enquiry_type", "product_category", "estimated_quantity") VALUES ('33', 'International Trade Importer', 'importer@example.com', '+7 495 999 8888', 'Export Enquiry', 'Requesting CIF St. Petersburg container pricing for hand-printed ceramic tiles.', 'new', '127.0.0.1', '2026-10-27 06:10:21', '2026-10-27 06:10:21', 'Vostok Ceramics Distribution', 'Russia', 'Export Enquiry', 'Hand-Printed Ceramic Tiles', '5,000 sq. meters');

DROP TABLE IF EXISTS "site_settings";
CREATE TABLE site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting_key TEXT NOT NULL UNIQUE,
        setting_value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        updated_at TEXT DEFAULT (datetime('now'))
    );

INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('1', 'brand_name', 'Ceramics & Beyond', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('2', 'brand_tagline', 'Thoughtfully Made. Entirely Yours.', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('3', 'brand_description', 'Ceramics & Beyond is a bespoke and modular furniture design and manufacturing studio founded by a NIFT graduate and woman entrepreneur. We craft modular kitchens, wardrobes, and living furniture with factory & experience centre under one roof. Simple yet seen. Practical yet personal. Made for the way you live.', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('4', 'contact_email', 'hello@example.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('5', 'contact_phone', '+91 98765 43210', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('6', 'contact_address', 'Experience Centre & Factory, New Delhi, Delhi, India', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('7', 'contact_hours', 'Monday – Saturday: 10:00 AM – 7:00 PM IST', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('8', 'social_instagram', 'https://instagram.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('9', 'social_pinterest', 'https://pinterest.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('10', 'social_linkedin', 'https://linkedin.com', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('11', 'meta_title', 'Ceramics & Beyond | Thoughtfully Made. Entirely Yours. | New Delhi', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('12', 'meta_description', 'Modular kitchens, wardrobes, and bespoke furniture crafted with factory and experience centre under one roof. Founded by a NIFT graduate.', 'general', '2026-10-15 06:01:45');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('13', 'business_category', 'Bespoke & Modular Furniture Manufacturer', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('16', 'location_city', 'New Delhi', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('17', 'location_state', 'Delhi', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('18', 'location_country', 'India', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('19', 'export_markets', 'Asia and Russia', 'general', '2026-10-15 06:25:34');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('20', 'founder_identity', 'NIFT Graduate & Woman Entrepreneur', 'general', '2026-10-20 20:17:27');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('21', 'philosophy', 'Simple yet seen. Practical yet personal. Made for the way you live.', 'general', '2026-10-20 20:17:27');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "category", "updated_at") VALUES ('22', 'live_counter_concept', 'Think of it like watching your paneer tikka being prepared fresh at a live counter — except this time, it is your kitchen taking shape.', 'general', '2026-10-20 20:17:27');

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
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('21', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_064524.sql","size":72622}', '0.0.0.0', '2026-10-15 06:45:24');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('22', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 06:45:24');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('23', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_081717.sql","size":74179}', '0.0.0.0', '2026-10-15 08:17:17');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('24', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 08:17:17');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('25', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_081853.sql","size":75736}', '0.0.0.0', '2026-10-15 08:18:53');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('26', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 08:18:53');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('27', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_082001.sql","size":77293}', '0.0.0.0', '2026-10-15 08:20:01');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('28', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 08:20:01');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('29', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_082923.sql","size":78850}', '0.0.0.0', '2026-10-15 08:29:23');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('30', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 08:29:23');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('31', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_083739.sql","size":80407}', '0.0.0.0', '2026-10-15 08:37:39');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('32', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 08:37:39');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('33', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_104326.sql","size":81964}', '0.0.0.0', '2026-10-15 10:43:26');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('34', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 10:43:26');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('35', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_104746.sql","size":83521}', '0.0.0.0', '2026-10-15 10:47:46');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('36', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 10:47:46');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('37', '2', 'developer', 'login_success', 'user', '2', '{"portal":"developer"}', '0.0.0.0', '2026-10-15 10:48:06');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('38', '2', 'developer', 'logout', 'user', '2', '[]', '0.0.0.0', '2026-10-15 10:48:06');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('39', '2', 'developer', 'login_success', 'user', '2', '{"portal":"developer"}', '0.0.0.0', '2026-10-15 10:48:15');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('40', '2', 'developer', 'logout', 'user', '2', '[]', '0.0.0.0', '2026-10-15 10:48:15');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('41', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261015_122845.sql","size":86504}', '0.0.0.0', '2026-10-15 12:28:45');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('42', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-15 12:28:45');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('43', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261020_201407.sql","size":75282}', '0.0.0.0', '2026-10-20 20:14:07');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('44', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-20 20:14:07');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('45', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261020_201728.sql","size":77526}', '0.0.0.0', '2026-10-20 20:17:28');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('46', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-20 20:17:28');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('47', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261020_203239.sql","size":79083}', '0.0.0.0', '2026-10-20 20:32:39');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('48', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-20 20:32:39');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('49', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261021_194258.sql","size":69554}', '0.0.0.0', '2026-10-21 19:42:58');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('50', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-21 19:42:58');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('51', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261021_201039.sql","size":70548}', '0.0.0.0', '2026-10-21 20:10:39');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('52', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-21 20:10:39');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('53', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261021_204002.sql","size":72032}', '0.0.0.0', '2026-10-21 20:40:02');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('54', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-21 20:40:02');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('55', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261022_061643.sql","size":73589}', '0.0.0.0', '2026-10-22 06:16:43');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('56', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-22 06:16:43');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('57', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261026_053853.sql","size":72208}', '0.0.0.0', '2026-10-26 05:38:53');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('58', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-26 05:38:53');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('59', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261026_061203.sql","size":73692}', '0.0.0.0', '2026-10-26 06:12:03');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('60', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-26 06:12:03');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('61', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261026_065314.sql","size":74098}', '0.0.0.0', '2026-10-26 06:53:15');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('62', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-26 06:53:15');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('63', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261026_065555.sql","size":75582}', '0.0.0.0', '2026-10-26 06:55:55');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('64', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-26 06:55:55');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('65', '2', 'developer', 'backup_created', 'backup', NULL, '{"type":"database","filename":"backup_db_20261027_060438.sql","size":77139}', '0.0.0.0', '2026-10-27 06:04:38');
INSERT INTO "audit_logs" ("id", "user_id", "portal_type", "action", "entity_type", "entity_id", "details_json", "ip_address", "created_at") VALUES ('66', '2', 'developer', 'run_test_suite', 'system', NULL, '{"suite":"acceptance_test"}', '0.0.0.0', '2026-10-27 06:04:38');

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

INSERT INTO "maintenance_settings" ("id", "is_active", "message", "reason", "activated_by", "activated_at", "allowed_ips_json", "updated_at") VALUES ('1', '0', 'Live', 'Lookbook Maintenance', NULL, NULL, '[]', '2026-10-26 06:50:46');

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
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('11', 'backup_db_20261015_064524.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_064524.sql', 'database', '72622', '2', 'completed', '2026-10-15 06:45:24');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('12', 'backup_db_20261015_081717.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_081717.sql', 'database', '74179', '2', 'completed', '2026-10-15 08:17:17');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('13', 'backup_db_20261015_081853.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_081853.sql', 'database', '75736', '2', 'completed', '2026-10-15 08:18:53');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('14', 'backup_db_20261015_082001.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_082001.sql', 'database', '77293', '2', 'completed', '2026-10-15 08:20:01');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('15', 'backup_db_20261015_082923.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_082923.sql', 'database', '78850', '2', 'completed', '2026-10-15 08:29:23');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('16', 'backup_db_20261015_083739.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_083739.sql', 'database', '80407', '2', 'completed', '2026-10-15 08:37:39');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('17', 'backup_db_20261015_104326.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_104326.sql', 'database', '81964', '2', 'completed', '2026-10-15 10:43:26');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('18', 'backup_db_20261015_104746.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_104746.sql', 'database', '83521', '2', 'completed', '2026-10-15 10:47:46');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('19', 'backup_db_20261015_122845.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261015_122845.sql', 'database', '86504', '2', 'completed', '2026-10-15 12:28:45');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('20', 'backup_db_20261020_201407.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261020_201407.sql', 'database', '75282', '2', 'completed', '2026-10-20 20:14:07');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('21', 'backup_db_20261020_201728.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261020_201728.sql', 'database', '77526', '2', 'completed', '2026-10-20 20:17:28');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('22', 'backup_db_20261020_203239.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261020_203239.sql', 'database', '79083', '2', 'completed', '2026-10-20 20:32:39');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('23', 'backup_db_20261021_194258.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261021_194258.sql', 'database', '69554', '2', 'completed', '2026-10-21 19:42:58');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('24', 'backup_db_20261021_201039.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261021_201039.sql', 'database', '70548', '2', 'completed', '2026-10-21 20:10:39');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('25', 'backup_db_20261021_204002.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261021_204002.sql', 'database', '72032', '2', 'completed', '2026-10-21 20:40:02');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('26', 'backup_db_20261022_061643.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261022_061643.sql', 'database', '73589', '2', 'completed', '2026-10-22 06:16:43');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('27', 'backup_db_20261026_053853.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261026_053853.sql', 'database', '72208', '2', 'completed', '2026-10-26 05:38:53');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('28', 'backup_db_20261026_061203.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261026_061203.sql', 'database', '73692', '2', 'completed', '2026-10-26 06:12:03');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('29', 'backup_db_20261026_065314.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261026_065314.sql', 'database', '74098', '2', 'completed', '2026-10-26 06:53:15');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('30', 'backup_db_20261026_065555.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261026_065555.sql', 'database', '75582', '2', 'completed', '2026-10-26 06:55:55');
INSERT INTO "backup_records" ("id", "filename", "file_path", "backup_type", "file_size", "created_by", "status", "created_at") VALUES ('31', 'backup_db_20261027_060438.sql', '/Users/coder/Downloads/downloads/useful things/coding and project/ceramics and beyond/storage/backups/backup_db_20261027_060438.sql', 'database', '77139', '2', 'completed', '2026-10-27 06:04:38');

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

INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('7', 'modular-furniture', 'Modular Furniture', 'Kitchens, Wardrobes, Doors', 'Precision-engineered modular kitchens, walk-in closets, and flush architectural doors fitted exclusively with German Blum, Hettich, and Hafele hardware.', '/images/fluted-island-kitchen.jpeg', 'Modular kitchen island with seamless finishes and integrated German hardware', 'published', '1', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('8', 'functional-statement', 'Functional & Statement Pieces', 'TV Panels, Vanities, Bars, Mandirs & Consoles', 'Architectural living room TV panels, waterproof PU bathroom vanities, sacred mandirs, private home bars, bookshelves, consoles, and shoe racks made for the way you live.', '/images/floating-tv-console.jpeg', 'Modern fluted TV unit console and architectural living room paneling', 'published', '2', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('9', 'bespoke-furniture', 'Bespoke Furniture', 'Beds, Dining Tables, Coffee & Accent Pieces', 'Completely made-to-order beds, solid wood and veneer dining tables, sculptural centre tables, side consoles, and customised creations tailored to your exact space.', '/images/dining-hall.jpeg', 'Bespoke wooden dining table and designer chairs handcrafted with organic curves', 'published', '3', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "categories" ("id", "slug", "name", "subtitle", "description", "cover_image_url", "image_alt", "status", "sort_order", "created_at", "updated_at") VALUES ('10', 'finishes-palette', 'Finishes & Materials Palette', 'Specialty PU Paint, Natural Veneer, Duco, Glass & Rattan', 'Specialty PU Paint with unlimited RAL & Pantone colour matching, rich natural wood veneers, duco lacquer, tinted glass, acrylic, raw wood, and artisanal combinations including rattan and louvers.', '/images/finishes-palette.jpeg', 'Specialty finishes swatches including PU paint and natural wood veneer', 'published', '4', '2026-10-20 20:12:01', '2026-10-20 20:12:01');

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

INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('9', '7', 'modular-furniture', 'atelier-modular-kitchen-island', 'Atelier Modular Kitchen & Island', 'CB-KIT-01', 'Precision engineered modular kitchen with concealed handle profiles, German Blum runners, and PU finish.', 'Custom island and cabinetry system featuring Blum motion technology, anti-scratch matte PU paint, quartz surfaces, and fully tailored corner solutions.', 'Contemporary Minimalist with Seamless Gola Profile', 'Specialty Matte PU Paint & Fluted Oak Veneer', '["Bespoke Custom Dimensions","Standard depth 600mm \/ Counter 860mm"]', '["Open Concept Kitchens","Island Dining","Walk-in Pantries"]', NULL, '/images/fluted-island-kitchen.jpeg', 'Atelier modular kitchen with seamless island and integrated German hardware', '1', 'published', NULL, NULL, '1', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('10', '7', 'modular-furniture', 'signature-walk-in-wardrobe', 'Signature Walk-In Wardrobe Suite', 'CB-WRD-02', 'Floor-to-ceiling modular wardrobe system with sensor LED profiles, tinted glass doors, and soft-close drawers.', 'Modular wardrobe with custom accessory trays, velvet jewelry compartments, illuminated hanging rails, and dust-proof magnetic seals.', 'Floor-to-Ceiling Architectural Closetry', 'Smoked Glass, Fluted Louvers & Warm Walnut Veneer', '["Floor to Ceiling Custom Build","Depth 650mm"]', '["Master Bedroom Suites","Walk-In Closets","Dressing Lounges"]', NULL, '/images/translucent-glass-wardrobe.jpeg', 'Floor-to-ceiling walk-in wardrobe closet suite with integrated lighting', '1', 'published', NULL, NULL, '2', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('11', '8', 'functional-statement', 'statement-tv-unit-fluted-panel', 'Floating TV Panel & Console', 'CB-TV-03', 'Architectural wall-hung media console featuring curved fluted louvers, back-lit stone accents, and concealed wire chases.', 'A sculptural living room statement piece integrating acoustic damping slats, push-to-open drawer storage, and concealed power management.', 'Curved Fluted Wall Panel with Floating Console', 'Satin Duco Lacquer & Natural Teak Flutes', '["Width 2400mm \u2013 3600mm Bespoke","Depth 400mm"]', '["Living Room Media Walls","Private Theatre Lounges","Executive Suites"]', NULL, '/images/floating-tv-console.jpeg', 'Floating modern TV unit console with fluted wood paneling', '1', 'published', NULL, NULL, '3', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('12', '8', 'functional-statement', 'bespoke-pu-bathroom-vanity', 'Fluted Floating Bathroom Vanity', 'CB-VAN-04', 'Moisture-resistant high-density PU vanity with seamless sintered stone basin and Blum tip-on soft-close drawers.', 'Engineered for high humidity environments using multi-coat polyurethane waterproofing, solid brass hardware, and integrated LED undermount glows.', 'Vertical Micro-Ribbed Floating Vanity', 'Waterproof PU Paint in Sage Mist (RAL 7032)', '["Single Basin (900mm)","Double Basin (1500mm \u2013 1800mm)"]', '["Master Bathrooms","Powder Rooms","Wellness Sanctuaries"]', NULL, '/images/luxury-bathroom-vanity.jpeg', 'Fluted bathroom vanity with seamless undermount basin', '1', 'published', NULL, NULL, '4', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('13', '8', 'functional-statement', 'contemporary-sanctuary-mandir', 'Contemporary Sanctuary Mandir', 'CB-MDR-05', 'Sacred prayer unit combining CNC-carved jali details, warm concealed ambient lighting, and storage pull-outs.', 'Designed with reverence and architectural finesse, featuring pull-out bhog trays, brass bells integration, and concealed diya storage.', 'Sacred Geometric Jali Lattice & Arch', 'Raw Teak Wood with Antique Brass & PU Inlays', '["Width 1200mm \u2013 1800mm","Height 2100mm"]', '["Dedicated Pooja Rooms","Living Room Niches","Foyer Sanctuaries"]', NULL, '/images/sanctum-mandir.jpeg', 'Contemporary sanctum prayer mandir with warm lighting and jali paneling', '1', 'published', NULL, NULL, '5', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('14', '9', 'bespoke-furniture', 'sculptural-dining-table', 'Monolithic Dining Table & Credenza', 'CB-DNG-06', 'Handcrafted solid wood and veneer dining centerpiece with organic chamfered edges and bespoke matching credenza.', 'Sculptural curved legs supporting a continuous grain bookmatched tabletop, hand-finished with silky polyurethane matte lacquer.', 'Sculptural Organic Silhouette', 'Natural American Walnut with Clear Matte Polyurethane', '["8-Seater (2400mm \u00d7 1050mm)","10-Seater (3000mm \u00d7 1100mm)"]', '["Formal Dining Rooms","Penthouse Great Rooms","Bespoke Boardrooms"]', NULL, '/images/dining-hall.jpeg', 'Bespoke wooden dining table with sculptured organic edges', '1', 'published', NULL, NULL, '6', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('15', '9', 'bespoke-furniture', 'artisan-platform-bed-suite', 'Upholstered Platform Bed & Nightstands', 'CB-BED-07', 'Tailored master bedroom suite featuring an extended acoustic headboard, integrated wireless charging, and floating side consoles.', 'Low-slung contemporary bedframe with cantilevered floating effect, curved corners, and soft bouclé fabric upholstery.', 'Extended Acoustic Panel Headboard', 'Textured Bouclé, Natural Oak & PU Matte Accents', '["King (1800mm \u00d7 2000mm)","Super King (2000mm \u00d7 2000mm)"]', '["Master Bedroom Suites","Guest Sanctuaries","Luxury Villas"]', NULL, '/images/bedroom.jpeg', 'Artisan upholstered platform bed with continuous headboard panel', '1', 'published', NULL, NULL, '7', '2026-10-20 20:12:01', '2026-10-20 20:12:01');
INSERT INTO "products" ("id", "category_id", "category_slug", "slug", "name", "product_code", "short_description", "description", "pattern_design", "material_finish", "dimensions_json", "applications_json", "technical_sheet_url", "cover_image_url", "image_alt", "is_featured", "status", "meta_title", "meta_description", "sort_order", "created_at", "updated_at") VALUES ('16', '10', 'finishes-palette', 'specialty-pu-paint-veneer-swatches', 'Specialty PU & Veneer Palette', 'CB-MAT-08', 'Unlimited RAL & Pantone colour-matched PU paints, natural veneers, duco, acrylic, and rattan panels.', 'Our complete library of curated interior finishes, allowing architects and homeowners to touch, compare, and harmonize tactile textures.', 'Curated Material & Color Swatch System', 'Matte, Satin, High-Gloss PU & Hand-Woven Rattan', '["Full Physical Swatch Kits Available on Consultation"]', '["Kitchens","Wardrobes","Wall Paneling","Bespoke Consoles"]', NULL, '/images/finishes-palette.jpeg', 'Specialty finishes swatches including PU paint and natural wood veneer', '1', 'published', NULL, NULL, '8', '2026-10-20 20:12:01', '2026-10-20 20:12:01');

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


