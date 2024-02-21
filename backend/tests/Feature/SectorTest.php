<?php

use App\Http\Resources\SectorDetailResource;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use function Pest\Laravel\{actingAs, get, post, delete,put};

beforeEach(function (){
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
    $this->sector = Sector::factory()->create();
    $this->user->sector()->sync($this->sector);
});

uses()->group('sector');

it('should return a paginated list of sectors', function () {
    actingAs($this->user, 'sanctum');
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

it('should return a list of sector names', function () {
    actingAs($this->admin, 'sanctum');
    $sectorNames = Sector::all()->pluck('name')->toArray();

    get('/api/sector-names')
        ->assertOk()
        ->assertJson($sectorNames);
});

it('should show a detailed sector', function () {
    actingAs($this->user, 'sanctum');
    /* @var Sector $sector
     */
    $sector = $this->sector;

    $response = $this->get("/api/sectors/{$sector->sector_id}");
    $expectedJson = (new SectorDetailResource($sector))->response()->getData(true);

    $response->assertOk();
    $response->assertJson($expectedJson);
});

it('can create a sector', function () {
    actingAs($this->admin, 'sanctum');
    $data = [
        'name' => 'Test Sector',
    ];

    $response = $this->postJson('/api/sectors', $data);

    $response->assertCreated();
    expect(Sector::where($data)->exists())->toBeTrue();
});

it('cannot create a sector with invalid data', function () {
    actingAs($this->admin, 'sanctum');
    $data = [
        'name' => '',
    ];

    post('/api/sectors', $data)
        ->assertRedirect();
});

it('can update a sector', function () {
    actingAs($this->admin, 'sanctum');
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

it('cannot update a sector with invalid data', function () {
    actingAs($this->admin, 'sanctum');
    /* @var Sector $sector
     */
    $sector = Sector::factory()->create([
        'name' => 'Old Sector Name',
    ]);

    $data = [
        'name' => '',
    ];

    put("/api/sectors/{$sector->sector_id}", $data)
        ->assertRedirect();
});

it('can delete a sector', function () {
    actingAs($this->admin, 'sanctum');
    /* @var Sector $sector
     */
    $sector = Sector::factory()->create();

    $response = $this->deleteJson("/api/sectors/{$sector->sector_id}");
    $response->assertOk();
    expect(Sector::find($sector->sector_id))->toBeNull();
});

it('cannot access non-existent sector', function () {
    $this->actingAs($this->admin, 'sanctum');
    $nonExistentId = 12345;

    get("/api/sectors/{$nonExistentId}")
        ->assertNotFound();
});
