<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropIdsColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('equipment', function (Blueprint $table) {
            $table->dropColumn('type_id');
            $table->dropColumn('location_id');
        });

        Schema::table('equipment_request', function (Blueprint $table) {
            $table->dropColumn('status_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('equipment', function (Blueprint $table) {
            $table->foreignId('type_id')->constrained('type', 'type_id');
            $table->foreignId('location_id')->constrained('location', 'location_id');
        });

        Schema::table('equipment_request', function (Blueprint $table) {
            $table->foreignId('status_id')->constrained('status', 'status_id');
        });

    }
}
