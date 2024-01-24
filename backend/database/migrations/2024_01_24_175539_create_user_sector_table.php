<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserSectorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_sector', function (Blueprint $table) {
            $table->id('user_sector_id');
            $table->foreignId('user_id')->constrained('user_id', 'user');
            $table->foreignId('sector_id')->constrained('sector_id', 'sector');
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
        Schema::dropIfExists('user_sector');
    }
}
