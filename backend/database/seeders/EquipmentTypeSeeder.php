<?php

namespace Database\Seeders;

use App\Models\EquipmentType;
use Illuminate\Database\Seeder;

class EquipmentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EquipmentType::create(['name' => 'Computador']);
        EquipmentType::create(['name' => 'Notebook']);
        EquipmentType::create(['name' => 'Mouse']);
        EquipmentType::create(['name' => 'Monitor']);
    }
}
