<?php

namespace App\Http\Resources;

use App\Models\EquipmentRequest;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin EquipmentRequest
 */
class EquipRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'equipment_request_id' => $this->equipment_request_id,
            'observation' => $this->observation,
            'request_status' => $this->status()->value('status'),
            'request_motive' => $this->motive()->value('name'),
            'created_at' => $this->created_at,
            'user' => $this->user()->select('user.user_id', 'user.name')->first()->toArray(),
            'equipment' => $this->equipment()->select('equipment.equipment_id', 'equipment.name', 'equipment.equipment_code')->first()->toArray(),
        ];
    }


}
