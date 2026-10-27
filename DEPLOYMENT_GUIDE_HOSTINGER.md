# Ceramics & Beyond — Hostinger Shared Hosting Deployment Guide
## Domain: https://paleturquoise-jellyfish-154529.hostingersite.com/

This folder contains **100% production-ready** files and folders configured specifically for your Hostinger shared hosting account and database credentials.

---

## 📋 Configured Credentials Summary

- **Live URL**: `https://paleturquoise-jellyfish-154529.hostingersite.com/`
- **MySQL Database**: `u834013214_ajhs`
- **MySQL Username**: `u834013214_ansbjah`
- **MySQL Password**: `jshJH786#$`
- **MySQL Host**: `localhost` (Hostinger internal MySQL server)
- **MySQL Port**: `3306`

---

## 🚀 2-Step Deployment Process

### Step 1: Import Database into phpMyAdmin (1 Click)
1. Log in to your **Hostinger hPanel**.
2. Go to **Databases** -> **phpMyAdmin** -> Click **Enter phpMyAdmin** next to `u834013214_ajhs`.
3. In phpMyAdmin, click on your database `u834013214_ajhs` in the left sidebar.
4. Click the **Import** tab at the top.
5. Click **Choose File** and select:
   `IMPORT_THIS_INTO_PHPMYADMIN.sql` (found in this folder).
6. Click **Import** (or **Go**) at the bottom.
   > **Result**: All 18 tables, the 4 official furniture categories (Modular Furniture, Functional & Statement Pieces, Bespoke Furniture, Finishes & Materials Palette), 8 furniture creations, 5 homepage sections, 20 site settings, and initial admin accounts are instantly created and populated!

---

### Step 2: Upload Files to `public_html/`
You can upload either via **Hostinger File Manager** or **FTP**:

#### Option A (Fastest — 1-Click ZIP Extraction):
1. In Hostinger hPanel, open **File Manager** -> navigate to `public_html/`.
2. Upload `hostinger_public_html_package.zip`.
3. Right-click the uploaded zip file and select **Extract** -> Extract to `public_html/`.
4. Delete the `.zip` file after extraction.

#### Option B (Folder Upload):
Upload the following files and folders directly inside `public_html/`:
```
public_html/
├── .env                              <-- Pre-configured database credentials
├── .htaccess                         <-- Apache rewrite router & security headers
├── index.html                        <-- Compiled frontend application
├── assets/                           <-- Compiled CSS and JS chunks
├── api/                              <-- PHP 8.3+ REST API & Database engine
├── uploads/                          <-- Media directory (with .htaccess protection)
├── storage/                          <-- Protected storage (with .htaccess deny all)
├── robots.txt                        <-- Crawler instructions
└── IMPORT_THIS_INTO_PHPMYADMIN.sql   <-- Database import file
```

> **Note on Hidden Files**: Make sure hidden files (like `.env` and `.htaccess`) are visible in your FTP client or Hostinger File Manager so they get uploaded.

---

## 🔐 Administration Portals & Default Credentials

### 1. Client Content CMS
Manage products, categories, homepage sections, inquiries, and media:
- **URL**: `https://paleturquoise-jellyfish-154529.hostingersite.com/admin/login`
- **Email**: `client.admin@ceramicsandbeyond.com`
- **Password**: `ClientAdmin2026!Secure`

### 2. Private Developer Portal
Manage system health, SQL backups, media ZIP archives, maintenance mode, and audit logs:
- **URL**: `https://paleturquoise-jellyfish-154529.hostingersite.com/developer-portal/login`
- **Email**: `dev.portal@ceramicsandbeyond.com`
- **Password**: `DevPortal2026!Master`

> **Security Note**: Change both passwords immediately after your first login in production!

---

## 🔍 How to Verify Deployment

1. **Homepage**: Open `https://paleturquoise-jellyfish-154529.hostingersite.com/` in your browser.
2. **Furniture Lookbook & Categories**: Browse *Modular Kitchens, Wardrobes & Doors*, *Functional & Statement Pieces*, *Bespoke Furniture*, and *Finishes Palette*.
3. **Design Consultation Enquiry**: Submit an enquiry on `/contact` or `/export-enquiries` and verify it appears in `/admin/enquiries`.
4. **Sitemap**: Check `https://paleturquoise-jellyfish-154529.hostingersite.com/sitemap.xml`.
5. **Backend Acceptance Suite**: Run via SSH (optional):
   ```bash
   php -d opcache.enable_cli=0 api/test_suite.php
   ```