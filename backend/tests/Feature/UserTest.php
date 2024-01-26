<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

beforeEach(function () {
    $this->RefreshDatabase();
    $this->seed();
});

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
*/


it('should return a list of users', function () {
    $response = $this->getJson('/api/users');

    $response->assertStatus(200);
});




it('should return a user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson('/api/users/' . $user->user_id);
    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $user->user_id,
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