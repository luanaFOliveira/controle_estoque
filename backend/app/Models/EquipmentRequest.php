<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Equipment;
use App\Models\Status;
use App\Models\User;

class EquipmentRequest extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'equipment_request';
    protected $primaryKey = 'equipment_request_id';

    protected $fillable = [
        'reason',
        'request_status_id',
        'equipment_id',
        'user_id',
    ];

    public function equipment(){

        return $this->belongsTo(Equipment::class, 'equipment_id');
    }

    public function status(){
            
        return $this->belongsTo(RequestStatus::class, 'request_status_id');
    }

    public function user(){
                
        return $this->belongsTo(User::class, 'user_id');
    }

}
