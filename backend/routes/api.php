<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AboutYouController;
use App\Models\Tasks;

Route::get('/tasks', function () {
    return Tasks::all(); // This retrieves all tasks from the database
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post("/countsUsers" ,[AuthController::class, "countsUsers"]);

Route::group([
    "middleware" => "auth:api"
], function (){
Route::get('profile', [AuthController::class, 'profile']);
Route::post('/about-you', [AboutYouController::class, 'aboutYou']);
Route::post('/about-you/subjects', [AboutYouController::class, 'aboutYouSubjects']);
Route::post('/about-you/education', [AboutYouController::class, 'aboutYouEducation']);

});


