<?php

namespace App\Models\Scopes;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class SectorScope implements Scope
{
    /*
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model)
    {
        /* @var User $user
         */

        $user = Auth::user();

        if (!$user->is_admin) {
            $userSectorIds = $user->sector->pluck('sector_id')->toArray();
            $builder->whereIn('user_sector.sector_id', $userSectorIds);
        }
    }
}
