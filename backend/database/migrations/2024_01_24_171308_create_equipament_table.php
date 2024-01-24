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

        Schema::create('equipament', function (Blueprint $table) {
            $table->id('equipament_id');
            $table->text('name');
            $table->text('brand');
            $table->boolean('is_avaliable');
            $table->foreign('type_id');
            $table->foreign('sector_id');
            $table->foreign('location_id');
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
        Schema::dropIfExists('equipament');
    }
}
