<?php

namespace App\Models\Scopes;

use App\Models\User;
use App\Models\UserSector;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class SectorScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        /* @var User $user
         */

        if (Auth::check()) {
            $user = Auth::user();

            if (!$user->is_admin) {
                $userSectorIds = UserSector::where('user_id', $user->user_id)->pluck('sector_id');
                $builder->whereIn('sector_id', $userSectorIds);
            }
        }

    }
}
