<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $equipment_request_id
 * @property int $request_status_id
 * @property int $equipment_id
 * @property int $user_id
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 * @
 */
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
