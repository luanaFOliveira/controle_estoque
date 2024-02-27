<?php

namespace App\Observers;

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\Sector;
use App\Models\User;
use App\Models\UserEquipment;
use App\Models\UserSector;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;

class UserObserver
{
    public function deleted(User $user)
    {
        /*
        $equipmentsId = UserEquipment::where('user_id', $user->user_id)->pluck('equipment_id');
        foreach ($equipmentsId as $equipmentId) {
            Equipment::where('equipment_id', $equipmentId)->update(['is_available' => true]);
        }
        */
        $user_id = $user->user_id;
        
        DB::table('equipment')
            ->join('user_equipment', function (JoinClause $join) use ($user_id) {
                $join->on('equipment.equipment_id', '=', 'user_equipment.equipment_id')
                     ->where('user_equipment.user_id', $user_id);
            })
            ->update([
                'equipment.is_available' => true,
                'equipment.is_at_office' => true,
            ]);

        UserEquipment::where('user_id', $user_id)->update(['returned_at' => now()]);
        UserEquipment::where('user_id', $user_id)->delete();
        EquipmentRequest::where('user_id', $user_id)->update(['returned_at' => now()]);
        EquipmentRequest::where('user_id', $user_id)->delete();
        UserSector::where('user_id', $user->user_id)->delete();

    }
}
