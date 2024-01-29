<?php

<<<<<<< HEAD
use App\Http\Controllers\SectorController;
=======
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
>>>>>>> lu_user_crud_test
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

<<<<<<< HEAD
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('equipments', \App\Http\Controllers\EquipmentController::class);
    Route::apiResource('sectors',SectorController::class);
});
=======
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout']);

Route::get('/users',[UserController::class, 'index']);
Route::get('/users/{user}',[UserController::class, 'show']);
Route::put('/users/{user}',[UserController::class, 'update']);
Route::delete('/users/{user}',[UserController::class, 'destroy']);
>>>>>>> lu_user_crud_test

