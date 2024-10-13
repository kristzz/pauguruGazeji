<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AboutYouController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::group([
    "middleware" => "auth:api"
], function (){
Route::get('profile', [AuthController::class, 'profile']);
Route::post('/about-you', [AboutYouController::class, 'aboutYou']);
Route::post('/about-you/subjects', [AboutYouController::class, 'aboutYouSubjects']);
Route::post('/about-you/education', [AboutYouController::class, 'aboutYouEducation']);

});


