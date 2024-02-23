<?php

namespace App\Http\Resources;

use App\Models\EquipmentRequest;
use App\Models\Sector;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin EquipmentRequest
 */
class EquipRequestResource extends JsonResource
{
    public function toArray($request): array
    {   
        return [
            'equipment_request_id' => $this->equipment_request_id,
            'observation' => $this->observation,
            'request_status' => $this->status()->value('status'),
            'request_motive' => $this->motive()->value('name'),
            'created_at' => $this->created_at,
            'deleted_at' => $this->deleted_at,
            'user' => $this->user()->select('user.user_id', 'user.name')->first()->toArray(),
            'equipment' => $this->equipment()->withTrashed()->select('equipment.equipment_id', 'equipment.name', 'equipment.equipment_code', 'equipment.deleted_at')->first()->toArray(),
            'sector' => Sector::find($this->equipment()->withTrashed()->value('equipment.sector_id'))->value('name'),
        ];
    }
}
