<?php

namespace App\Observers;

use App\Models\Equipment;
use App\Models\Sector;
use App\Models\User;
use App\Models\UserEquipment;
use App\Models\UserSector;

class UserObserver
{
    public function deleted(User $user)
    {
        UserSector::where('user_id', $user->user_id)->delete();
        /*
        $equipmentsId = UserEquipment::where('user_id', $user->user_id)->pluck('equipment_id');
        foreach ($equipmentsId as $equipmentId) {
            Equipment::where('equipment_id', $equipmentId)->update(['is_available' => true]);
        }
        */

        UserEquipment::where('user_id', $user->user_id)
                    ->join('equipment', 'user_equipment.equipment_id', '=', 'equipment.equipment_id')
                    ->update(['is_available' => true]);

    }
}
