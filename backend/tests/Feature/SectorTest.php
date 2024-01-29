<?php

use App\Http\Requests\StoreSectorRequest;
/* @var Sector $sector */
use App\Models\Sector;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

beforeEach(function (){
    Artisan::call('migrate:fresh');
    Artisan::call('db:seed');
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
});

it('can create a sector', function () {
    // Arrange
    $data = [
        'name' => 'Test Sector',
    ];

    // Act
    $response = $this->postJson('/api/sectors', $data);

    // Assert
    $response->assertCreated();
    expect(Sector::where($data)->exists())->toBeTrue();
});

it('can update a sector', function () {
    // Arrange
    /* @var Sector $sector */
    $sector = Sector::factory()->create([
        'name' => 'Old Sector Name',
    ]);

    $data = [
        'name' => 'Updated Sector Name',
    ];

    // Act
    $response = $this->putJson("/api/sectors/{$sector->sector_id}", $data);

    // Assert
    $response->assertOk();
    expect(Sector::where($data)->exists())->toBeTrue();
});

it('can delete a sector', function () {
    // Arrange
    /* @var Sector $sector */
    $sector = Sector::factory()->create();

    // Act
    $response = $this->deleteJson("/api/sectors/{$sector->sector_id}");

    // Assert
    $response->assertOk();
    expect(Sector::find($sector->sector_id))->toBeNull();
});

it('can retrieve a list of sectors', function () {
    // Arrange
    $sectors = Sector::factory()->count(5)->create();

    // Act
    $response = $this->getJson('/api/sectors');
    $paginatedResponse = $response->json();

    // Assert
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
    // Arrange
    /* @var Sector $sector */
    $sector = Sector::factory()->create();

    // Act
    $response = $this->getJson("/api/sectors/{$sector->sector_id}");

    // Assert
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
