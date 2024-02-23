<?php

namespace Database\Seeders;

use App\Models\EquipmentType;
use Illuminate\Database\Seeder;

class EquipmentTypeSeeder extends Seeder
{
    public function run()
    {
        EquipmentType::create(['name' => 'COMPUTADOR']);
        EquipmentType::create(['name' => 'NOTEBOOK']);
        EquipmentType::create(['name' => 'MOUSE']);
        EquipmentType::create(['name' => 'MONITOR']);
    }
}
