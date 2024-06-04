<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::prefix('/dashboard')->group(function () {
        Route::get('/', function () {
            return view('dashboard.overview');
        })->name('dashboard.overview');
    });

    Route::delete('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('logout');
});

Route::get('/login', [\App\Http\Controllers\AuthController::class, 'show'])->name('login');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('auth.login');

