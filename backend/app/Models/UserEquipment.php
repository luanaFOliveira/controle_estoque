<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property int $user_equipment_id
 * @property int $equipment_id
 * @property int $user_id
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 */
class UserEquipment extends Pivot
{
    use softDeletes;

    protected $table = 'user_equipment';
    protected $primaryKey = 'user_equipment_id';

    protected $fillable = [
        'equipment_id',
        'user_id',
    ];

    protected $casts = [
        'returned_at' => 'datetime',
    ];
}
