<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipamentRequestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('status', function (Blueprint $table) {
            $table->id('status_id');
            $table->text('status')->unique();
            $table->softDeletes();
        });

        Schema::create('equipment_request', function (Blueprint $table) {
            $table->id('equipment_request_id');
            $table->text('reason');
            $table->foreignId('status_id')->constrained('status', 'status_id');
            $table->foreignId('equipment_id')->constrained('equipment', 'equipment_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('status');
        Schema::dropIfExists('equipment_request');
    }
}
