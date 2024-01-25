<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Sector;
use App\Models\EquipmentRequest;

class Equipment extends Model
{
    use HasFactory, softDeletes;

    protected $primaryKey = 'equipment_id';
    protected $table = 'equipment';

    protected $fillable = [
        'name',
        'equipment_brand_id',
        'is_available',
        'equipment_type_id',
        'sector_id',
        'is_at_office',
    ];

    public function type()
    {
        return $this->belongsTo(EquipmentType::class, 'equipment_type_id');
    }

    public function sector()
    {
        return $this->belongsTo(Sector::class, 'sector_id');
    }


    public function brand()
    {
        return $this->belongsTo(EquipmentBrand::class, 'equipment_brand_id');
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
