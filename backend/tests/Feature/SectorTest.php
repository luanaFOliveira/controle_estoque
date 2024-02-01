<?php

use App\Http\Resources\SectorDetailResource;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use function Pest\Laravel\{actingAs, get, post, delete,put};

beforeEach(function (){
    Artisan::call('migrate:refresh');
    Artisan::call('db:seed');
    $user = User::factory()->create([
        'is_admin' => true
    ]);
    $this->sector = Sector::factory()->create();
    $user->sector()->sync($this->sector);
    $this->actingAs($user, 'sanctum');
});

uses()->group('sector');

it('can retrieve a list of sectors', function () {
    $response = get('/api/sectors');
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

    $sector = $this->sector;

    $response = $this->get("/api/sectors/{$sector->sector_id}");
    $expectedJson = (new SectorDetailResource($sector))->response()->getData(true);

    $response->assertOk();
    $response->assertJson($expectedJson);
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
