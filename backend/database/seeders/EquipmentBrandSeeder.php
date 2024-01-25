<?php

namespace Database\Seeders;

use App\Models\EquipmentBrand;
use Illuminate\Database\Seeder;

class EquipmentBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EquipmentBrand::create(['name' => 'AOC']);
        EquipmentBrand::create(['name' => 'LG']);
        EquipmentBrand::create(['name' => 'Razer']);
        EquipmentBrand::create(['name' => 'Lenovo']);
        EquipmentBrand::create(['name' => 'HyperX']);
    }
}
