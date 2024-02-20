<?php

namespace Database\Seeders;

use App\Models\EquipmentType;
use Illuminate\Database\Seeder;

class EquipmentTypeSeeder extends Seeder
{
    public function run()
    {
        EquipmentType::create(['name' => 'Computador']);
        EquipmentType::create(['name' => 'Notebook']);
        EquipmentType::create(['name' => 'Mouse']);
        EquipmentType::create(['name' => 'Monitor']);
    }
}
