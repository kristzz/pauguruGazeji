<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

// Open Routes
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);


// Protected Routes for Authenticated Users
Route::group(['middleware' => ['auth:api']], function () {
    // User routes
    Route::delete('delete', [UserController::class, 'delete']);
    Route::get('profile', [UserController::class, 'profile']);
    Route::put('profile', [UserController::class, 'update']);
    Route::post('logout', [UserController::class, 'logout']);

});