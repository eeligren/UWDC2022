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
    Route::get('/creation-data', function () {
        $categories = \App\Models\Category::where('user_id', auth()->user()->id)->latest()->get();
        $types = \App\Models\Type::where('user_id', auth()->user()->id)->latest()->get();
        $tags = \App\Models\Tag::where('user_id', auth()->user()->id)->latest()->get();

        return response()->json([
            'categories' => $categories,
            'types' => $types,
            'tags' => $tags
        ]);
    });
    Route::get('/competitors', [\App\Http\Controllers\ExpertController::class, 'competitors']);
    Route::put('/training-sessions/{session}', [\App\Http\Controllers\TrainingSessionController::class, 'update']);
});

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

