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
            'reason' => $this->reason,
            'request_status_id' => $this->request_status_id,
            'user_id' => $this->user_id,
            'equipment_id' => $this->equipment_id
        ];
    }
}