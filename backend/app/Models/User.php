<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $user_id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property boolean $is_admin
 * @property Sector|Collection $sector
 * @property Equipment|Collection $equipment
 * @property EquipmentRequest|Collection $equipmentRequest
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 * @method static where(string $column, mixed $value)
 * @method static withoutGlobalScope(string $scope)
 * @method static create(mixed $data)
 * @method static whereHas(string $string, \Closure $param)
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'user';
    protected $primaryKey = 'user_id';

    public function scopeAuth(Builder $query): void
    {
        if (!Auth::user()->is_admin) {
            $query->where('user_id', '=', Auth::user()->user_id);
        }
    }

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sector(): BelongsToMany
    {
        return $this->belongsToMany(Sector::class, 'user_sector', 'user_id', 'sector_id', 'user_id', 'sector_id')->using(UserSector::class);
    }

    public function equipment(): BelongsToMany
    {
        return $this->belongsToMany(Equipment::class, 'user_equipment', 'user_id', 'equipment_id', 'user_id', 'equipment_id')->using(UserEquipment::class);
    }

    public function equipmentRequest(): HasMany
    {
        return $this->hasMany(EquipmentRequest::class, 'user_id', 'user_id');
    }
}
