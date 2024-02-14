<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeEquipmentRequestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('equipment_request', function (Blueprint $table) {
            $table->text('observation')->nullable();
            $table->dropColumn('reason');
            $table->foreignId('request_motive_id')->constrained('request_motive', 'request_motive_id');
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
            $table->dropColumn('observation');
            $table->text('reason')->nullable();
            $table->dropConstrainedForeignId('request_motive_id');
        });
    }
}
