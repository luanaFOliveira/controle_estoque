<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('status', function (Blueprint $table) {
            $table->renameColumn('status_id', 'request_status_id');
        });
        Schema::rename('status', 'request_status');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('request_status', 'status');
        Schema::table('status', function (Blueprint $table) {
            $table->renameColumn('request_status_id', 'status_id');
        });
    }
}
