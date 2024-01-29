<?php

namespace App\Http\Resources;

use App\Models\Equipment;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Equipment
 */
class EquipmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'equipment_id' => $this->equipment_id,
            'name' => $this->name,
            'type' => $this->type()->pluck('name'),
            'brand' => $this->brand()->pluck('name'),
            'sector' => $this->sector()->pluck('name'),
            'is_available' => $this->is_available,
            'is_at_office' => $this->is_at_office,
        ];
    }
}