<?php

namespace App\Models;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $equipment_brand_id
 * @property string $name
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 */
class EquipmentBrand extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'equipment_brand';
    protected $primaryKey = 'equipment_brand_id';
    public $timestamps = false;

    protected $fillable = ['name'];
}
