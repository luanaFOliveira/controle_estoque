<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentTable extends Migration
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
            $table->text('brand'); //criar a tabela e deletar ela e criar uma nova
            $table->boolean('is_available');
            $table->foreignId('type_id')->constrained('type', 'type_id');
            $table->foreignId('sector_id')->constrained('sector', 'sector_id');
            $table->foreignId('location_id')->constrained('location', 'location_id');
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
