<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * \App\Models\UserEquipment
 *
 * @property int $user_equipment_id
 * @property int $equipment_id
 * @property int $user_id
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $returned_at
 * @property Carbon|null $deleted_at
 */
class UserEquipment extends Pivot
{
    use hasFactory, softDeletes;

    protected $table = 'user_equipment';
    protected $primaryKey = 'user_equipment_id';

    protected $fillable = [
        'equipment_id',
        'user_id',
    ];

    protected $casts = [
        'returned_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'equipment_id');
    }
}
