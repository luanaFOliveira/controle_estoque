<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\UserEquipment;

/**
 * @mixin UserEquipment
 */
class HistoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'user' => User::withoutGlobalScope('sectorScope')->auth()->select('user_id', 'name')->first(),
            'equipment_code' => $this->equipment()->value('equipment_id'),
            'created_at' => $this->created_at,
            'returned_at' => $this->returned_at,
            'deleted_at' => $this->deleted_at,
            'equipment' => $this->equipment()->select('name','brand','type','is_at_office'),
        ];
    }
}
