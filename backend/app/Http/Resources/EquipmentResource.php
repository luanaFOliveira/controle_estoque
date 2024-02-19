<?php

namespace App\Http\Resources;

use App\Models\Equipment;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Equipment
 */
class EquipmentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'equipment_id' => $this->equipment_id,
            'equipment_code' => $this->equipment_code,
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
