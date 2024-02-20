<?php

namespace Database\Seeders;

use App\Models\Sector;
use Illuminate\Database\Seeder;

class SectorSeeder extends Seeder
{
    public function run()
    {
        Sector::create(['name' => 'Administrativo']);
        Sector::create(['name' => 'Financeiro']);
        Sector::create(['name' => 'Recursos Humanos']);
        Sector::create(['name' => 'Comercial']);
        Sector::create(['name' => 'Tecnologias da Informação']);
    }
}
