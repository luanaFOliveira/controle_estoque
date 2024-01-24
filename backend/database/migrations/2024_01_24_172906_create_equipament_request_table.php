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

        Schema::create('equipament_request', function (Blueprint $table) {
            $table->id('equipament_request_id');
            $table->text('reason');
            $table->foreign('status_id')->constrained('status', 'status_id');
            $table->foreign('equipament_id')->constrained('equipament', 'equipament_id');
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
        Schema::dropIfExists('equipament_request');
    }
}
