<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipRequestRequest;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\EquipRequestResource;
use App\Http\Resources\RequestMotiveResource;
use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\RequestMotive;
use App\Models\RequestStatus;
use App\Models\UserEquipment;
use App\Services\EquipRequestService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipRequestController extends Controller
{
    private $equipmentRequestService;

    public function __construct(EquipRequestService $equipmentRequestService)
    {
        $this->equipmentRequestService = $equipmentRequestService;
    }

    public function equipmentsAvailable(Request $request): AnonymousResourceCollection
    {
        $query = Equipment::query();
        
        $query->where('is_available', true);
        if ($request->has('sector')) {
            $sector = $request->input('sector');

            $query->where('sector_id', 'ilike', "%$sector%");
        }

        
        return EquipmentResource::collection($query->orderBy('equipment_id')->paginate(10));
    }

    public function getRequestMotives(Request $request): AnonymousResourceCollection
    {
        $query = RequestMotive::all();
        return RequestMotiveResource::collection($query);
    }

    

    public function index(Request $request): AnonymousResourceCollection
    {
        $status = $request->input('status');

        $query = EquipmentRequest::auth();

        if ($status) {
            if (is_array($status) && isset($status['$ne'])) {
                $query->whereHas('status', function ($query) {
                    $query->where('status', '<>', 'Pendente');
                });
            } else {
                $query->whereHas('status', function ($query) {
                    $query->where('status', 'Pendente');
                });
            }
        }

        return EquipRequestResource::collection($query->orderBy('request_status_id','asc')->paginate(10));
    }

    public function show(EquipmentRequest $equipmentRequest): JsonResource
    {
        return new EquipRequestResource($equipmentRequest);
    }

    public function store(StoreEquipRequestRequest $request): JsonResponse
    {
        $equipmentRequest = $this->equipmentRequestService->upsertEquipmentRequest($request);
        return response()->json(['message' => 'Equipment request created successfully', 'data' => $equipmentRequest], 201);
    }

    public function update(StoreEquipRequestRequest $request, EquipmentRequest $equipmentRequest): JsonResponse
    {
        $updatedEquipmentRequest = $this->equipmentRequestService->upsertEquipmentRequest($request, $equipmentRequest);
        return response()->json(['message' => 'Equipment request updated successfully', 'data' => $updatedEquipmentRequest]);
    }

    public function handleRequest(Request $request, $action): JsonResponse
    {
        $equipment_request_id = $request->input('equipment_request_id');
        $result = $this->equipmentRequestService->handleRequest($equipment_request_id, $action);

        return response()->json(['message' => $result['message'], 'data' => $result['data']]);
    }

    public function destroy(EquipmentRequest $equipmentRequest): JsonResponse
    {
        $this->equipmentRequestService->deleteEquipmentRequest($equipmentRequest);
        return response()->json(['message' => 'Equipment request deleted successfully']);
    }
}
