<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate:refresh');
    Artisan::call('db:seed');
});

uses()->group('auth');

it('can login a user', function () {
    User::factory()->create([
        'email' => 'test@test.com',
        'password' => bcrypt('password123'),
    ]);

    $data = [
        'email' => 'test@test.com',
        'password' => 'password123',
    ];

    $response = $this->postJson('/api/login', $data);

    $response->assertStatus(200);
});

it('will fail when someone try login with invalid credentials', function (){
    $data = [
        'email' => 'test',
        'password' => 'test',
    ];

    $response = $this->postJson('/api/login', $data);
    $response->assertStatus(401);
});

it('can register a new user', function () {
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $this->actingAs($admin, 'sanctum');

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

it('will fail when admin try register with invalid credentials', function (){
    $admin = User::factory()->create([
        'is_admin' => true,
    ]);
    $this->actingAs($admin, 'sanctum');

    $data = [
        'name' => '',
        'email' => '',
        'password' => '',
        "password_confirmation"=> '',
    ];

    $response = $this->postJson('/api/register', $data);
    $response->assertStatus(422);
});

it('can logout a user', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');

    $response = $this->postJson('/api/logout');

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully logged out',
        ]);
});
