<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;

beforeEach(function (){
    Artisan::call('migrate:refresh');
    Artisan::call('db:seed');
    $this->user = User::factory()->create();
    $this->actingAs($this->user, 'sanctum');

    $this->equipment = Equipment::factory()->create();
    $this->user->equipment()->attach($this->equipment->equipment_id);
});

uses()->group('history');

it('can return a paginated list detailing the history of a specified piece of equipment', function () {
    $response = $this->getJson("/api/history/equipments?equipment_id={$this->equipment->equipment_id}");

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
    $nonExistentId = 12345;

    $response = $this->getJson("/api/history/equipments/{$nonExistentId}");
    $response->assertStatus(404);
});

it('can return a paginated list detailing the history of a specified piece of user', function () {
    $response = $this->getJson("/api/history/users?user_id={$this->user->user_id}");

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
    $nonExistentId = 12345;

    $response = $this->getJson("/api/history/users/{$nonExistentId}");
    $response->assertStatus(404);
});
