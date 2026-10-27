<?php
declare(strict_types=1);

namespace Api\Controllers;

use Api\Core\Auth;
use Api\Core\Response;
use Api\Core\Security;

class AuthController
{
    public function clientLogin(array $params, array $body): void
    {
        $email = trim((string)($body['email'] ?? ''));
        $password = (string)($body['password'] ?? '');

        if (empty($email) || empty($password)) {
            Response::error('Email and password are required', 422);
        }

        try {
            $user = Auth::authenticate('client', $email, $password);
            Response::success($user, 'Authenticated as Client Administrator');
        } catch (\RuntimeException $e) {
            Response::error($e->getMessage(), 401);
        }
    }

    public function clientCheck(array $params, array $body): void
    {
        $user = Auth::check(Auth::ROLE_CLIENT_ADMIN, 'client');
        if (!$user) {
            Response::unauthorized('Not authenticated as Client Administrator');
        }
        Response::success($user);
    }

    public function clientLogout(array $params, array $body): void
    {
        Auth::startSession('client');
        Auth::destroySession();
        Response::success(null, 'Logged out successfully');
    }

    public function developerLogin(array $params, array $body): void
    {
        $email = trim((string)($body['email'] ?? ''));
        $password = (string)($body['password'] ?? '');

        if (empty($email) || empty($password)) {
            Response::error('Email and password are required', 422);
        }

        try {
            $user = Auth::authenticate('developer', $email, $password);
            Response::success($user, 'Authenticated as Principal Developer');
        } catch (\RuntimeException $e) {
            Response::error($e->getMessage(), 401);
        }
    }

    public function developerCheck(array $params, array $body): void
    {
        $user = Auth::check(Auth::ROLE_DEVELOPER_ADMIN, 'developer');
        if (!$user) {
            Response::unauthorized('Not authenticated as Developer Administrator');
        }
        Response::success($user);
    }

    public function developerLogout(array $params, array $body): void
    {
        Auth::startSession('developer');
        Auth::destroySession();
        Response::success(null, 'Developer session terminated');
    }

    public function csrfToken(array $params, array $body): void
    {
        $portal = $_GET['portal'] ?? 'client';
        Auth::startSession($portal);
        $token = Security::generateCsrfToken();
        Response::success(['csrf_token' => $token]);
    }
}
