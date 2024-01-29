<?php

namespace Database\Factories;

use App\Models\Sector;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\EquipmentBrand;
use App\Models\EquipmentType;

class EquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = 'Example Name';

        return [
            'name' => $name,
            'equipment_brand_id' => EquipmentBrand::all()->random()->equipment_brand_id,
            'is_available' => true,
            'is_at_office' => true,
            'equipment_type_id' => EquipmentType::all()->random()->equipment_type_id,
            'sector_id' => Sector::all()->random()->sector_id,
        ];
    }
}
