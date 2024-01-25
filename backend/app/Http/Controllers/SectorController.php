<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectorRequest;
use App\Http\Resources\SectorResource;
use App\Models\Equipment;
use App\Models\Sector;
use App\Services\SectorService;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    private $sectorService;

    public function __construct(SectorService $sectorService) {
        $this->sectorService = $sectorService;
    }

    public function index(Request $request)
    {
        $query = Sector::query();

        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where('name', 'ilike', "%$search%");
        }

        return SectorResource::collection($query->paginate(10));
    }

    public function show(Sector $sector)
    {
        return response()->json(['data ' => new SectorResource($sector)]);
    }


    public function store(StoreSectorRequest $request)
    {
        $sectorResource = $this->sectorService->upsertSector($request);
        return response()->json(['message' => 'Sector created successfully', 'data' => $sectorResource]);
    }

    public function update(StoreSectorRequest $request, Sector $sector)
    {
        $updatedSectorResource = $this->sectorService->upsertSector($request, $sector);
        return response()->json(['message' => 'Sector updated successfully', 'data' => $updatedSectorResource]);
    }

    public function destroy(Sector $sector)
    {
        $this->sectorService->deleteSector($sector);
        return response()->json(['message' => 'Sector deleted successfully']);
    }
}
