<?php

namespace App\Http\Resources;

use App\Models\RequestMotive;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin RequestMotive
 */
class RequestMotiveResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'request_motive_id' => $this->request_motive_id,
            'name' => $this->name,
        ];
    }


}
