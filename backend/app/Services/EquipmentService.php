<?php

namespace App\Services;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use Illuminate\Support\Facades\DB;

class EquipmentService
{
    public function upsertEquipment(StoreEquipmentRequest $request, ?Equipment $equipment = null): Equipment
    {
        return DB::transaction(function () use ($request, $equipment) {
            if ($equipment === null) {
                $equipment = $this->createEquipment($request);
            } else {
                $equipment = $this->updateEquipment($request, $equipment);
            }

            return $equipment;
        });
    }

    private function createEquipment(StoreEquipmentRequest $request): EquipmentResource
    {
        $data = $request->validated();

        $equipment = Equipment::create($data);

        return EquipmentResource::make($equipment);
    }

    private function updateEquipment(StoreEquipmentRequest $request, Equipment $equipment): EquipmentResource
    {
        $data = $request->validated();

        $equipment->update($data);

        return EquipmentResource::make($equipment);
    }

    public function deleteEquipment(Equipment $equipment): void
    {
        $equipment->delete();
    }
}
