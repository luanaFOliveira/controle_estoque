<?php

namespace App\Http\Resources;

use App\Models\Sector;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Sector
 */
class SectorResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'sector_id' => $this->sector_id,
            'name' => $this->name,
            'users' => $this->user->count(),
            'equipments_count' => $this->equipment->count(),
        ];
    }
}
