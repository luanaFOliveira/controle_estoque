<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentType extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'equipment_type';
    protected $primaryKey = 'equipment_type_id';
    public $timestamps = false;

    protected $fillable = ['name'];
}
