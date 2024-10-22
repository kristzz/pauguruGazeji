<?php
// User Registration
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Api\EmailVerificationController;
use App\Http\Controllers\Api\CertificateController;


// User Registration
use App\Http\Controllers\Api\AboutYouController;
use App\Http\Controllers\Api\SettingsController;
use App\Models\Tasks;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\MessageController;
use Illuminate\Container\Attributes\Auth;

Route::get('/tasks', function () {
    return Tasks::all(); // This retrieves all tasks from the database
});

Route::post('/register', [AuthController::class, 'register']);

// User Login
Route::post('/login', [AuthController::class, 'login']);
Route::post("/countsUsers" ,[AuthController::class, "countsUsers"]);

Route::post('/createSubject', [SubjectController::class, 'createSubject']);

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
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

Route::post('/convertTaskToMessage', [SubjectController::class, 'convertTaskToMessage']);   
Route::post('/getLastTask', [SubjectController::class, 'getLastTask']);


Route::post('/markMessageAsSolved', [MessageController::class, 'markMessageAsSolved']);




Route::get('/getUserTasks', [AuthController::class, 'getUserTasks']);
});

Route::post('/awardPoints', [MessageController::class, 'awardPoints'])->middleware('auth:api');

Route::post('/createSubject', [SubjectController::class, 'createSubject']);
Route::post('/getSubjectByName', [SubjectController::class, 'getSubjectByName']);
Route::post('/getSubjectMatterByName', [SubjectController::class, 'getSubjectMatterByName']);

Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.reset');


Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->middleware(['signed'])->name('verification.verify');
Route::post('/email/resend', [EmailVerificationController::class, 'resend'])->middleware(['auth:api'])->name('verification.resend');

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/user', [AuthController::class, 'delete']);
    Route::get('profile', [AuthController::class, 'profile']);
    Route::post('/about-you', [AboutYouController::class, 'aboutYou']);
    Route::post('/about-you/subjects', [AboutYouController::class, 'aboutYouSubjects']);
    Route::post('/about-you/education', [AboutYouController::class, 'aboutYouEducation']);
    Route::post('about-you/updateVisibility', [AboutYouController::class, 'updateVisibility']);
    Route::get('/user-certificates', [CertificateController::class, 'getUserCertificates']);
    Route::get('/settings', [SettingsController::class, 'getSettings']);
    Route::post('/settings', [SettingsController::class, 'updateSettings']);
    Route::get('/getSubjects', [AboutYouController::class, 'getSubjects']);
});

