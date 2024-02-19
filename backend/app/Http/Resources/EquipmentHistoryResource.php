<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\UserEquipment;

/**
 * @mixin UserEquipment
 */
class EquipmentHistoryResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'user_equipment_id' => $this->user_equipment_id,
            'user' => User::withoutGlobalScope('sectorScope')->where('user_id', $this->user_id)->select('user_id', 'name')->first(),
            'equipment_code' => $this->equipment()->value('equipment_code'),
            'created_at' => $this->created_at,
            'returned_at' => $this->returned_at,
        ];
    }
}
