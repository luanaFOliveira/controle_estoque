<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\EquipmentBrand;
use App\Models\EquipmentType;
use App\Models\Sector;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquipmentFactory extends Factory
{
    public function definition(): array
    {
        do {
            $letters = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 2);
            $numbers = substr(str_shuffle("0123456789"), 0, 4);
            $equipment_code = $letters . '-' . $numbers;

            $query = Equipment::where('equipment_code', $equipment_code)->first();
        } while ($query != null);

        $name = 'Example Name';

        return [
            'name' => $name,
            'equipment_brand_id' => EquipmentBrand::all()->random()->equipment_brand_id,
            'equipment_code' => $equipment_code,
            'is_available' => true,
            'is_at_office' => true,
            'equipment_type_id' => EquipmentType::all()->random()->equipment_type_id,
            'sector_id' => Sector::all()->random()->sector_id,
        ];
    }
}
