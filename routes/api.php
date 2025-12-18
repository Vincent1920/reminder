<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\TugasController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Route::middleware('auth:sanctum')->post('/Create_Tugas', [TugasController::class, 'CreateTugas']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/Create_Tugas', [TugasController::class, 'CreateTugas']);
    Route::post('/kategori',[KategoriController::class,'store']);
    // Route::post('/Create_Tugas',[TugasController::class,'CreateTugas']);
    Route::get('/get-kategori', [KategoriController::class, 'getKategori']);
    Route::post('/logout', [AuthController::class, 'logout']);
});