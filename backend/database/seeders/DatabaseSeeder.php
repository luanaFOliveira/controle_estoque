<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\EquipmentRequest;
use App\Models\UserEquipment;
use Illuminate\Database\Seeder;
use \App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            EquipmentBrandSeeder::class,
            EquipmentTypeSeeder::class,
            SectorSeeder::class,
            RequestStatusSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@adm.com',
            'password' => bcrypt('admin'),
            'is_admin' => true,
        ]);

        User::factory()->create([
            'name' => 'User Test',
            'email' => 'user@user.com',
            'password' => bcrypt('user'),
            'is_admin' => false,
        ]);

        User::factory(40)->create();
        Equipment::factory(40)->create();
        EquipmentRequest::factory(20)->create();
        //UserEquipment::factory(20)->create();
    }
}
