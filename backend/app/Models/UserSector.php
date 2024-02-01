<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property int $user_sector_id
 * @property int $sector_id
 * @property int $user_id
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 */
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