<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipamentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('location', function (Blueprint $table) {
            $table->id('location_id');
            $table->text('location')->unique();
            $table->softDeletes();
        });

        Schema::create('equipment', function (Blueprint $table) {
            $table->id('equipment_id');
            $table->text('name');
            $table->text('brand');
            $table->boolean('is_available');
            $table->foreignId('type_id')->constrained('type_id', 'type');
            $table->foreignId('sector_id')->constrained('sector_id', 'sector');
            $table->foreignId('location_id')->constrained('location_id', 'location');
            $table->timestamps();
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
        Schema::dropIfExists('location');
        Schema::dropIfExists('equipment');
    }
}
