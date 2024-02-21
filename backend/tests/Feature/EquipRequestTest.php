<?php

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\User;
use App\Models\Sector;
use App\Models\UserEquipment;
use function Pest\Laravel\{actingAs, get, post, delete,put};

beforeEach(function (){
    if (!isset($this->admin)) {
        /* @var User $user */
        $this->admin = User::factory()->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'is_admin' => true
        ]);
    }
    if (!isset($this->user)) {
        /* @var User $user */
        $this->user = User::factory()->create([
            'email' => 'user@test.com',
            'password' => bcrypt('password'),
            'is_admin' => false
        ]);
    }
});

uses()->group('equipment_request');

it('can retrieve a list of equipment requests', function () {
    actingAs($this->admin, 'sanctum');

    EquipmentRequest::factory()->count(5)->create();

    $response = get('/api/equipment-requests');
    $paginatedResponse = $response->json();

    $response->assertOk();
    expect($paginatedResponse)->toBePaginated();

    foreach ($paginatedResponse['data'] as $equipmentRequest) {
        expect($equipmentRequest)->toHaveKeys([
            'equipment_request_id',
            'observation',
            'request_status',
            'request_motive',
            'user',
            'equipment',
        ]);
    }
});

it('can retrieve a list of the user equipment requests', function () {
    actingAs($this->user, 'sanctum');

    EquipmentRequest::factory()->create([
        'user_id' => $this->user->user_id,
    ]);

    $response = $this->getJson("/api/equipment-requests")
        ->assertOk();

    $paginatedResponse = $response->json();

    expect($paginatedResponse)->toBePaginated();

    foreach ($paginatedResponse['data'] as $equipmentRequest) {
        expect($equipmentRequest)->toHaveKeys([
            'equipment_request_id',
            'observation',
            'request_status',
            'request_motive',
            'user',
            'equipment',
        ]);
    }
});

it('can retrieve a list of the request motives', function () {
    actingAs($this->user, 'sanctum');

    $response = $this->getJson("/api/request-motives")
        ->assertOk();
});

it('can retrieve a specific equipment request using the show method', function () {
    /* @var EquipmentRequest $equipmentRequest */
    actingAs($this->user, 'sanctum');

    $equipmentRequest = EquipmentRequest::factory()->create();
    get("/api/equipment-requests/{$equipmentRequest->equipment_request_id}")->assertOk()->assertJson([
        'data' => [
            'equipment_request_id' => $equipmentRequest->equipment_request_id,
            'observation' => $equipmentRequest->observation,
            'request_status' => $equipmentRequest->status()->value('status'),
            'request_motive' => $equipmentRequest->motive()->value('name'),
            'user' => [
                'user_id' => $equipmentRequest->user()->value('user.user_id'),
                'name' => $equipmentRequest->user()->value('name'),
            ],
            'equipment' => [
                'equipment_id' => $equipmentRequest->equipment()->value('equipment_id'),
                'name' => $equipmentRequest->equipment()->value('name'),
                'equipment_code' => $equipmentRequest->equipment()->value('equipment_code'),
            ],
        ]
    ]);

});

it('can create an equipment request', function () {
    /* @var User $user
     * @var Equipment $equipment
     */

    actingAs($this->user, 'sanctum');
    $sector = Sector::factory()->create();
    $this->user->sector()->attach($sector);
    /* @var Equipment $equipment */
    $equipment = Equipment::factory()->create([
        'sector_id' => $sector->sector_id,
    ]);

    $data = [
        'observation' => 'Test Obs',
        'user_id' => $this->user->user_id,
        'equipment_id' => $equipment->equipment_id,
        'request_motive_id' => 1,
    ];

    $response = post('/api/equipment-requests', $data);

    $response->assertCreated();
    expect(EquipmentRequest::where($data)->exists())->toBeTrue();
});


it('can update an equipment request', function () {
    /* @var EquipmentRequest $equipmentRequest
     */
    actingAs($this->admin, 'sanctum');

    $equipmentRequest = EquipmentRequest::factory()->create([
        'observation' => 'Old Observation',
    ]);

    $data = [
        'observation' => 'Updated Observation',
        'request_status_id' => $equipmentRequest->request_status_id,
        'request_motive_id' => $equipmentRequest->request_motive_id,
        'user_id' => $this->admin->user_id,
        'equipment_id' => $equipmentRequest->equipment_id,
    ];

    put("/api/equipment-requests/{$equipmentRequest->equipment_request_id}", $data)->assertOk();

    expect(EquipmentRequest::where($data)->exists())->toBeTrue();
});

it('can delete an equipment request', function () {
    /* @var EquipmentRequest $equipmentRequest
     */
    actingAs($this->admin, 'sanctum');
    $equipmentRequest = EquipmentRequest::factory()->create();

    delete("/api/equipment-requests/{$equipmentRequest->equipment_request_id}")->assertOk();

    expect(EquipmentRequest::find($equipmentRequest->equipment_request_id))->toBeNull();
});


