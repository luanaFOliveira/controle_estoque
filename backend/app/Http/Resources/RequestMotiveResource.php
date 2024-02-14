<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\UserEquipment;

class RequestMotiveResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'request_motive_id' => $this->request_motive_id,
            'name' => $this->name,
        ];
    }

    
}
