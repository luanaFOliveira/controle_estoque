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
        Route::post('register', [AuthController::class, 'register']);
        Route::apiResource('equipments', EquipmentController::class);
        Route::post('handle-equipment-request/{action}', [EquipRequestController::class, 'handleRequest']);
        Route::apiResource('equipments', EquipmentController::class);
        Route::get('equipment-details', [EquipmentController::class, 'equipmentsDetails']);
        Route::apiResource('sectors',SectorController::class);
        Route::get('/sector-names', [SectorController::class, 'sectorNames']);
        Route::apiResource('equipment-requests', EquipRequestController::class);
        Route::apiResource('users',UserController::class);
        Route::group(['prefix' => 'history'], function () {
            Route::get('/equipments', [HistoryController::class, 'indexEquipment']);
            Route::get('/users', [HistoryController::class, 'indexUser']);
        });
    });

    Route::apiResource('sectors',SectorController::class)->only(['show', 'index']);
    Route::apiResource('equipments', EquipmentController::class)->only(['show', 'index']);
    Route::apiResource('equipment-requests', EquipRequestController::class)->only(['show','store', 'index']);
    Route::put('change-password', [UserController::class, 'changePassword']);
    Route::get('equipments-available', [EquipRequestController::class, 'equipmentsAvailable']);
    Route::get('request-motives', [EquipRequestController::class, 'getRequestMotives']);
    Route::post('equipment/return/{equipment}', [EquipmentController::class, 'returnEquipment']);
    Route::group(['prefix' => 'history'], function () {
        Route::get('/users', [HistoryController::class, 'indexUser']);
    });
    Route::get('user', function (Request $request){
        return $request->user();
    });

    Route::post('/logout',[AuthController::class, 'logout']);
});

Route::post('/login',[AuthController::class, 'login']);
Route::post('/login-google',[AuthController::class, 'googleLogin']);;

