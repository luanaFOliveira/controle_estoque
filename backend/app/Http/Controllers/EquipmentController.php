<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Models\EquipmentBrand;
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

        if ($request->has('sector') && $request->input('sector') !== '') {
            $sector = $request->input('sector');
            $query->where('sector_id', 'ilike', "%$sector%");
        }

        if ($request->has('availability') && $request->input('availability') !== '') {
            $availability = $request->input('availability');
            if ($availability !== 'all') {
                $query->where('is_available', $availability);
            }
        }

        if ($request->has('equipment_code') && $request->input('equipment_code') !== 'none') {
            $equipment_code = $request->input('equipment_code');
            $query->where('equipment_code', 'ilike', "%$equipment_code%");
        }

        if ($request->has('search') && $request->input('search') !== 'none') {
            $search = $request->input('search');
        
            $query->where(function ($query) use ($search) {
                $query->where('equipment_code', 'ilike', "%$search%");
                $query->orWhere('name', 'ilike', "%$search%");
            });
        }
        
        if ($request->has('equipment_brand') && $request->input('equipment_brand') !== 'all') {
            $equipment_brand = $request->input('equipment_brand');
            $query->whereHas('brand', function ($query) use ($equipment_brand) {
                $query->where('name', 'ilike',"%$equipment_brand%");
            });
        }

        if ($request->has('equipment_type') && $request->input('equipment_type') !== 'all') {
            $equipment_type = $request->input('equipment_type');
            $query->whereHas('type', function ($query) use ($equipment_type) {
                $query->where('name', 'ilike', "%$equipment_type%");
            });
        }

        return EquipmentResource::collection($query->orderBy('equipment_id')->paginate(10));
    }


    public function show(Equipment $equipment): JsonResponse
    {
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

    public function returnEquipment(Equipment $equipment): JsonResponse
    {
        $returnedEquipment = $this->equipmentService->returnEquipment($equipment);
        return response()->json(['message' => 'Equipment returned successfully', 'data' => $returnedEquipment]);
    }

    public function changeEquipmentLocation(Request $request, $action): JsonResponse
    {
        $equipment_id = $request->input('equipment_id');
        $response = $this->equipmentService->changeEquipmentLocation($equipment_id, $action);
        return response()->json(['message' => $response['message'], 'data' => $response['data']]);
    }

    public function destroy(Equipment $equipment): JsonResponse
    {
        $this->equipmentService->deleteEquipment($equipment);
        return response()->json(['message' => 'Equipment deleted successfully']);
    }
}
