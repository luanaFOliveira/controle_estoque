<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquipmentRequestFactory extends Factory
{
    public function definition(): array
    {
        $request_status_id = rand(2,3); // nao aprovado ou pendente
        $request_motive_id = rand(1,5);

        return [
            'observation' => $this->faker->text(100),
            'request_status_id' => $request_status_id,
            'request_motive_id' => $request_motive_id,
            'user_id' => User::factory(),
            'equipment_id' => Equipment::factory(),
        ];
    }
}
