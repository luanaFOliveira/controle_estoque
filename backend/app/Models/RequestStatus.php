<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RequestStatus extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'request_status';
    protected $primaryKey = 'request_status_id';
    public $timestamps = false;

    protected $fillable = ['name'];


}
