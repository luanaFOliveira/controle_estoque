<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;

beforeEach(function (){
    Artisan::call('migrate:refresh');
    Artisan::call('db:seed');
});

uses()->group('equipment');

it('should return a paginated list of equipments', function () {

    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
    $response = $this->getJson('/api/equipments');
    $response->assertOk();
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
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
    $equipment = Equipment::factory()->create();
    $equipment_id = $equipment->equipment_id;
    $response = $this->getJson("/api/equipments/{$equipment_id}");

    $response->assertJson([
        'data' => [
            'equipment_id' => $equipment->equipment_id,
            'name' => $equipment->name,
            'type' => $equipment->type()->value('name'),
            'brand' => $equipment->brand()->value('name'),
            'sector' => $equipment->sector()->value('name'),
            'is_available' => $equipment->is_available,
            'is_at_office' => $equipment->is_at_office
        ]
    ]);
});

it('can create a equipment', function () {
    $user = User::factory()->create([
        'is_admin' => true
    ]);
    $this->actingAs($user, 'sanctum');
    $data = [
        'name' => 'test name',
        'equipment_type' => 'test type',
        'equipment_brand' => 'test brand',
        'sector' =>  'test sector',
        'is_available' => true,
        'is_at_office' => true,
    ];

    $response = $this->postJson('/api/equipments', $data);
    $response->assertCreated();
    $equipmentId = $response->json('data.equipment_id');
    $equipment = Equipment::find($equipmentId);

    expect($equipment)->not()->toBeNull();
});

it('cannot create a equipment with invalid data', function () {
    $user = User::factory()->create([
        'is_admin' => true
    ]);
    $this->actingAs($user, 'sanctum');
    $data = [
        'name' => '',
    ];

    $response = $this->postJson('/api/equipments', $data);
    $response->assertStatus(422);
    $response->assertJsonValidationErrors('name');
});

it('can update a equipment', function () {
    /* @var Equipment $equipment
     * */
    $user = User::factory()->create([
        'is_admin' => true
    ]);
    $this->actingAs($user, 'sanctum');
    $equipment = Equipment::factory()->create();
    $updatedEquipment = [
        'name' => 'new test name',
        'sector' => 'new test sector',
        'equipment_type' => 'new test type',
        'equipment_brand' => 'new test brand',
        'is_available' => false,
        'is_at_office' => false,
    ];

    $equipment_id = $equipment->equipment_id;
    $response = $this->putJson("/api/equipments/{$equipment_id}", $updatedEquipment);
    $response->assertStatus(200);

    $response->assertJson([
        'data' => [
            'equipment_id' => $equipment_id,
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
    $user = User::factory()->create([
        'is_admin' => true
    ]);
    $this->actingAs($user, 'sanctum');
    $equipment = Equipment::factory()->create();
    $updatedEquipment = [
        'name' => '',
        'sector' => '',
        'equipment_type' => '',
        'equipment_brand' => '',
        'is_available' => null,
        'is_at_office' => null,
    ];

    $equipment_id = $equipment->equipment_id;
    $response = $this->putJson("/api/equipments/{$equipment_id}", $updatedEquipment);
    $response->assertStatus(422);
});

it('can delete a equipment', function () {
    /* @var Equipment $equipment
     * */
    $user = User::factory()->create([
        'is_admin' => true
    ]);
    $this->actingAs($user, 'sanctum');
    $equipment = Equipment::factory()->create();
    $this->assertDatabaseHas('equipment', ['equipment_id' => $equipment->equipment_id]);

    $equipment_id = $equipment->equipment_id;
    $response = $this->deleteJson("/api/equipments/{$equipment_id}");
    $response->assertStatus(200);

    $this->assertSoftDeleted('equipment', ['equipment_id' => $equipment->equipment_id]);
});

it('cannot access non-existent equipment', function () {
    $user = User::factory()->create([
        'is_admin' => true
    ]);
    $this->actingAs($user, 'sanctum');
    $nonExistentId = 12345;

    $response = $this->getJson("/api/equipments/{$nonExistentId}");
    $response->assertStatus(404);
});
