<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EquipRequestController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('equipments', EquipmentController::class);
    Route::post('equipment/return/{equipment_id}', [EquipmentController::class, 'returnEquipment']);
    Route::apiResource('sectors',SectorController::class);
    Route::apiResource('equipment-requests', EquipRequestController::class);
    Route::apiResource('users',UserController::class);
    Route::post('/logout',[AuthController::class, 'logout']);
    Route::group(['prefix' => 'history'], function () {
        Route::get('/users', [HistoryController::class, 'indexUser']);
        Route::get('/equipments', [HistoryController::class, 'indexEquipment']);
    });
});

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);


