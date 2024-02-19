<?php

namespace Tests\Feature;

use App\Models\User;
use function Pest\Laravel\{actingAs, post, get};

uses()->group('auth');

beforeEach(function () {
    if (!isset($this->admin)) {
        $this->admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'is_admin' => true
        ]);
    }
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

it('can logout a user', function () {
    actingAs($this->admin, 'sanctum');

    post('/api/logout')->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully logged out',
        ]);
});


