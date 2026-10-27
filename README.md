# Ceramics & Beyond — Ceramic Tile Manufacturer & Exporter
## Dynamic Website, Client CMS & Private Developer Portal

A complete, production-grade, dynamic multi-page website and trade management platform for **Ceramics & Beyond** — a ceramic tile manufacturing and export business based in **New Delhi, India** (Est. 1993, heritage: *Bansal Marbles And Tiles*).

The platform represents the company as a **ceramic tile manufacturer, product supplier, and exporter**, with a primary focus on product discovery, artisanal craftsmanship, product variety, and B2B/export commercial enquiries.

Engineered specifically for **Hostinger Shared Hosting** (and compatible LAMP/LEMP stacks):
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS compiled to static assets (`dist/`). Zero continuous Node.js background processes required in production.
- **Backend**: Native modular PHP 8.3+ REST API (`api/`) with zero heavy third-party framework overhead, powered by PDO with prepared statements.
- **Database**: Hostinger MySQL / MariaDB in production (with automatic local SQLite fallback for dev/testing).
- **Client CMS** (`/admin`): Dedicated management for ceramic tile products, product categories, homepage visual editor, media library, and trade enquiries.
- **Private Developer Portal** (`/developer-portal`): Isolated, non-discoverable engineering console for system health metrics, administrator user provisioning, pure PHP database SQL backups, media ZIP archiving, and maintenance mode controls.

---

## 🌟 Key Architecture & Highlights

### 1. Dual Independent Authentication Realms
The platform strictly isolates client content administration from backend engineering controls:

| Feature | Client Administration Realm | Private Developer Portal Realm |
| :--- | :--- | :--- |
| **Login URL** | `/admin/login` | `/developer-portal/login` |
| **Dashboard** | `/admin/dashboard` | `/developer-portal/dashboard` |
| **Role Guard** | `CLIENT_ADMIN` | `DEVELOPER_ADMIN` |
| **Session Cookie** | `CB_CLIENT_SESS` (`HttpOnly`, `SameSite=Strict`) | `CB_DEV_SESS` (`HttpOnly`, `SameSite=Strict`) |
| **Default User** | `client.admin@ceramicsandbeyond.com` | `dev.portal@ceramicsandbeyond.com` |
| **Default Pass** | `ClientAdmin2026!Secure` | `DevPortal2026!Master` |
| **Scope** | Ceramic Products, Categories, Trade Enquiries, Media | System Health, Backups, Admins, Maintenance |
| **Discoverability** | In robots.txt (Disallow) | **Completely Omitted & Unindexed** |
| **Crawler Tag** | `X-Robots-Tag: noindex, nofollow` | `X-Robots-Tag: noindex, nofollow, noarchive` |

Cross-portal privilege escalation is enforced at the PHP kernel level. Attempting to log into `/developer-portal` using client admin credentials triggers an immediate HTTP 401 rejection and logs a security event in `audit_logs`.

---

### 2. The 6 Core Ceramic Tile Lines
1. **Hand-Printed Ceramic Tiles**: Multi-colour silk-screen and hand-stamped decorative motifs fired at 1150°C+.
2. **Handmade Ceramic Tiles**: Hand-pressed wet clay moulds with organic edge variations and translucent glaze pooling.
3. **Sandblast Tiles**: Precision micro-abrasive relief textures producing architectural shadow interplay.
4. **Border Tiles**: Decorative embossed ceramic trims, liner friezes, and transition relief mouldings.
5. **Mosaic Tiles**: Vitreous ceramic tesserae mesh-mounted for architectural patterns, curves, and niches.
6. **Decorative & Special-Pattern Tiles**: Moroccan damasks, Mediterranean stars, and geometric tessellations.

---

### 3. Public Multi-Page Routes (17 Canonical Routes)
1. **`/`** — 7-section manufacturer homepage (Hero, Brand Intro, 6-Category Showcase, Product Grid with Modal, Craftsmanship Section, B2B Export Callout, Final CTA).
2. **`/about`** — Ceramic manufacturing heritage, 1993 founding, Bansal Marbles And Tiles roots, New Delhi facility.
3. **`/products`** — Full ceramic catalog with live category filtering, text search, and quick B2B sample inquiry modal.
4. **`/products/:slug`** — Dedicated product detail page with verified specifications (codes, finishes, dimensions, applications, gallery, related products).
5. **`/category/:slug`** — Dynamic category showcase for the 6 core ceramic tile lines.
6. **`/craftsmanship`** — 5-stage manufacturing journey (Clay Formulation, Hand-Press Moulding, Silk-Screen Glazing, High-Temp Kiln Vitrification, Batch Calibre Sorting).
7. **`/export-enquiries`** — Comprehensive B2B commercial trade portal capturing Company Name, Country, Estimated Quantity, Category, and Specifications.
8. **`/catalogue`** — Digital catalogue preview and instant access request.
9. **`/services`** — 4 core manufacturing capabilities (OEM Custom Production, Artisanal Reliefs, Bulk Specification, Global Export Logistics).
10. **`/projects` & `/projects/:slug`** — Ceramic tile architectural case studies.
11. **`/journal` & `/journal/:slug`** — Ceramic craft editorial articles.
12. **`/contact`** — Contact details in New Delhi, India with inquiry form and development placeholder indicators.
13. **`/privacy-policy` & `/terms-and-conditions`** — Contractual guidelines tailored for tile manufacturing and export supply.
14. **`/sitemap.xml`** — Dynamic XML sitemap indexing all published public categories and products.
15. **`/robots.txt`** — Crawler instructions excluding `/admin/` and `/api/` while keeping developer portal non-discoverable.
16. **`*`** — Custom branded 404 page.

---

### 4. Client Content CMS (`/admin`)
- **Dashboard**: Real-time counter metrics, recent inquiry stream with quick status changer (`new`, `in_review`, `contacted`, `archived`), and version history feed.
- **Homepage Editor**: Visual builder to edit hero typography, background photography, CTA labels, and the signature live kitchen narrative.
- **Collections Manager**: Full CRUD, characteristics table, finishes, and application tags.
- **Case Studies Manager**: Title, category, location, brief, and specified materials list.
- **Editorial Journal Manager**: Markdown/rich-text article publishing with author attribution and reading times.
- **Media Library**: Multi-file image uploader with MIME type and dimension inspection. Executable PHP uploads are strictly blocked by Apache `.htaccess`.
- **Inquiry Queue**: Filter by status, inspect client messages, and export records to CSV.
- **Global Settings**: Update phone, email, atelier operating hours, and default SEO tags.

---

### 5. Private Developer Portal (`/developer-portal`)
- **System Health Monitor**: Live inspection of PHP version, SAPI, memory limit, max execution time, OPcache status, PDO database latency, and storage usage.
- **Admin Accounts Management**: Provision new `CLIENT_ADMIN` accounts, revoke access, and reset passwords (invalidates active sessions).
- **Pure PHP Database Backups**: One-click SQL dump generator designed specifically for shared hosting (avoids disabled `exec('mysqldump')`).
- **Media ZIP Archives**: One-click ZIP backup of the `/uploads/` directory. Protected in `storage/backups/` by `.htaccess` (`Require all denied`).
- **Maintenance Mode**: Toggle public site lock with custom visitor message, internal reason, and IP address bypass.
- **Audit Logs**: Tamper-resistant log viewer capturing action codes, actors, IP addresses, and JSON payload changes.

---

## 🚀 Hostinger Shared Hosting Deployment Guide

### Prerequisites
- Hostinger Web Hosting Plan (Single, Premium, Business, or Cloud).
- PHP version configured to **PHP 8.2 or 8.3** in hPanel (PHP Configuration -> Select PHP 8.3).
- MySQL / MariaDB database created in hPanel (Databases -> Management).

---

### Step 1: Compile the Frontend
On your local machine, run:
```bash
npm run build
```
This generates the optimized production bundle inside `dist/`:
- `dist/index.html`
- `dist/assets/` (code-split vendor chunks for optimal browser caching)

---

### Step 2: Upload Files to `public_html/`
Upload the contents to your Hostinger `public_html/` folder using Git, File Manager, or SFTP:

```
public_html/
├── .htaccess                 # Apache rewrite rules & security headers
├── .env                      # Database credentials (see Step 3)
├── index.html                # Compiled from dist/index.html
├── assets/                   # Compiled from dist/assets/
├── api/                      # Backend PHP REST API
│   ├── config/
│   ├── controllers/
│   ├── core/
│   ├── database/
│   │   └── schema_mysql.sql  # MySQL schema
│   ├── index.php             # API front controller
│   ├── sitemap.php           # Dynamic XML sitemap
│   └── test_suite.php        # Verification test suite
├── uploads/                  # Media directory
│   └── .htaccess             # Strictly denies PHP execution (php_flag engine off)
├── storage/                  # Protected backups & logs
│   ├── .htaccess             # Require all denied
│   └── backups/
│       └── .htaccess         # Require all denied
└── public/
    └── robots.txt
```

---

### Step 3: Configure Environment (`.env`)
Create or edit `.env` in `public_html/`:
```ini
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_ceramics
DB_USERNAME=u123456789_admin
DB_PASSWORD=YourStrongDatabasePassword123!
```

---

### Step 4: Import Database Schema & Seed Data
In Hostinger hPanel -> **phpMyAdmin**:
1. Select your database (`u123456789_ceramics`).
2. Go to **Import**.
3. Choose `api/database/schema_mysql.sql` and execute.
4. Run the seeder via SSH or browser (one time):
   ```bash
   php api/database/seed.php
   ```
   *(Or execute the initial seed queries included in `schema_mysql.sql`)*.

---

### Step 5: Verify Deployment
Run the automated acceptance suite:
```bash
php -d opcache.enable_cli=0 api/test_suite.php
```
Expected output:
```
==========================================================
TEST RESULTS: 30 Passed, 0 Failed
==========================================================
```

---

## 🔒 Default Access Credentials

> [!IMPORTANT]
> Change default credentials upon first production login.

### Client Content CMS
- **URL**: `https://yourdomain.com/admin/login`
- **Email**: `client.admin@ceramicsandbeyond.com`
- **Password**: `ClientAdmin2026!Secure`

### Private Developer Portal
- **URL**: `https://yourdomain.com/developer-portal/login`
- **Email**: `dev.portal@ceramicsandbeyond.com`
- **Password**: `DevPortal2026!Master`

---

## 🛡️ Security Policies Implemented

1. **Password Hashing**: `PASSWORD_BCRYPT` with cost factor 12.
2. **Session Regeneration**: Session IDs regenerated upon authentication; cookie attributes set to `HttpOnly; Secure; SameSite=Strict`.
3. **Upload Protection**: `uploads/.htaccess` completely disables PHP execution (`php_flag engine off`, `SetHandler none`), preventing webshell execution.
4. **Backup Protection**: `storage/backups/.htaccess` enforces `Require all denied`, blocking direct file downloads.
5. **Rate Limiting**: 5 failed login attempts trigger an automatic 15-minute IP lockout.
6. **Non-Discoverability**: The developer portal URL is never published, excluded from sitemaps, excluded from robots.txt, and responds with `X-Robots-Tag: noindex, nofollow, noarchive`.
7. **Compliance Check**: Zero occurrences of restricted names ("Shahab" or "Shivam"). Placeholder contact: `hello@example.com`, `+91 98765 43210`, `New Delhi, Delhi, India` (clearly flagged for client replacement).
