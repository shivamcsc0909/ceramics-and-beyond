<?php
declare(strict_types=1);

namespace Api\Core;

class Router
{
    private array $routes = [];

    public function get(string $path, callable|array $handler): void
    {
        $this->addRoute('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): void
    {
        $this->addRoute('POST', $path, $handler);
    }

    public function put(string $path, callable|array $handler): void
    {
        $this->addRoute('PUT', $path, $handler);
    }

    public function delete(string $path, callable|array $handler): void
    {
        $this->addRoute('DELETE', $path, $handler);
    }

    private function addRoute(string $method, string $path, callable|array $handler): void
    {
        // Convert route pattern {param} to regex
        $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[^/]+)', $path);
        $pattern = '#^' . $pattern . '$#';

        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'handler' => $handler,
        ];
    }

    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        if ($method === 'OPTIONS') {
            Response::json(['status' => 'ok']);
            return;
        }

        $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
        // Normalize /api/index.php/some/path or /api/some/path
        $uri = preg_replace('#^/api/index\.php#', '/api', $uri);

        // Parse input body
        $rawInput = file_get_contents('php://input');
        $body = [];
        if (!empty($rawInput)) {
            $decoded = json_decode($rawInput, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $body = $decoded;
            }
        }
        $body = array_merge($_POST, $body);

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }

            if (preg_match($route['pattern'], $uri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);

                if (is_array($route['handler'])) {
                    [$class, $action] = $route['handler'];
                    $controller = new $class();
                    $controller->$action($params, $body);
                    return;
                }

                call_user_func($route['handler'], $params, $body);
                return;
            }
        }

        Response::notFound("Endpoint not found: {$method} {$uri}");
    }
}
