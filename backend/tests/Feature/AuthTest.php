<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


/*
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


it('should login a user', function () {
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



it('can log out a user', function () {
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

    $response = $this->postJson('/api/logout');

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully logged out',
        ]);
});
*/