<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Relations\Pivot;

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
