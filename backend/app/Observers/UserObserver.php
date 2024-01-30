<?php

namespace App\Observers;

use App\Models\Equipment;
use App\Models\Sector;
use App\Models\User;
use App\Models\UserEquipment;
use App\Models\UserSector;

class UserObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function created(User $user,$options=[])
    {
        //
    }

    /**
     * Handle the User "updated" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function updated(User $user,$options=[])
    {
        //
       
    }

    /**
     * Handle the User "deleted" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function deleted(User $user)
    { 
        UserSector::where('user_id', $user->user_id)->delete();

        $equipmentsId = UserEquipment::where('user_id', $user->user_id)->pluck('equipment_id');
        foreach ($equipmentsId as $equipmentId) {
            Equipment::where('equipment_id', $equipmentId)->update(['is_available' => true]);
        }

    }

    
}
