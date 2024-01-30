<?php

use App\Models\Sector;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;

beforeEach(function (){
    Artisan::call('migrate:refresh');
    Artisan::call('db:seed');
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
});

uses()->group('sector');

it('can retrieve a list of sectors', function () {
    Sector::factory()->count(5)->create();

    $response = $this->getJson('/api/sectors');
    $paginatedResponse = $response->json();

    $response->assertOk();
    expect($paginatedResponse)->toBePaginated();
    foreach ($paginatedResponse['data'] as $sector){
        expect($sector)->toHaveKeys([
            'sector_id',
            'name',
            'users',
            'equipments_count',
        ]);
    }
});

it('can retrieve a specific sector using the show method', function () {
    /* @var Sector $sector
     */

    $sector = Sector::factory()->create();

    $response = $this->getJson("/api/sectors/{$sector->sector_id}");
    $response->assertOk();
    $response->assertJson([
        'data' => [
            'sector_id' => $sector->sector_id,
            'name' => $sector->name,
            'users' => $sector->user->count(),
            'equipments_count' => $sector->equipment->count(),
        ]
    ]);
});

it('can create a sector', function () {
    $data = [
        'name' => 'Test Sector',
    ];

    $response = $this->postJson('/api/sectors', $data);

    $response->assertCreated();
    expect(Sector::where($data)->exists())->toBeTrue();
});

it('can update a sector', function () {
    /* @var Sector $sector
     */

    $sector = Sector::factory()->create([
        'name' => 'Old Sector Name',
    ]);

    $data = [
        'name' => 'Updated Sector Name',
    ];

    $response = $this->putJson("/api/sectors/{$sector->sector_id}", $data);
    $response->assertOk();
    expect(Sector::where($data)->exists())->toBeTrue();
});

it('can delete a sector', function () {
    /* @var Sector $sector
     */

    $sector = Sector::factory()->create();

    $response = $this->deleteJson("/api/sectors/{$sector->sector_id}");
    $response->assertOk();
    expect(Sector::find($sector->sector_id))->toBeNull();
});
