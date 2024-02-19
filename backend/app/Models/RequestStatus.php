<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * @property int $request_status_id
 * @property string $name
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 */
class RequestStatus extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'request_status';
    protected $primaryKey = 'request_status_id';
    public $timestamps = false;

    protected $fillable = ['name'];

    public function equipmentRequest(): HasMany
    {
        return $this->hasMany(EquipmentRequest::class, 'request_status_id', 'request_status_id');
    }
}
