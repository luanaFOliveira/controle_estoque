<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserEquipmentFactory extends Factory
{
    public function definition(): array
    {
        static $equipmentIds = null;

        if ($equipmentIds === null) {
            $equipmentIds = Equipment::all()->pluck('equipment_id')->toArray();
        }

        if (empty($equipmentIds)) {
            return [];
        } else {
            $randomIndex = array_rand($equipmentIds);
            $equipmentId = $equipmentIds[$randomIndex];
            unset($equipmentIds[$randomIndex]);

            Equipment::find($equipmentId)->update(['is_available' => false]);

            return [
                'user_id' => User::all()->random()->user_id,
                'equipment_id' => $equipmentId,
            ];
        }
    }
}
