<?php

namespace App\Services;

use App\Http\Requests\StoreEquipRequestRequest;
use App\Http\Resources\EquipRequestResource;
use App\Models\EquipmentRequest;
use App\Models\RequestStatus;
use App\Models\UserEquipment;
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

        $equipmentRequest = EquipmentRequest::create($data);

        return EquipRequestResource::make($equipmentRequest);
    }

    private function updateEquipmentRequest(StoreEquipRequestRequest $request, EquipmentRequest $equipmentRequest): EquipRequestResource
    {
        $data = $request->validated();

        $equipmentRequest->update($data);

        $acceptStatus = RequestStatus::where('status', 'Aprovado')->first();
        $acceptId = $acceptStatus->request_status_id;

        if($data['request_status_id'] == $acceptId)
        {
            UserEquipment::create([
                'user_id' => $data['user_id'],
                'equipment_id' => $data['equipment_id'],
            ]);
        }

        return EquipRequestResource::make($equipmentRequest);
    }

    public function deleteEquipmentRequest(EquipmentRequest $equipmentRequest):void
    {
        $equipmentRequest->delete();
    }
}
