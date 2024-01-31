<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
/**
 * @mixin \App\Models\User
 */
class UserDetailedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request)
    {
        return [
            'user_id' => $this->user_id,
            'name' => $this->name,
            'email' => $this->email,
            'is_admin' => $this->is_admin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'equipments' => $this->getEquipments(),
            'sectors' => $this->getSectors(),
        ];
    }

    protected function getEquipments():array
    {
        return $this->equipment->map(function ($equipment) {
            return [
                'equipment_id' => $equipment->equipment_id,
                'name' => $equipment->name,
                'equipment_type_id' => $equipment->equipment_type_id,
                'equipment_brand_id' => $equipment->equipment_brand_id,
                'sector_id' => $equipment->sector_id,
                'is_at_office' => $equipment->is_at_office,
            ];
        })->toArray();
    }

    protected function getSectors():array
    {
        return $this->sector->map(function ($sector) {
            return [
                'sector_id' => $sector->equipment_id,
                'name' => $sector->name,
            ];
        })->toArray();
    }


}
