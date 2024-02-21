<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
/**
 * @mixin User
 */
class UserDetailedResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'user_id' => $this->user_id,
            'name' => $this->name,
            'email' => $this->email,
            'is_admin' => $this->is_admin,
            'sectors' => $this->getSectors(),
        ];
    }

    protected function getSectors():array
    {
        return $this->sector->map(function ($sector) {
            return [
                'sector_id' => $sector->sector_id,
                'name' => $sector->name,
            ];
        })->toArray();
    }
}
