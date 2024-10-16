<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
<<<<<<< HEAD
use App\Http\Controllers\MessageController;
=======
use App\Http\Controllers\Api\AboutYouController;
use App\Models\Tasks;
>>>>>>> origin/main

Route::get('/tasks', function () {
    return Tasks::all(); // This retrieves all tasks from the database
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post("/countsUsers" ,[AuthController::class, "countsUsers"]);

<<<<<<< HEAD
Route::middleware('auth:api')->group(function () {
=======
Route::group([
    "middleware" => "auth:api"
], function (){
Route::get('profile', [AuthController::class, 'profile']);
Route::post('/about-you', [AboutYouController::class, 'aboutYou']);
Route::post('/about-you/subjects', [AboutYouController::class, 'aboutYouSubjects']);
Route::post('/about-you/education', [AboutYouController::class, 'aboutYouEducation']);
>>>>>>> origin/main

    Route::get('/getMessageFrom', [MessageController::class, 'getMessageFrom']);
    Route::post('/postMessage', [MessageController::class, 'postMessage']);
    
    Route::get('/getSubjectsWithLastMessages', [MessageController::class, 'getSubjectsWithLastMessages']);
    
    Route::get('/getLastMessageFromSubject', [MessageController::class, 'getLastMessageFromSubject']);
    Route::get('/getLastMessageFrom', [MessageController::class, 'getLastMessageFrom']);
});
