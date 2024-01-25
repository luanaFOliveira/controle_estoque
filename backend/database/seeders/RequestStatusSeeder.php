<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RequestStatus;

class RequestStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RequestStatus::create(['status' => 'Aprovado']);
        RequestStatus::create(['status' => 'Não Aprovado']);
        RequestStatus::create(['status' => 'Pendente']);
    }
}
