<?php

namespace App\Services;

use App\Http\Requests\StoreEquipRequestRequest;
use App\Http\Requests\StoreSectorRequest;
use App\Http\Resources\SectorResource;
use App\Models\EquipmentRequest;
use App\Models\Sector;
use Illuminate\Support\Facades\DB;

class EquipRequestService {

    public function upsertEquipmentRequest(StoreEquipRequestRequest $request, ?EquipmentRequest $equipmentRequest = null): EquipmentRequest
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

    private function createEquipmentRequest(StoreEquipRequestRequest $request): EquipmentRequest
    {
        $data = $request->validated();

        $sector = EquipmentRequest::create($data);

        return $sector;
    }
    private function updateEquipmentRequest(StoreEquipRequestRequest $request): EquipmentRequest
    {
        $data = $request->validated();

        $sector = EquipmentRequest::create($data);

        return $sector;
    }

    public function deleteEquipmentRequest(EquipmentRequest $equipmentRequest):void
    {
        $equipmentRequest->delete();
    }
}
