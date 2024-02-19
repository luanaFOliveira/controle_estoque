<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use function Pest\Laravel\{actingAs, get, post, delete,put,assertSoftDeleted};

uses()->group('user');

beforeEach(function () {
    if (!isset($this->admin)) {
        $this->admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'is_admin' => true
        ]);
    }
});

it('should return a list of users', function () {
    actingAs($this->admin,'sanctum');

    get('/api/users')
        ->assertStatus(200);
});

it('should return a user', function () {
    actingAs($this->admin,'sanctum');

    $user = User::factory()->create();

    get('/api/users/' . $user->user_id)
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'user_id' => $user->user_id,
                'name' => $user->name,
            ],
        ]);
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
                'name' => 'Test User',
                'email' => 'test@example.com',
            ],
        ]);
});

it('should update a user', function () {
    actingAs($this->admin, 'sanctum');

    $user = User::factory()->create();
    $sector1 = Sector::factory()->create();
    $equipment1 = Equipment::factory()->create();

    $user->sector()->attach($sector1->getKey());
    $user->equipment()->attach($equipment1->getKey());

    $sector2 = Sector::factory()->create();
    $equipment2 = Equipment::factory()->create();


    $updateData = [
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
        'is_admin' => $user->is_admin,
        'password' => $user->password,
        'password_confirmation' => $user->password,
        'sectors' => [$sector1->getKey(),$sector2->getKey()],
        'equipments' => [$equipment1->getKey(),$equipment2->getKey()],
    ];

    put('/api/users/' . $user->user_id, $updateData)
        ->assertStatus(200)
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

    $this->assertDatabaseHas('user_equipment', [
        'user_id' => $user->user_id,
        'equipment_id' => $equipment1->getKey(),
    ]);
    
    $this->assertDatabaseHas('user_sector', [
        'user_id' => $user->user_id,
        'sector_id' => $sector1->getKey(),
    ]);

    $this->assertDatabaseHas('user_sector', [
        'user_id' => $user->user_id,
        'sector_id' => $sector2->getKey(),
    ]);

    $this->assertDatabaseHas('user_equipment', [
        'user_id' => $user->user_id,
        'equipment_id' => $equipment2->getKey(),
    ]);
});

it('should delete a user', function () {
    actingAs($this->admin, 'sanctum');

    $user = User::factory()->create();

    delete('/api/users/' . $user->user_id)
        ->assertStatus(200)
        ->assertJson([
            'message' => 'User deleted successfully',
        ]);

    assertSoftDeleted('user', [
        'user_id' => $user->user_id,
    ]);
});

it('should detach a specific user sector relation', function () {
    actingAs($this->admin, 'sanctum');

    delete('/api/users/1' )
        ->assertStatus(200)
        ->assertJson(['message' => 'User deleted successfully']);

    assertSoftDeleted('user_sector', [
        'user_id' => 1,
    ]);
});
