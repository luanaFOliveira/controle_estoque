<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * \App\Models\Pet
 *
 * @property int $equipment_id
 * @property string $name
 * @property int $equipment_type_id
 * @property int $equipment_brand_id
 * @property int $sector_id
 * @property boolean $is_available
 * @property boolean $is_at_office
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 */
class Equipment extends Model
{
    use HasFactory, softDeletes;

    protected $primaryKey = 'equipment_id';
    protected $table = 'equipment';

    protected $fillable = [
        'name',
        'equipment_brand_id',
        'is_available',
        'equipment_type_id',
        'sector_id',
        'is_at_office',
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(EquipmentType::class, 'equipment_type_id');
    }

    public function sector(): belongsTo
    {
        return $this->belongsTo(Sector::class, 'sector_id');
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(EquipmentBrand::class, 'equipment_brand_id');
    }

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->using(UserEquipment::class);
    }

    public function request(): HasMany
    {
        return $this->hasMany(EquipmentRequest::class, 'equipment_id', 'equipment_id');
    }
}
