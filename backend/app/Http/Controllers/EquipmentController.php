<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Models\EquipmentBrand;
use App\Models\EquipmentRequest;
use App\Models\EquipmentType;
use App\Services\EquipmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EquipmentController extends Controller
{
    private $equipmentService;

    public function __construct(EquipmentService $equipmentService)
    {
        $this->equipmentService = $equipmentService;
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Equipment::query();

        if ($request->has('sector')) {
            $sector = $request->input('sector');

            $query->where('sector_id', 'ilike', "%$sector%");
        }


        return EquipmentResource::collection($query->orderBy('equipment_id')->paginate(10));
    }

    public function show(Request $request): JsonResponse
    {
        $equipment = Equipment::auth()->findOrFail($request->route('equipment'));
        return response()->json(['data' => new EquipmentResource($equipment)]);
    }

    public function equipmentsDetails(): JsonResponse
    {
        $equipmentTypes = EquipmentType::all()->pluck('name');
        $equipmentBrands = EquipmentBrand::all()->pluck('name');

        return response()->json([
            'equipment_types' => $equipmentTypes,
            'equipment_brands' => $equipmentBrands,
        ]);
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

    public function returnEquipment(Equipment $equipment, EquipmentRequest $equipment_request): JsonResponse
    {
        $returnedEquipment = $this->equipmentService->returnEquipment($equipment);
        $equipment_request->delete();
        return response()->json(['message' => 'Equipment returned successfully', 'data' => $returnedEquipment]);
    }

    public function destroy(Equipment $equipment): JsonResponse
    {
        $this->equipmentService->deleteEquipment($equipment);
        return response()->json(['message' => 'Equipment deleted successfully']);
    }
}
