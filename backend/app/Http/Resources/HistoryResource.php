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
    public function toArray($request): array
    {
        return [
            'user_equipment_id' => $this->user_equipment_id,
            'user' => User::withoutGlobalScope('sectorScope')->auth()->where('user_id', $this->user_id)->select('user_id', 'name')->first(),
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
                'equipment_code' => $equipment->equipment_code,
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
