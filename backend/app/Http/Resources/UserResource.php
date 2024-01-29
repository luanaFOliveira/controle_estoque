<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
/**
 * @mixin \App\Models\User
 */
class UserResource extends JsonResource
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
            'equipments' => $this->equipment()->pluck('name'),
            'sectors' => $this->sector()->pluck('name'),
        ];
    }
}
