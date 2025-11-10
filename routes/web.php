<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
// Route::get('/{any}', fn() => view('welcome'))->where('any', '.*');

// Fallback route untuk SPA - menangani semua route Vue Router
Route::fallback(function () {
    return view('welcome');
});
