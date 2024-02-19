<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUniqueUserEquipmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_equipment', function (Blueprint $table) {
            $table->unique(['user_id','equipment_id','returned_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_equipment', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'equipment_id', 'returned_at']);
        });
    }
}
