<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MessageController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    Route::get('/getMessageFrom', [MessageController::class, 'getMessageFrom']);
    Route::post('/postMessage', [MessageController::class, 'postMessage']);
    
    Route::get('/getSubjectsWithLastMessages', [MessageController::class, 'getSubjectsWithLastMessages']);
    
    Route::get('/getLastMessageFromSubject', [MessageController::class, 'getLastMessageFromSubject']);
    Route::get('/getLastMessageFrom', [MessageController::class, 'getLastMessageFrom']);
});
