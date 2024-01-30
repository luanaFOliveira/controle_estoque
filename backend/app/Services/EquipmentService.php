<?php

namespace App\Services;

use App\Http\Requests\StoreEquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Models\EquipmentBrand;
use App\Models\EquipmentType;
use App\Models\Sector;
use App\Models\UserEquipment;
use Illuminate\Support\Facades\DB;

class EquipmentService
{
    public function upsertEquipment(StoreEquipmentRequest $request, ?Equipment $equipment = null): EquipmentResource
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

    private function updateEquipmentRelations(&$data)
    {
        $sectorName = $data['sector'];
        $sector = Sector::firstOrCreate(['name' => $sectorName]);
        $data['sector_id'] = $sector->sector_id;

        $brandName = $data['equipment_brand'];
        $brand = EquipmentBrand::firstOrCreate(['name' => $brandName]);
        $data['equipment_brand_id'] = $brand->equipment_brand_id;

        $typeName = $data['equipment_type'];
        $type = EquipmentType::firstOrCreate(['name' => $typeName]);
        $data['equipment_type_id'] = $type->equipment_type_id;
    }

    private function createEquipment(StoreEquipmentRequest $request): EquipmentResource
    {
        $data = $request->validated();

        $this->updateEquipmentRelations($data);

        $equipment = Equipment::create($data);

        return EquipmentResource::make($equipment);
    }

    public function returnEquipment(Equipment $equipment): EquipmentResource
    {
        $userEquipment = UserEquipment::find($equipment->equipment_id);
        $userEquipment->returned_at = now();
        $userEquipment->save();

        return EquipmentResource::make($userEquipment);
    }

    private function updateEquipment(StoreEquipmentRequest $request, Equipment $equipment): EquipmentResource
    {
        $data = $request->validated();

        $this->updateEquipmentRelations($data);

        $equipment->update($data);

        return EquipmentResource::make($equipment);
    }

    public function deleteEquipment(Equipment $equipment): void
    {
        $equipment->delete();
    }
}
