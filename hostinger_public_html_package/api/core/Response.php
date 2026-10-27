<?php
declare(strict_types=1);

namespace Api\Core;

class Response
{
    public static function json(mixed $data, int $statusCode = 200, array $headers = []): void
    {
        http_response_code($statusCode);

        // Security headers
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('Referrer-Policy: strict-origin-when-cross-origin');

        // Check if request is for private admin or developer routes
        $uri = $_SERVER['REQUEST_URI'] ?? '';
        if (str_contains($uri, '/api/admin') || str_contains($uri, '/api/developer') || str_contains($uri, '/api/auth')) {
            header('X-Robots-Tag: noindex, nofollow, noarchive');
            header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
            header('Pragma: no-cache');
        }

        foreach ($headers as $name => $value) {
            header("{$name}: {$value}");
        }

        echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public static function success(mixed $data = null, string $message = 'Success', int $statusCode = 200): void
    {
        self::json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    public static function error(string $message, int $statusCode = 400, mixed $errors = null): void
    {
        self::json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors,
        ], $statusCode);
    }

    public static function unauthorized(string $message = 'Authentication required'): void
    {
        self::error($message, 401);
    }

    public static function forbidden(string $message = 'Access denied'): void
    {
        self::error($message, 403);
    }

    public static function notFound(string $message = 'Resource not found'): void
    {
        self::error($message, 404);
    }
}
