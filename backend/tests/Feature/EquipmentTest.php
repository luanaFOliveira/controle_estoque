<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\User;
use function Pest\Laravel\{actingAs, delete, post, get, put};

uses()->group('equipment');

beforeEach(function () {
    if (!isset($this->admin)) {
        $this->admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'is_admin' => true
        ]);
    }
    if (!isset($this->user)) {
        $this->user = User::factory()->create([
            'email' => 'user@test.com',
            'password' => bcrypt('password'),
            'is_admin' => false
        ]);
    }
});

it('should return a paginated list of equipments', function () {
    actingAs($this->user, 'sanctum');
    $response = $this->getJson('/api/equipments')->assertOk();
    $paginatedResponse = $response->json();

    expect($paginatedResponse)->toBePaginated();
    foreach ($paginatedResponse['data'] as $equipment) {
        expect($equipment)->toHaveKeys([
            'equipment_id',
            'name',
            'type',
            'brand',
            'sector',
            'is_available',
            'is_at_office'
        ]);
    }
});

it('should show a detailed equipment', function () {
    /* @var Equipment $equipment
     * */
    actingAs($this->user, 'sanctum');
    $equipment = Equipment::factory()->create();
    $this->user->equipment()->attach($equipment);

    get("/api/equipments/{$equipment->equipment_id}")
        ->assertJson([
        'data' => [
            'equipment_id' => $equipment->equipment_id,
            'name' => $equipment->name,
            'type' => $equipment->type()->value('name'),
            'brand' => $equipment->brand()->value('name'),
            'sector' => $equipment->sector()->value('name'),
            'is_available' => false,
            'is_at_office' => $equipment->is_at_office
        ]
    ]);
});

it('can create a equipment', function () {
    actingAs($this->admin, 'sanctum');
    $data = [
        'name' => 'test name',
        'equipment_type' => 'test type',
        'equipment_brand' => 'test brand',
        'sector' =>  'test sector',
        'is_available' => true,
        'is_at_office' => true,
    ];

    $response = post('/api/equipments', $data)->assertCreated();
    $equipmentId = $response->json('data.equipment_id');
    $equipment = Equipment::find($equipmentId);

    expect($equipment)->not()->toBeNull();
});

it('cannot create a equipment with invalid data', function () {
    actingAs($this->admin, 'sanctum');
    $data = [
        'name' => '',
    ];

    $this->postJson('/api/equipments', $data)
        ->assertStatus(422)
        ->assertJsonValidationErrors('name');
});

it('can update a equipment', function () {
    /* @var Equipment $equipment
     * */

    actingAs($this->admin, 'sanctum');

    $equipment = Equipment::factory()->create();
    $updatedEquipment = [
        'name' => 'new test name',
        'sector' => 'new test sector',
        'equipment_type' => 'new test type',
        'equipment_brand' => 'new test brand',
        'is_available' => false,
        'is_at_office' => false,
    ];

    put("/api/equipments/{$equipment->equipment_id}", $updatedEquipment)
        ->assertStatus(200)
        ->assertJson([
        'data' => [
            'equipment_id' => $equipment->equipment_id,
            'name' => $updatedEquipment['name'],
            'type' => $updatedEquipment['equipment_type'],
            'brand' => $updatedEquipment['equipment_brand'],
            'sector' => $updatedEquipment['sector'],
            'is_available' => $updatedEquipment['is_available'],
            'is_at_office' => $updatedEquipment['is_at_office']
        ]
    ]);
});

it('cannot update a equipment with invalid data', function () {
    /* @var Equipment $equipment
     * */

    actingAs($this->admin, 'sanctum');

    $equipment = Equipment::factory()->create();
    $updatedEquipment = [
        'name' => '',
        'sector' => '',
        'equipment_type' => '',
        'equipment_brand' => '',
        'is_available' => null,
        'is_at_office' => null,
    ];

    $this->putJson("/api/equipments/{$equipment->equipment_id}", $updatedEquipment)
        ->assertStatus(422);
});

it('can delete a equipment', function () {
    /* @var Equipment $equipment
     * */

    actingAs($this->admin, 'sanctum');

    $equipment = Equipment::factory()->create();
    $this->assertDatabaseHas('equipment', ['equipment_id' => $equipment->equipment_id]);

    delete("/api/equipments/{$equipment->equipment_id}")->assertStatus(200);

    $this->assertSoftDeleted('equipment', ['equipment_id' => $equipment->equipment_id]);
});

it('cannot access non-existent equipment', function () {
    $this->actingAs($this->admin, 'sanctum');
    $nonExistentId = 12345;

    get("/api/equipments/{$nonExistentId}")
        ->assertStatus(404);
});
