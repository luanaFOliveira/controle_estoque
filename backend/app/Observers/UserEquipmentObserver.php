<?php

namespace App\Observers;

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\RequestStatus;
use App\Models\UserEquipment;
use Exception;

class UserEquipmentObserver
{
    public function creating(UserEquipment $userEquipment)
    {
        $exists = UserEquipment::where('equipment_id', $userEquipment->equipment_id)
                   ->whereNull('returned_at')
                   ->exists();
        if ($exists) {
            throw new Exception('Equipamento já devolvido.');
        }
    }

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

    public function updated(UserEquipment $userEquipment)
    {
        if($userEquipment->returned_at != null) {
            Equipment::where('equipment_id', $userEquipment->equipment_id)->update(['is_available' => true]);
        }
    }
}
