<?php

namespace Database\Seeders;

use App\Models\RequestMotive;
use Illuminate\Database\Seeder;

class RequestMotiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RequestMotive::create(['name' => 'Projeto especifico']);
        RequestMotive::create(['name' => 'Substituição de equipamento']);
        RequestMotive::create(['name' => 'Tarefa temporaria']);
        RequestMotive::create(['name' => 'Manutencao']);
        RequestMotive::create(['name' => 'Troca de setor']);
    }
}
