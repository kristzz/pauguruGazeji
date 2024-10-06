<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MessageController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/postMessage', [MessageController::class, 'postMessage']);
Route::get('/getMessage', [MessageController::class, 'getMessage']);
Route::get('/getMessageFrom', [MessageController::class, 'getMessageFrom']);