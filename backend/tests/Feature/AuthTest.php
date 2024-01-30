<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate:refresh');
    Artisan::call('db:seed');
});

uses()->group('auth');

it('can login a user', function () {
    $data = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        "password_confirmation"=> "password123",
        'is_admin' => false,
    ];

    $response = $this->postJson('/api/register', $data);

    $user = $response->json()['user'];

    $data = [
        'email' => $user['email'],
        'password' => 'password123',
    ];

    $response = $this->postJson('/api/login', $data);

    $response->assertStatus(200);
});

it('can register a new user', function () {
    $data = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        "password_confirmation"=> "password123",
        'is_admin' => false,
    ];

    $response = $this->postJson('/api/register', $data);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully registered',
            'user' => [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ],
        ]);
});

it('can logout a user', function () {
    $data = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        "password_confirmation"=> "password123",
        'is_admin' => false,
    ];

    $response = $this->postJson('/api/register', $data);

    $user = $response->json()['user'];

    $data = [
        'email' => $user['email'],
        'password' => 'password123',
    ];

    $this->postJson('/api/login', $data);

    $response = $this->postJson('/api/logout');

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully logged out',
        ]);
});
