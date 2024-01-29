<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $sector_id
 * @property string $name
 * @property User|Collection $user
 * @property Equipment|Collection $equipment
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 */
class Sector extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'sector';
    protected $primaryKey = 'sector_id';
    protected $fillable = ['name'];

    public function user()
    {
        return $this->belongsToMany(User::class)->using(UserSector::class)->withPivot('user_sector_id');
    }


    public function equipment()
    {
        return $this->hasMany(Equipment::class, 'sector_id', 'sector_id');
    }
}
