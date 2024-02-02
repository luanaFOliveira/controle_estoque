<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\User;
use function Pest\Laravel\{actingAs, delete, post, get, put};

beforeEach(function (){
    if (!isset($this->userTest)) {
        $this->userTest = User::factory()->create([
            'email' => 'user@test.com',
            'password' => bcrypt('password'),
            'is_admin' => false
        ]);
    }
    if (!isset($this->equipment)) {
    $this->equipment = Equipment::factory()->create();
    $this->userTest->equipment()->attach($this->equipment->equipment_id);
    }
});

uses()->group('history');

it('can return a paginated list detailing the history of a specified piece of equipment', function () {
    $admin = User::factory()->create([
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'is_admin' => true
    ]);
    actingAs($admin, 'sanctum');

    $response = $this->getJson("/api/history/equipments?equipment_id={$this->equipment->equipment_id}")->assertOk();

    $paginatedResponse = $response->json();
    expect($paginatedResponse)->toBePaginated();

    foreach ($paginatedResponse['data'] as $equipment) {
        expect($equipment)->toHaveKeys([
            'user',
            'user.user_id',
            'user.name',
            'equipment_code',
            'created_at',
            'returned_at',
            'deleted_at'
        ]);
    }
});

it('cannot access non-existent equipment history', function () {
    actingAs($this->userTest, 'sanctum');
    $nonExistentId = 12345;

    get("/api/history/equipments/{$nonExistentId}")
        ->assertStatus(404);
});

it('can return a paginated list detailing the history of a specified piece of user', function () {
    actingAs($this->userTest, 'sanctum');
    $response = $this->getJson("/api/history/users?user_id={$this->userTest->user_id}")->assertOk();

    $paginatedResponse = $response->json();
    expect($paginatedResponse)->toBePaginated();

    foreach ($paginatedResponse['data'] as $equipment) {
        expect($equipment)->toHaveKeys([
            'user',
            'user.user_id',
            'user.name',
            'equipment_code',
            'created_at',
            'returned_at',
            'deleted_at'
        ]);
    }
});

it('cannot access non-existent user history', function () {
    actingAs($this->userTest, 'sanctum');
    $nonExistentId = 12345;

    get("/api/history/users/{$nonExistentId}")
        ->assertStatus(404);
});
