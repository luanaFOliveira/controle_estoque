<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquipmentRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $request_status_id = rand(2,3); // nao aprovado ou pendente

        return [
            'reason' => $this->faker->text(100),
            'request_status_id' => $request_status_id,
            'user_id' => User::all()->random()->user_id,
            'equipment_id' => Equipment::all()->random()->equipment_id,
        ];
    }
}
