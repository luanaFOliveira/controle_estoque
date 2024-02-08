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
            'equipment' => $this->getEquipment(),
        ];
    }

    protected function getEquipment(): array
    {
        return $this->equipment->map(function ($equipment) {
            return [
                'equipment_id' => $equipment->equipment_id,
                'name' => $equipment->name,
                'is_available' => $equipment->is_available,
                'sector_id' => $equipment->sector_id,
                'sector' => $equipment->sector()->value('name'),
                'equipment_brand' => $equipment->brand()->value('name'),
                'equipment_type' => $equipment->type()->value('name'),
                'is_at_office' => $equipment->is_at_office,
            ];
        })->toArray();
    }
}
