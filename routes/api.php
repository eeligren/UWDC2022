<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/training-sessions', [\App\Http\Controllers\TrainingSessionController::class, 'index']);
    Route::post('/training-sessions', [\App\Http\Controllers\TrainingSessionController::class, 'store']);
    Route::delete('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::get('/statistics', [\App\Http\Controllers\StatisticsController::class, 'index']);

});

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

