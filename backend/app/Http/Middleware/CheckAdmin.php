<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{

    public function handle(Request $request, Closure $next): JsonResponse
    {
        if(Auth::user() && Auth::user()->is_admin == 1){
            return $next($request);
        }
        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
