<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

/**
 * @property int $equipment_request_id
 * @property string $observation
 * @property int $request_status_id
 * @property int $request_motive_id
 * @property int $equipment_id
 * @property int $user_id
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * @property Carbon|null $deleted_at
 * @method static auth()
 * @method static where(string $column, mixed $value)
 * @method static find(mixed $value)
 *
 */
class EquipmentRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'equipment_request';
    protected $primaryKey = 'equipment_request_id';

    protected $fillable = [
        'observation',
        'request_motive_id',
        'request_status_id',
        'equipment_id',
        'user_id',
    ];

    public function scopeAuth(Builder $query): void
    {
        if (!Auth::user()->is_admin) {
            $query->where('user_id', '=', Auth::user()->user_id);
        }
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'equipment_id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(RequestStatus::class, 'request_status_id');
    }

    public function motive(): BelongsTo
    {
        return $this->belongsTo(RequestMotive::class, 'request_motive_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
