<?php

namespace Database\Seeders;

use App\Models\EquipmentBrand;
use Illuminate\Database\Seeder;

class EquipmentBrandSeeder extends Seeder
{
    public function run()
    {
        EquipmentBrand::create(['name' => 'AOC']);
        EquipmentBrand::create(['name' => 'LG']);
        EquipmentBrand::create(['name' => 'RAZER']);
        EquipmentBrand::create(['name' => 'LENOVO']);
        EquipmentBrand::create(['name' => 'HYPERX']);
    }
}
