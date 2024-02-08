<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Services\EquipmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;

class EquipmentController extends Controller
{
    private $equipmentService;
    public function __construct(EquipmentService $equipmentService) {
        $this->equipmentService = $equipmentService;
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Equipment::query();

        if ($request->has('sector')) {
            $sector = $request->input('sector');

            $query->where('sector_id', 'ilike', "%$sector%");
        }


        return EquipmentResource::collection($query->orderBy('equipment_id')->paginate(5));
    }

    public function show(Request $request): JsonResponse
    {
        $equipment = Equipment::auth()->findOrFail($request->route('equipment'));
        return response()->json(['data' => new EquipmentResource($equipment)]);
    }

    public function store(StoreEquipmentRequest $request): JsonResponse
    {
        $equipmentResource = $this->equipmentService->upsertEquipment($request);
        return response()->json(['message' => 'Equipment created successfully', 'data' => $equipmentResource], 201);
    }

    public function update(StoreEquipmentRequest $request, Equipment $equipment): JsonResponse
    {
        $equipmentResource = $this->equipmentService->upsertEquipment($request, $equipment);
        return response()->json(['message' => 'Equipment updated successfully', 'data' => $equipmentResource]);
    }

    public function returnEquipment(Equipment $equipment): JsonResponse
    {
        $returnedEquipment = $this->equipmentService->returnEquipment($equipment);
        return response()->json(['message' => 'Equipment returned successfully', 'data' => $returnedEquipment]);
    }

    public function destroy(Equipment $equipment): JsonResponse
    {
        $this->equipmentService->deleteEquipment($equipment);
        return response()->json(['message' => 'Equipment deleted successfully']);
    }
}
