<?php

namespace App\Http\Resources;

use App\Models\Sector;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Sector
 */
class SectorDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'sector_id' => $this->sector_id,
            'name' => $this->name,
            'users' => $this->getUsers(),
            'equipments' => $this->getEquipments(),
        ];
    }

    protected function getUsers(): array
    {
        $users = $this->user()->paginate(10);
        return $users->map(function ($user) {
            return [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ];
        })->toArray();
    }

    protected function getEquipments(): array
    {
        $equipments = $this->equipment()->paginate(10);
        return $equipments->map(function ($equipment) {
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
