<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Artisan;

beforeEach(function () {
    Artisan::call('migrate:refresh');
    Artisan::call('db:seed');
});

uses()->group('user');

it('should return a list of users', function () {
    $user = User::factory()->create();
    $this->actingAs($user,'sanctum');
    $response = $this->actingAs($user)->getJson('/api/users');

    $response->assertStatus(200);
});

it('should return a user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('/api/users/' . $user->user_id);
    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
                'created_at' => $user->created_at->toJSON(),
                'updated_at' => $user->updated_at->toJSON(),
                'equipments' => $user->equipment()->pluck('name')->all(),
                'sectors' => $user->sector()->pluck('name')->all(),
            ],
        ]);

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

it('should update a user', function () {
    $user = User::factory()->create();

    $updateData = [
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
        'is_admin' => $user->is_admin,
        'password' => $user->password,
        'password_confirmation' => $user->password,
        'sectors' => [4],
        'equipments' => [1],
    ];

    $response = $this->actingAs($user)->putJson('/api/users/' . $user->user_id, $updateData);
    $response->assertStatus(200)
        ->assertJson([
            'message' => 'User updated successfully',
            'data' => [
                'user_id' => $user->user_id,
                'name' => $updateData['name'],
                'email' => $updateData['email'],
            ],
        ]);

    $this->assertDatabaseHas('user', [
        'user_id' => $user->user_id,
        'name' => $updateData['name'],
        'email' => $updateData['email'],
    ]);

    $this->assertDatabaseHas('user_sector', [
        'user_id' => $user->user_id,
        'sector_id' => 4,
    ]);
});

it('should delete a user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->deleteJson('/api/users/' . $user->user_id);

    $response->assertStatus(200)
        ->assertJson([
            'message' => 'User deleted successfully',
        ]);

    $this->assertSoftDeleted('user', [
        'user_id' => $user->user_id,
    ]);
});


it('should detach a specific user sector relation', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->deleteJson('/api/users/1' );
    $response->assertStatus(200)->assertJson(['message' => 'User deleted successfully']);

    $this->assertSoftDeleted('user_sector', [
        'user_id' => 1,
    ]);
});
