<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController; 
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Api\EmailVerificationController;


// User Registration
use App\Http\Controllers\Api\AboutYouController;
use App\Models\Tasks;

Route::get('/tasks', function () {
    return Tasks::all(); // This retrieves all tasks from the database
});
Route::post('/register', [AuthController::class, 'register']);

// User Login
Route::post('/login', [AuthController::class, 'login']);
Route::post("/countsUsers" ,[AuthController::class, "countsUsers"]);

// Send Password Reset Link
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);

// Reset Password
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.reset');


Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->middleware(['signed'])->name('verification.verify');
Route::post('/email/resend', [EmailVerificationController::class, 'resend'])->middleware(['auth:api'])->name('verification.resend');




// Authenticated Routes
Route::group([
    "middleware" => "auth:api"
], function (){
    

Route::get('profile', [AuthController::class, 'profile']);
Route::post('/about-you', [AboutYouController::class, 'aboutYou']);
Route::post('/about-you/subjects', [AboutYouController::class, 'aboutYouSubjects']);
Route::post('/about-you/education', [AboutYouController::class, 'aboutYouEducation']);

});



