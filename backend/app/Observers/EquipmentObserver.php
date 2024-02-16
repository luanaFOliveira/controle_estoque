<?php

namespace App\Observers;

use App\Models\Equipment;
use App\Models\EquipmentBrand;
use App\Models\EquipmentRequest;
use App\Models\EquipmentType;
use App\Models\UserEquipment;

class EquipmentObserver
{
    /**
     * Handle the Equipment "updated" event.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return void
     */
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

    /**
     * Handle the Equipment "deleted" event.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return void
     */
    public function deleted(Equipment $equipment)
    {
        UserEquipment::where('equipment_id', $equipment->equipment_id)->delete();
        EquipmentRequest::where('equipment_id', $equipment->equipment_id)->delete();
    }

    /**
     * Handle the Equipment "restored" event.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return void
     */
    public function restored(Equipment $equipment)
    {
        //
    }

    /**
     * Handle the Equipment "force deleted" event.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return void
     */
    public function forceDeleted(Equipment $equipment)
    {
        //
    }
}
