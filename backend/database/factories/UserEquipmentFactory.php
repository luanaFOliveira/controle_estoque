<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserEquipmentFactory extends Factory
{
    public function definition(): array
    {
        static $sectors = null;

        if ($sectors === null) {
            $sectors = Sector::all();
        }

        if ($sectors->isEmpty()) {
            return [];
        } else {
            $sector = $sectors->random();
            $user = User::join('user_sector', 'user.user_id', '=', 'user_sector.user_id')
                ->where('user_sector.sector_id', $sector->sector_id)
                ->get()
                ->random();
            $equipment = Equipment::where('sector_id', $sector->sector_id)->where('is_available', true)->first();

            if ($equipment && $user) {
                EquipmentRequest::factory()->create([
                    'user_id' => $user->user_id,
                    'equipment_id' => $equipment->equipment_id,
                    'request_status_id'=> 1
                ]);
                $equipment->update(['is_available' => false]);
                return [
                    'user_id' => $user->user_id,
                    'equipment_id' => $equipment->equipment_id,
                ];
            } else {
                return [];
            }
        }
    }

}
