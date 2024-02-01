<?php

namespace App\Models;

use App\Models\Scopes\SectorScope;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
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
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;

    protected $table = 'user';
    protected $primaryKey = 'user_id';

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new SectorScope);
    }

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sector(): BelongsToMany
    {
        return $this->belongsToMany(Sector::class, 'user_sector', 'user_id', 'sector_id', 'user_id', 'sector_id')->using(UserSector::class);
    }

    public function equipment(): BelongsToMany
    {
        return $this->belongsToMany(Equipment::class,'user_equipment', 'user_id', 'equipment_id', 'user_id', 'equipment_id')->using(UserEquipment::class);
    }

    public function equipmentRequest(): HasMany
    {
        return $this->hasMany(EquipmentRequest::class, 'user_id', 'user_id');
    }
}
