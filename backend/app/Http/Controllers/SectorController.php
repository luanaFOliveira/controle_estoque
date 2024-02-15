<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectorRequest;
use App\Http\Resources\SectorDetailResource;
use App\Http\Resources\SectorResource;
use App\Models\Sector;
use App\Models\UserSector;
use App\Services\SectorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use function Pest\Laravel\json;

class SectorController extends Controller
{
    private $sectorService;

    public function __construct(SectorService $sectorService) {
        $this->sectorService = $sectorService;
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Sector::query();

        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where('name', 'ilike', "%$search%");
        }

        return SectorResource::collection($query->orderBy('sector_id')->paginate(10));
    }

    public function indexByUser(Request $request): AnonymousResourceCollection
    {
        if($request->has('user_id')){

            $userId = $request->input('user_id');
            $sectorsId = UserSector::where('user_id',$userId)->pluck('sector_id');

            $sectors = Sector::whereIn('sector_id', $sectorsId)->orderBy('sector_id')->paginate(10);
        }else{

            $sectors = Sector::orderBy('sector_id')->paginate(10);
        }

        return SectorResource::collection($sectors);
    }

    public function sectorNames():JsonResponse
    {
        $sectorNames = Sector::all()->pluck('name');

        return response()->json($sectorNames);
    }

    public function show(Sector $sector):JsonResource
    {
        return new SectorDetailResource($sector);
    }

    public function store(StoreSectorRequest $request):JsonResponse
    {
        $sectorResource = $this->sectorService->upsertSector($request);
        return response()->json(['message' => 'Sector created successfully', 'data' => $sectorResource], 201);
    }

    public function update(StoreSectorRequest $request, Sector $sector):JsonResponse
    {
        $updatedSectorResource = $this->sectorService->upsertSector($request, $sector);
        return response()->json(['message' => 'Sector updated successfully', 'data' => $updatedSectorResource]);
    }

    public function destroy(Sector $sector):JsonResponse
    {
        if ($sector->equipment()->count() > 0) {
            $message = 'Cannot delete sector. Delete all equipments in the sector first.';
            return response()->json(['message' => $message], 400);
        }
        $this->sectorService->deleteSector($sector);
        return response()->json(['message' => 'Sector deleted successfully']);
    }
}
