<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Services\EquipmentService;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    private $equipmentService;
    public function __construct(EquipmentService $equipmentService) {
        $this->equipmentService = $equipmentService;
    }

    public function index(Request $request)
    {
        $query = Equipment::query();

        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where('name', 'ilike', "%$search%");
        }
        //implementar filtros

        return EquipmentResource::collection($query->orderBy('equipment_id')->paginate(10));
    }

    public function show(Equipment $equipment)
    {
        return response()->json(['data' => new EquipmentResource($equipment)]);
    }

    public function store(StoreEquipmentRequest $request)
    {
        $equipmentResource = $this->equipmentService->upsertEquipment($request);
        return response()->json(['message' => 'Equipment created successfully', 'data' => $equipmentResource]);
    }

    public function update(StoreEquipmentRequest $request, Equipment $equipment)
    {
        $equipmentResource = $this->equipmentService->upsertEquipment($request, $equipment);
        return response()->json(['message' => 'Equipment updated successfully', 'data' => $equipmentResource]);
    }

    public function destroy(Equipment $equipment)
    {
        $this->equipmentService->deleteEquipment($equipment);
        return response()->json(['message' => 'Equipment deleted successfully']);
    }
}
