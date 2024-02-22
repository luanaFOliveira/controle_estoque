<?php

namespace App\Http\Resources;

use App\Models\Sector;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Sector
 */
class SectorDetailResource extends JsonResource
{
    
    public function __construct(Sector $sector, Request $request)
    {
        $this->sector = $sector;
        $this->request = $request;
    }

    public function toArray($request): array
    {
        return [
            'sector_id' => $this->sector->sector_id,
            'name' => $this->sector->name,
            'users' => $this->getUsers(),
            'equipments' => $this->getEquipments(),
        ];
    }

    protected function getUsers(): array
    {
        $query = $this->sector->user();

        if ($this->request->has('user_name') && $this->request->input('user_name') !== "none") {
            $user_name = $this->request->input('user_name');
            $query->where('name', 'ilike', "%$user_name%");
        }
    
        $users = $query->get();
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
        $query = $this->sector->equipment();

        if ($this->request->has('equipment_code') && $this->request->input('equipment_code') !== "none") {
            $equipment_code = $this->request->input('equipment_code');
            $query->where('equipment_code', 'ilike', "%$equipment_code%");
        }
        $equipments = $query->get();
        return $equipments->map(function ($equipment) {
            return [
                'equipment_id' => $equipment->equipment_id,
                'equipment_code' => $equipment->equipment_code,
                'name' => $equipment->name,
                'is_available' => $equipment->is_available,
                'sector_id' => $equipment->sector_id,
                'sector' => $equipment->sector()->value('name'),
                'type' => $equipment->type()->value('name'),
                'brand' => $equipment->brand()->value('name'),
                'is_at_office' => $equipment->is_at_office,
            ];
        })->toArray();
    }
}
