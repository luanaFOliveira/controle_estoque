<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserEquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        static $equipmentIds = null;

        if ($equipmentIds === null) {
            $equipmentIds = Equipment::all()->pluck('equipment_id')->toArray();
        }

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
