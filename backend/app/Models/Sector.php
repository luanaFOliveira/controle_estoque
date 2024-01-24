<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Equipment;

class Sector extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'sector';
    protected $primaryKey = 'sector_id';

    protected $fillable = ['name'];

    public function user()
    {
        return $this->belongsToMany(User::class, 'user_sector', 'sector_id','user_id');
    }

    public function equipment()
    {
        return $this->hasMany(Equipment::class, 'sector_id', 'sector_id');
    }
}
