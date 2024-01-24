<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Type;
use App\Models\Sector;
use App\Models\Location;
use App\Models\EquipmentRequest;

class Equipment extends Model
{
    use HasFactory, softDeletes;

    protected $primaryKey = 'equipment_id';
    protected $table = 'equipment';

    protected $fillable = [
        'name',
        'brand',
        'is_available',
        'type_id',
        'sector_id',
        'location_id',
    ];

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    public function sector()
    {
        return $this->belongsTo(Sector::class, 'sector_id');
    }

    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

    public function user()
    {
        return $this->belongsToMany(User::class, 'user_equipment', 'equipment_id', 'user_id');
    }

    public function request()
    {
        return $this->hasMany(EquipmentRequest::class, 'equipment_id', 'equipment_id');
    }
}
