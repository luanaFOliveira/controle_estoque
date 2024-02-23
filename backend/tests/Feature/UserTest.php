<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\Sector;
use App\Models\User;
use function Pest\Laravel\{actingAs, assertSoftDeleted, delete, get, post, put};

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

it('should return a paginated list of users', function () {
    actingAs($this->admin, 'sanctum');
    $response = get('/api/users');
    $paginatedResponse = $response->json();

    $response->assertOk();
    expect($paginatedResponse)->toBePaginated();
    foreach ($paginatedResponse['data'] as $sector){
        expect($sector)->toHaveKeys([
            'user_id',
            'name',
            'email',
            'is_admin',
        ]);
    }
});

it('should show a detailed user', function () {
    /* @var User $user
     */
    actingAs($this->admin, 'sanctum');

    $user = User::factory()->create();
    $userSectors = $user->sector->map(function ($sector) {
        return [
            'sector_id' => $sector->sector_id,
            'name' => $sector->name,
        ];
    })->toArray();

    get('/api/users/' . $user->user_id)
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
                'sectors' => $userSectors,
            ],
        ]);
});

it('can register a new user', function () {
    actingAs($this->admin, 'sanctum');
    $sector = Sector::all()->first();

    $data = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        "password_confirmation" => "password123",
        'is_admin' => false,
        'sectors' => [$sector]
    ];

    post('/api/users', $data)
        ->assertStatus(200)
        ->assertJson([
            'message' => 'Successfully registered',
            'user' => [
                'name' => $data['name'],
                'email' => $data['email'],
            ],
        ]);
});

it('will fail when admin try register a user with invalid credentials', function () {
    actingAs($this->admin, 'sanctum');

    $data = [
        'name' => '',
        'email' => '',
        'password' => '',
        "password_confirmation" => '',
    ];

    post('/api/users', $data, ['Accept' => 'application/json'])
        ->assertUnprocessable();
});

it('should update a user', function () {
    /* @var User $user
     */
    actingAs($this->admin, 'sanctum');

    $user = User::factory()->create();
    $sector1 = Sector::factory()->create();

    $user->sector()->attach($sector1->getKey());

    $sector2 = Sector::factory()->create();


    $updateData = [
        'name' => 'Updated Name',
        'email' => 'updated@example.com',
        'is_admin' => $user->is_admin,
        'password' => $user->password,
        'password_confirmation' => $user->password,
        'sectors' => [$sector1->name, $sector2->name],
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

    $this->assertDatabaseHas('user_sector', [
        'user_id' => $user->user_id,
        'sector_id' => $sector1->getKey(),
    ]);

    $this->assertDatabaseHas('user_sector', [
        'user_id' => $user->user_id,
        'sector_id' => $sector2->getKey(),
    ]);
});

it('will fail when admin try update a user with invalid credentials', function () {
    actingAs($this->admin, 'sanctum');
    $user = User::factory()->create();

    $data = [
        'name' => '',
        'email' => '',
        'password' => '',
        "password_confirmation" => '',
    ];

    put('/api/users/' . $user->user_id, $data)
        ->assertRedirect();
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

it('should change password', function () {
    /* @var User $user
     */
    $user = User::factory()->create();
    actingAs($user, 'sanctum');

    $data = [
        'user_id' => $user->user_id,
        'password' => 'newPassword'
    ];

    put("api/change-password", $data)
        ->assertOk();
});

it('should detach a specific user sector relation', function () {
    actingAs($this->admin, 'sanctum');

    delete('/api/users/1')
        ->assertStatus(200)
        ->assertJson(['message' => 'User deleted successfully']);

    assertSoftDeleted('user_sector', [
        'user_id' => 1,
    ]);
});

it('cannot access non-existent user', function () {
    $this->actingAs($this->admin, 'sanctum');
    $nonExistentId = 12345;

    get("/api/users/{$nonExistentId}")
        ->assertNotFound();
});

