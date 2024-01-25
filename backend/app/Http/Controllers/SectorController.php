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

    // Constructor injection of SectorService
    public function __construct(SectorService $sectorService) {
        $this->sectorService = $sectorService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Sector::query();

        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where('name', 'ilike', "%$search%");
        }

        $sectors = $query->paginate(10);

        $formattedSectors = SectorResource::collection($sectors);

        return response()->json([
            'data' => $formattedSectors,
            'current_page' => $sectors->currentPage(),
            'last_page' => $sectors->lastPage(),
            'total' => $sectors->total(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sector $sector)
    {
        $formattedSector = new SectorResource($sector);

        return response()->json(['data' => $formattedSector]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSectorRequest $request)
    {
        $sectorResource = $this->sectorService->upsertSector($request);
        return response()->json(['message' => 'Sector created successfully', 'data' => $sectorResource]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSectorRequest $request, Sector $sector)
    {
        $sectorResource = $this->sectorService->upsertSector($request);
        return response()->json(['message' => 'Sector updated successfully', 'data' => $sectorResource]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sector $sector)
    {
        $this->sectorService->deleteSector($sector);
        return response()->json(['message' => 'Sector deleted successfully']);
    }
}
