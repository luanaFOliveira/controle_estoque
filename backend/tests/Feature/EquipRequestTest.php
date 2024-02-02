<?php

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\User;
use App\Models\Sector;
use Illuminate\Support\Facades\Artisan;
use function Pest\Laravel\{actingAs, get, post, delete,put,assertSoftDeleted};

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
            'reason',
            'request_status_id',
            'user_id',
            'equipment_id',
        ]);
    }
});


it('can retrieve a list of the users equipment requests', function () {
    actingAs($this->user, 'sanctum');

    EquipmentRequest::factory()->count(4)->create();

    $response = get("/api/equipment-requests/users/{$this->user->user_id}");
    $paginatedResponse = $response->json();

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

it('can retrieve a specific equipment request using the show method', function () {
    /* @var EquipmentRequest $equipmentRequest */
    actingAs($this->user, 'sanctum');
    $equipmentRequest = EquipmentRequest::factory()->create();

    get("/api/equipment-requests/{$equipmentRequest->equipment_request_id}")->assertOk()->assertJson([
        'data' => [
            'equipment_request_id' => $equipmentRequest->equipment_request_id,
            'reason' => $equipmentRequest->reason,
            'request_status_id' => $equipmentRequest->request_status_id,
            'user_id' => $equipmentRequest->user_id,
            'equipment_id' => $equipmentRequest->equipment_id,
        ]
    ]);

});

it('can create an equipment request', function () {

    actingAs($this->user, 'sanctum');
    $sector = Sector::factory()->create();
    $this->user->sector()->attach($sector);
    /* @var Equipment $equipment */
    $equipment = Equipment::factory()->create([
        'sector_id' => $sector->sector_id,
    ]);
    $data = [
        'reason' => 'Test Reason',
        'user_id' => $this->user->user_id,
        'equipment_id' => $equipment->equipment_id,
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
        'reason' => 'Old Reason',
    ]);

    $data = [
        'reason' => 'Updated Reason',
        'request_status_id' => $equipmentRequest->request_status_id,
        'user_id' => $this->admin->user_id,
        'equipment_id' => $equipmentRequest->equipment_id,
    ];

    put("/api/equipment-requests/{$equipmentRequest->equipment_request_id}", $data)->assertOk();

    expect(EquipmentRequest::where($data)->exists())->toBeTrue();
});

it('can delete an equipment request', function () {
    /* @var EquipmentRequest $equipmentRequest
     */
    $user = User::factory()->create([
        'is_admin' => true,
    ]);
    actingAs($this->admin, 'sanctum');
    $equipmentRequest = EquipmentRequest::factory()->create();

    delete("/api/equipment-requests/{$equipmentRequest->equipment_request_id}")->assertOk();



    expect(EquipmentRequest::find($equipmentRequest->equipment_request_id))->toBeNull();
});

