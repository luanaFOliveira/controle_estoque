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
            $table->text('brand')->nullable();
            $table->dropConstrainedForeignId('equipment_brand_id');
            $table->dropConstrainedForeignId('equipment_type_id');
            $table->dropColumn('is_at_office');
        });
    }
}
