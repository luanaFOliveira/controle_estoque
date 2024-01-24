<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'type';
    protected $primaryKey = 'type_id';

    protected $fillable = ['name'];
}
