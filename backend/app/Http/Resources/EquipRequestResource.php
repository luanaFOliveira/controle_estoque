<?php

namespace App\Http\Resources;

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\Scopes\SectorScope;
use App\Models\Sector;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin EquipmentRequest
 */
class EquipRequestResource extends JsonResource
{
    public function toArray($request): array
    {
        $equipment = Equipment::withoutGlobalScope(SectorScope::class)->where('equipment_id', $this->equipment_id)->select('equipment.equipment_id', 'equipment.name', 'equipment.equipment_code', 'equipment.deleted_at')->first();
        return [
            'equipment_request_id' => $this->equipment_request_id,
            'observation' => $this->observation,
            'request_status' => $this->status()->value('status'),
            'request_motive' => $this->motive()->value('name'),
            'created_at' => $this->created_at,
            'deleted_at' => $this->deleted_at,
            'returned_at' => $this->returned_at,
            'user' => $this->user()->select('user.user_id', 'user.name')->first()->toArray(),
            'equipment' => $equipment,
            'sector' => Sector::find($equipment->value('equipment.sector_id'))->value('name'),
        ];
    }
}
