<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AboutYouController;
use App\Models\Tasks;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\MessageController;
use Illuminate\Container\Attributes\Auth;

Route::get('/tasks', function () {
    return Tasks::all(); // This retrieves all tasks from the database
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post("/countsUsers" ,[AuthController::class, "countsUsers"]);

Route::post('/createSubject', [SubjectController::class, 'createSubject']);


Route::group([
    "middleware" => "auth:api"
], function (){
Route::get('profile', [AuthController::class, 'profile']);
Route::post('/about-you', [AboutYouController::class, 'aboutYou']);
Route::post('/about-you/subjects', [AboutYouController::class, 'aboutYouSubjects']);
Route::post('/about-you/education', [AboutYouController::class, 'aboutYouEducation']);
Route::get('/getMessageFrom', [MessageController::class, 'getMessageFrom']);
Route::post('/postMessage', [MessageController::class, 'postMessage']);

Route::get('/getSubjectsWithLastMessages', [MessageController::class, 'getSubjectsWithLastMessages']);

Route::get('/getLastMessageFromSubject', [MessageController::class, 'getLastMessageFromSubject']);
Route::get('/getLastMessageFrom', [MessageController::class, 'getLastMessageFrom']);

Route::post('/createSubjectMatter', [SubjectController::class, 'createSubjectMatter']);
Route::post('/createTask', [SubjectController::class, 'createTask']);


Route::post('/getLastTask', [SubjectController::class, 'getLastTask']);

Route::get('/getUserTasks', [AuthController::class, 'getUserTasks']);
});