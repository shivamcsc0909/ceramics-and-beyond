<?php
declare(strict_types=1);

/**
 * Ceramics & Beyond - Dynamic XML Sitemap
 * Ceramic Tile Manufacturer & Exporter, New Delhi, India
 * Outputs all eligible published public URLs. Excludes all admin and developer routes.
 */

require_once __DIR__ . '/core/Database.php';
use Api\Core\Database;

header('Content-Type: application/xml; charset=utf-8');
header('X-Robots-Tag: noindex, follow');

$appUrl = $_ENV['APP_URL'] ?? getenv('APP_URL') ?: (isset($_SERVER['HTTP_HOST']) ? ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://') . $_SERVER['HTTP_HOST']) : 'https://paleturquoise-jellyfish-154529.hostingersite.com');
$baseUrl = rtrim($appUrl, '/');

$categories = Database::query("SELECT slug, updated_at FROM categories WHERE status = 'published'");
$products = Database::query("SELECT slug, updated_at FROM products WHERE status = 'published'");

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Public Pages -->
  <url>
    <loc><?= $baseUrl ?>/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc><?= $baseUrl ?>/products</loc>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc><?= $baseUrl ?>/craftsmanship</loc>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc><?= $baseUrl ?>/experience</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc><?= $baseUrl ?>/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc><?= $baseUrl ?>/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc><?= $baseUrl ?>/privacy-policy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc><?= $baseUrl ?>/terms-and-conditions</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Published Category Pages -->
<?php foreach ($categories as $cat): ?>
  <url>
    <loc><?= $baseUrl ?>/category/<?= htmlspecialchars($cat['slug']) ?></loc>
    <lastmod><?= date('Y-m-d', strtotime($cat['updated_at'] ?? 'now')) ?></lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
<?php endforeach; ?>

  <!-- Published Ceramic Tile Product Pages -->
<?php foreach ($products as $prod): ?>
  <url>
    <loc><?= $baseUrl ?>/products/<?= htmlspecialchars($prod['slug']) ?></loc>
    <lastmod><?= date('Y-m-d', strtotime($prod['updated_at'] ?? 'now')) ?></lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
<?php endforeach; ?>
</urlset>
