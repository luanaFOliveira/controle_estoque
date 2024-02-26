<?php

namespace Database\Factories;

use App\Models\Equipment;
use App\Models\EquipmentBrand;
use App\Models\EquipmentType;
use App\Models\Sector;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquipmentFactory extends Factory
{

    private function generateEquipmentCode(int $equipment_id): string
    {
        $letters = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 2);
        $numbers = substr(str_shuffle("0123456789"), 0, 4);
        $equipmentIdString = (string) $equipment_id;
        $equipmentCode = $letters . '-' . $numbers . $equipmentIdString;

        return $equipmentCode;
    }

    public function definition(): array
    {
        
        $name = 'Example Name';
        
        $randomNumber = mt_rand(1000, 9999);
        $prefix = strtoupper(substr($name, 0, 1));
        $equipmentCodeTemp = $prefix . '-' . $randomNumber;
       
        return [
            'name' => $name,
            'equipment_brand_id' => EquipmentBrand::all()->random()->equipment_brand_id,
            'equipment_code' => $equipmentCodeTemp,
            'is_available' => true,
            'is_at_office' => true,
            'equipment_type_id' => EquipmentType::all()->random()->equipment_type_id,
            'sector_id' => Sector::all()->random()->sector_id,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Equipment $equipment) {
            $equipment->update(['equipment_code' => $this->generateEquipmentCode($equipment->equipment_id)]);
        });
    }
}
