<?php

namespace App\Observers;

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\RequestStatus;
use App\Models\UserEquipment;

class UserEquipmentObserver
{
    /**
     * Handle the UserEquipment "created" event.
     *
     * @param  \App\Models\UserEquipment  $userEquipment
     * @return void
     */
    public function created(UserEquipment $userEquipment)
    {
        Equipment::where('equipment_id', $userEquipment->equipment_id)->update(['is_available' => false]);

        $acceptStatus = RequestStatus::where('status', 'Não Aprovado')->first();
        $deniedId = $acceptStatus->request_status_id;
        EquipmentRequest::where('equipment_id', $userEquipment->equipment_id)
            ->where('created_at', '!=', $userEquipment->created_at)
            ->whereNull('deleted_at')
            ->update(['request_status_id' => $deniedId]);
    }

    /**
     * Handle the UserEquipment "updated" event.
     *
     * @param  \App\Models\UserEquipment  $userEquipment
     * @return void
     */
    public function updated(UserEquipment $userEquipment)
    {
        if($userEquipment->returned_at != null) {
            Equipment::where('equipment_id', $userEquipment->equipment_id)->update(['is_available' => true]);
        }
    }

    /**
     * Handle the UserEquipment "deleted" event.
     *
     * @param  \App\Models\UserEquipment  $userEquipment
     * @return void
     */
    public function deleted(UserEquipment $userEquipment)
    {
        //
    }

    /**
     * Handle the UserEquipment "restored" event.
     *
     * @param  \App\Models\UserEquipment  $userEquipment
     * @return void
     */
    public function restored(UserEquipment $userEquipment)
    {
        //
    }

    /**
     * Handle the UserEquipment "force deleted" event.
     *
     * @param  \App\Models\UserEquipment  $userEquipment
     * @return void
     */
    public function forceDeleted(UserEquipment $userEquipment)
    {
        //
    }
}
