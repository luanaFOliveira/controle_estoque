<?php

namespace App\Http\Resources;

use App\Models\Equipment;
use App\Models\User;
use App\Models\UserEquipment;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Equipment
 * @property mixed $userEquipment
 */
class EquipmentResource extends JsonResource
{
    public function toArray($request): array
    {
        $userId = UserEquipment::where('equipment_id', $this->equipment_id)->whereNull('returned_at')->value('user_id');
        if ($userId === null) {
            $userName = null;
        } else {
            $userName = User::where('user_id', $userId)->select('name', 'user_id')->first()->toArray();
        }

        return [
            'equipment_id' => $this->equipment_id,
            'equipment_code' => $this->equipment_code,
            'user' => $userName,
            'name' => $this->name,
            'type' => $this->type()->value('name'),
            'brand' => $this->brand()->value('name'),
            'sector' => $this->sector()->value('name'),
            'is_available' => $this->is_available,
            'is_at_office' => $this->is_at_office,
            'returned_at' => $this->returned_at,
        ];
    }
}
