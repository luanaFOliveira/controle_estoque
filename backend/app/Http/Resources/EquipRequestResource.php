<?php

namespace App\Http\Resources;

use App\Models\EquipmentRequest;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin EquipmentRequest
 */
class EquipRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'equipment_request_id' => $this->equipment_request_id,
            'observation' => $this->observation,
            'request_status' => $this->status()->value('status'),
            'request_motive' => $this->motive()->value('name'),
            'user' => $this->getUser(),
            'equipment' => $this->getEquipment(),
        ];
    }

    protected function getEquipment(): array
    {
        $equipments = $this->equipment;
        return $equipments->map(function ($equipment) {
            return [
                'equipment_id' => $equipment->equipment_id,
                'name' => $equipment->name,
            ];
        })->toArray();
    }
    protected function getUser(): array
    {
        $users = $this->user;
        return $users->map(function ($user) {
            return [
                'user_id' => $user->user_id,
                'name' => $user->name,
            ];
        })->toArray();
    }


    

}
