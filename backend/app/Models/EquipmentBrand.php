<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentBrand extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'equipment_brand';
    protected $primaryKey = 'equipment_brand_id';

    protected $fillable = ['name'];
}
