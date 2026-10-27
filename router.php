<?php
declare(strict_types=1);

/**
 * Local development server router for PHP CLI built-in web server:
 * php -S 127.0.0.1:8000 router.php
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// 1. Dynamic sitemap
if ($uri === '/sitemap.xml') {
    require __DIR__ . '/api/sitemap.php';
    exit;
}

// 2. API requests
if (str_starts_with($uri, '/api/')) {
    require __DIR__ . '/api/index.php';
    exit;
}

// 3. Static uploads
if (str_starts_with($uri, '/uploads/')) {
    $filePath = __DIR__ . $uri;
    if (file_exists($filePath)) {
        $mime = mime_content_type($filePath);
        header('Content-Type: ' . $mime);
        readfile($filePath);
        exit;
    }
}

// 4. Dist assets
if (file_exists(__DIR__ . '/dist' . $uri) && is_file(__DIR__ . '/dist' . $uri)) {
    return false; // Serve standard static file from built-in web server
}

// 5. Existing local files
if (file_exists(__DIR__ . $uri) && is_file(__DIR__ . $uri)) {
    return false;
}

// 6. SPA fallback
if (file_exists(__DIR__ . '/dist/index.html')) {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/dist/index.html');
    exit;
}

return false;
