<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipRequestRequest;
use App\Http\Resources\SectorResource;
use App\Models\EquipmentRequest;
use App\Models\Sector;
use App\Services\EquipRequestService;
use Illuminate\Http\Request;

class EquipRequestController extends Controller
{
    private $equipmentRequestService;

    public function __construct(EquipRequestService $equipmentRequestService) {
        $this->equipmentRequestService = $equipmentRequestService;
    }

    public function index(Request $request)
    {
        $query = EquipmentRequest::query();
        return SectorResource::collection($query->orderBy('request_status_id','desc')->paginate(10));
    }

    public function show(EquipmentRequest $equipmentRequest)
    {
        return response()->json(['data ' => $equipmentRequest]);
    }

    public function store(StoreEquipRequestRequest $request)
    {
        $equipmentRequest = $this->equipmentRequestService->upsertEquipmentRequest($request);
        return response()->json(['message' => 'Equipment request created successfully', 'data' => $equipmentRequest]);
    }

    public function update(StoreEquipRequestRequest $request, EquipmentRequest $equipmentRequest)
    {
        $updatedEquipmentRequest = $this->equipmentRequestService->upsertEquipmentRequest($request, $equipmentRequest);
        return response()->json(['message' => 'Equipment request created successfully', 'data' => $updatedEquipmentRequest]);
    }

    public function destroy(EquipmentRequest $equipmentRequest)
    {
        $this->equipmentRequestService->deleteEquipmentRequest($equipmentRequest);
        return response()->json(['message' => 'Equipment request deleted successfully']);
    }
}
