<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangesToEquipmentRequest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('equipment_request', function (Blueprint $table) {
            $table->foreignId('request_status_id')->constrained('request_status', 'request_status_id');
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
        Schema::table('equipment_request', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn('request_status_id');
        });
    }
}
