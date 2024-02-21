<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $equipment_type_id
 * @property string $name
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 * @method static firstOrCreate(array $array)
 * @method static where(string $column, mixed $value)
 * @method static create(mixed[] $array)
 *
 */
class EquipmentType extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'equipment_type';
    protected $primaryKey = 'equipment_type_id';
    public $timestamps = false;

    protected $fillable = ['name'];

    public function equipments(): HasMany
    {
        return $this->hasMany(Equipment::class, 'equipment_type_id', 'equipment_type_id');
    }
}
