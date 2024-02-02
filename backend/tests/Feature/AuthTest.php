<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use function Pest\Laravel\{actingAs, post};

uses()->group('auth');

beforeEach(function () {
    if (!isset($this->admin)) {
        $this->admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'is_admin' => true
        ]);
    }
    Artisan::call('migrate');
});

it('can login a user', function () {
    $data = [
        'email' => $this->admin->email,
        'password' => 'password',
    ];

    post('/api/login', $data)->assertStatus(200);
});

it('will fail when someone try login with invalid credentials', function (){
    $data = [
        'email' => 'test',
        'password' => 'test',
    ];

    post('/api/login', $data)->assertStatus(401);
});

it('will fail when someone try login with null fields', function (){
    $data = [
        'email' => '',
        'password' => '',
    ];

    post('/api/login', $data)->assertStatus(302);
});

it('can register a new user', function () {
    actingAs($this->admin, 'sanctum');

    $data = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        "password_confirmation"=> "password123",
        'is_admin' => false,
    ];

    post('/api/register', $data)
        ->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully registered',
            'user' => [
                'name' => $data['name'],
                'email' => $data['email'],
            ],
        ]);
});

it('will fail when admin try register with invalid credentials', function (){
    actingAs($this->admin, 'sanctum');

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
    actingAs($this->admin, 'sanctum');

    post('/api/logout')->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully logged out',
        ]);
});
