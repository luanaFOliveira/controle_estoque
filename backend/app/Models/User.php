<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Sector;
use App\Models\Equipment;
use App\Models\EquipmentRequest;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;

    protected $table = 'user';
    protected $primaryKey = 'user_id';
    

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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

    public function sector(){
        return $this->belongsToMany(Sector::class, 'user_sector', 'user_id', 'sector_id', 'user_id', 'sector_id');
    }

    public function equipment(){
        return $this->belongsToMany(Equipment::class,'user_equipment', 'user_id', 'equipment_id', 'user_id', 'equipment_id');
    }

    public function equipmentRequest(){
        return $this->hasMany(EquipmentRequest::class, 'user_id', 'user_id');
    }
}
