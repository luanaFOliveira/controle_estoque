<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserEquipamentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_equipament', function (Blueprint $table) {
            $table->id('user_equipament_id');
            $table->foreign('equipament_id')->constrained('equipament_id', 'equipament');
            $table->foreign('user_id')->constrained('user_id', 'user');
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
        Schema::dropIfExists('user_equipament');
    }
}
