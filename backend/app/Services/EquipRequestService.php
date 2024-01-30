<?php

namespace App\Services;

use App\Http\Requests\StoreEquipRequestRequest;
use App\Http\Resources\EquipRequestResource;
use App\Models\EquipmentRequest;
use App\Models\RequestStatus;
use Illuminate\Support\Facades\DB;

class EquipRequestService {

    public function upsertEquipmentRequest(StoreEquipRequestRequest $request, ?EquipmentRequest $equipmentRequest = null): EquipRequestResource
    {
        return DB::transaction(function () use ($request, $equipmentRequest) {
            if ($equipmentRequest === null) {
                $equipmentRequest = $this->createEquipmentRequest($request);
            } else {
                $equipmentRequest = $this->updateEquipmentRequest($request, $equipmentRequest);
            }

            return $equipmentRequest;
        });
    }

    private function createEquipmentRequest(StoreEquipRequestRequest $request): EquipRequestResource
    {
        $data = $request->validated();
        $status = RequestStatus::where('status', 'Pendente')->first();
        $statusId = $status->request_status_id;

        $data['request_status_id'] = $statusId;

        $equipmentRequest = EquipmentRequest::create($data);

        return EquipRequestResource::make($equipmentRequest);
    }
    private function updateEquipmentRequest(StoreEquipRequestRequest $request, EquipmentRequest $equipmentRequest): EquipRequestResource
    {
        $data = $request->validated();

        $equipmentRequest->update($data);

        return EquipRequestResource::make($equipmentRequest);
    }

    public function deleteEquipmentRequest(EquipmentRequest $equipmentRequest):void
    {
        $equipmentRequest->delete();
    }
}
