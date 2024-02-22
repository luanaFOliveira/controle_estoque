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
    protected $request;

    public function withRequest(Request $request)
    {
        $this->request = $request;
        return $this;
    }

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
        $users = $this->user;
        if($this->request->has('user_name') && $this->request->input('user_name') !== "none"){
            $user_name = $this->request->input('user_name');
            $users = $users->where('name', 'ilike', "%$user_name%");
        }
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
        $equipments = $this->equipment;
        if($this->request->has('equipment_code') && $this->request->input('equipment_code') !== "none"){
            $equipment_code = $this->request->input('equipment_code');
            $equipments = $equipments->where('equipment_code', 'ilike', "%$equipment_code%");
        }
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
