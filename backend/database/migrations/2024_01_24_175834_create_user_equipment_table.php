<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserEquipmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_equipment', function (Blueprint $table) {
            $table->id('user_equipment_id');
            $table->foreignId('equipment_id')->constrained('equipment', 'equipment_id');
            $table->foreignId('user_id')->constrained('user', 'user_id')->nullable();
            $table->timestamps();
            $table->timestamp('returned_at');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_equipment');
    }
}
