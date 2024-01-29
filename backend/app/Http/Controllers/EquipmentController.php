<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Services\EquipmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EquipmentController extends Controller
{
    private $equipmentService;
    public function __construct(EquipmentService $equipmentService) {
        $this->equipmentService = $equipmentService;
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Equipment::query();

        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where('name', 'ilike', "%$search%");
        }
        //implementar filtros

        return EquipmentResource::collection($query->orderBy('equipment_id')->paginate(10));
    }

    public function show(Equipment $equipment): JsonResponse
    {
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

    public function destroy(Equipment $equipment): JsonResponse
    {
        $this->equipmentService->deleteEquipment($equipment);
        return response()->json(['message' => 'Equipment deleted successfully']);
    }
}
