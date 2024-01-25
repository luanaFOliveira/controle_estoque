<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangesToEquipment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('equipment', function (Blueprint $table) {
            $table->dropColumn('brand');
            $table->dropColumn('type_id');
            $table->dropColumn('location_id');
            $table->foreignId('equipment_brand_id')->constrained('equipment_brand', 'equipment_brand_id');
            $table->foreignId('equipment_type_id')->constrained('equipment_type', 'equipment_type_id');
            $table->boolean('is_at_office')->default(true);
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
            $table->string('brand');
            $table->foreignId('type_id')->constrained('type', 'type_id');
            $table->foreignId('location_id')->constrained('location', 'location_id');
            $table->dropColumn('equipment_brand_id');
            $table->dropColumn('is_at_office');
            $table->dropColumn('equipment_type_id');
        });
    }
}
