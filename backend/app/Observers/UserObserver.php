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

        if(isset($options['sectors'])){
            $sectors = $options['sectors'];
            $sectorIds = Sector::whereIn('name', $sectors)->pluck('id')->toArray();
            $user->sector()->attach($sectorIds);
        }
    }

    /**
     * Handle the User "updated" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function updated(User $user,$options=[])
    {
        if(isset($options['equipments'])){
            $equipments = $options['equipments'];
            if (is_array($equipments) && count($equipments) > 0) {
                $equipmentsIds = Equipment::whereIn('name', $equipments)->pluck('id')->toArray();
                $user->equipment()->sync($equipmentsIds);
    
            }else{
                UserEquipment::where('user_id', $user->user_id)->delete();
            }
        }
       
        if(isset($options['sectors'])){
            $sectors = $options['sectors'];
            if (is_array($sectors) && count($sectors) > 0) {
                $sectorIds = Sector::whereIn('name', $sectors)->pluck('id')->toArray();
                $user->sector()->sync($sectorIds);

            }else{
                UserSector::where('user_id', $user->user_id)->delete();
            }
        }
        
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
