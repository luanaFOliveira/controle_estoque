<?php

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;

beforeEach(function (){
    Artisan::call('migrate:fresh');
    Artisan::call('db:seed');
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
});

it('can create an equipment request', function () {
    // Arrange
    /* @var User $user */
    $user = User::factory()->create();
    /* @var Equipment $equipment */
    $equipment = Equipment::factory()->create();

    $data = [
        'reason' => 'Test Reason',
        'request_status_id' => 3,
        'user_id' => $user->user_id,
        'equipment_id' => $equipment->equipment_id,
    ];

    // Act
    $response = $this->postJson('/api/equipment-requests', $data);

    // Assert
    $response->assertCreated();
    expect(EquipmentRequest::where($data)->exists())->toBeTrue();
});


it('can update an equipment request', function () {
    // Arrange
    /* @var EquipmentRequest $equipmentRequest */
    $equipmentRequest = EquipmentRequest::factory()->create([
        'reason' => 'Old Reason',
    ]);

    $data = [
        'reason' => 'Updated Reason',
        'request_status_id' => 2,
        'user_id' => 2,
        'equipment_id' => 2,
    ];

    // Act
    $response = $this->putJson("/api/equipment-requests/{$equipmentRequest->equipment_request_id}", $data);

    // Assert
    $response->assertOk();
    expect(EquipmentRequest::where($data)->exists())->toBeTrue();
});


it('can delete an equipment request', function () {
    // Arrange
    /* @var EquipmentRequest $equipmentRequest */
    $equipmentRequest = EquipmentRequest::factory()->create();

    // Act
    $response = $this->deleteJson("/api/equipment-requests/{$equipmentRequest->equipment_request_id}");

    // Assert
    $response->assertOk();
    expect(EquipmentRequest::find($equipmentRequest->equipment_request_id))->toBeNull();
});

it('can retrieve a specific equipment request using the show method', function () {
    // Arrange
    /* @var EquipmentRequest $equipmentRequest */
    $equipmentRequest = EquipmentRequest::factory()->create();

    // Act
    $response = $this->getJson("/api/equipment-requests/{$equipmentRequest->equipment_request_id}");

    // Assert
    $response->assertOk();
    $response->assertJson([
        'data' => [
            'equipment_request_id' => $equipmentRequest->equipment_request_id,
            'reason' => $equipmentRequest->reason,
            'request_status_id' => $equipmentRequest->request_status_id,
            'user_id' => $equipmentRequest->user_id,
            'equipment_id' => $equipmentRequest->equipment_id,
        ]
    ]);
});


it('can retrieve a list of equipment requests', function () {
    // Arrange
    $equipmentRequests = EquipmentRequest::factory()->count(5)->create();

    // Act
    $response = $this->getJson('/api/equipment-requests');
    $paginatedResponse = $response->json();

    // Assert
    $response->assertOk();
    expect($paginatedResponse)->toBePaginated();
    foreach ($paginatedResponse['data'] as $equipmentRequest) {
        expect($equipmentRequest)->toHaveKeys([
            'equipment_request_id',
            'reason',
            'request_status_id',
            'user_id',
            'equipment_id',
        ]);
    }
});
