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
   

    Route::group(['middleware' => 'admin'], function () {

        Route::apiResource('equipments', EquipmentController::class)->only(['store','update','destroy']);
        Route::apiResource('sectors',SectorController::class)->only(['store','update','destroy']);
        Route::apiResource('equipment-requests', EquipRequestController::class)->only(['update','destroy']);
        Route::apiResource('users',UserController::class)->only(['store','update','destroy']);
        Route::group(['prefix' => 'history'], function () {
            Route::get('/equipments', [HistoryController::class, 'indexEquipment']);
        });
    });
    //falta o middleware do setor especifico para o usuario
    Route::post('equipment/return/{equipment_id}', [EquipmentController::class, 'returnEquipment']);
    Route::apiResource('equipments', EquipmentController::class)->only(['index','show']);
    Route::apiResource('sectors',SectorController::class)->only(['index','show']);
    Route::apiResource('equipment-requests', EquipRequestController::class)->only(['index','show','store']);
    Route::apiResource('users',UserController::class)->only(['index','show']);

    Route::post('/logout',[AuthController::class, 'logout']);

    Route::group(['prefix' => 'history'], function () {
        Route::get('/users', [HistoryController::class, 'indexUser']);
    });
});

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);


