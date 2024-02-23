<?php

namespace App\Observers;

use App\Models\Equipment;
use App\Models\EquipmentBrand;
use App\Models\EquipmentRequest;
use App\Models\EquipmentType;
use App\Models\UserEquipment;

class EquipmentObserver
{
    public function updating(Equipment $equipment)
    {
        if ($equipment->isDirty('sector_id')) {
            $originalSectorId = $equipment->getOriginal('sector_id');
            $newSectorId = $equipment->sector_id;

            if ($originalSectorId !== $newSectorId) {
                Equipment::find($equipment->equipment_id)->update(['is_available' => true]);
                $userEquipment = UserEquipment::where('equipment_id', $equipment->equipment_id)
                    ->whereNull('returned_at')
                    ->first();
                if ($userEquipment) {
                    $userEquipment->update(['returned_at' => now()]);
                }
            }
        }
    }

    public function updated(Equipment $equipment)
    {
        $brands = EquipmentBrand::all();
        $types = EquipmentType::all();
        foreach ($brands as $brand) {
            if ($brand->equipments->isEmpty()) {
                $brand->delete();
            }
        }

        foreach ($types as $type) {
            if ($type->equipments->isEmpty()) {
                $type->delete();
            }
        }
    }
    public function deleted(Equipment $equipment)
    {
        UserEquipment::where('equipment_id', $equipment->equipment_id)->delete();
        EquipmentRequest::where('equipment_id', $equipment->equipment_id)->delete();
    }
}
