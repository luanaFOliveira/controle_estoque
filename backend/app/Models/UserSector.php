<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserSector extends Pivot
{
    use softDeletes;

    protected $table = 'user_sector';
    protected $primaryKey = 'user_sector_id';

    protected $fillable = [
        'sector_id',
        'user_id',
    ];

    
}
