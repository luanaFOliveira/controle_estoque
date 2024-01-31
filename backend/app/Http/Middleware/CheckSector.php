<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckSector
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $sectorId = $request->route('setor_id');
        $userSectors = $request->user()->sectors()->pluck('sector_id')->toArray();
        if(!in_array($sectorId,$userSectors)){
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return $next($request);
    }
}
