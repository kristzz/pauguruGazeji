<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\Registered;
use App\Models\Tasks;
use App\Models\Subject;
use App\Models\SubjectMatter;


class AuthController extends Controller
{
    // Register API (POST)
    public function register(Request $request){
        // Data validation
        $request->validate([
            "email" => "required|email|unique:users",
            "password" => "required|confirmed"
        ]);

        // Create User
        $user = User::create([
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "role" => "user"
        ]);

         // Log the user in
        Auth::attempt([
            "email" => $request->email,
            "password" => $request->password
        ]);

        $user = Auth::user();
        // Generate access token for the user
        $token = $user->createToken("userToken")->accessToken;

        // Trigger email verification notification
        event(new Registered($user));

        return response()->json([
            "status" => true,
            "message" => "User created and logged in successfully. Please verify your email.",
            "token" => $token,
            "role" => $user->role // Include user role in the response
        ]);
    }

    // Login API (POST)
    public function login(Request $request){
        // Data validation
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        // Check if user exists and credentials are correct
        if(Auth::attempt([
            "email" => $request->email,
            "password" => $request->password
        ])){
            $user = Auth::user();

            // Check if email is verified
            if (!$user->hasVerifiedEmail()) {
                return response()->json([
                    "status" => false,
                    "message" => "Please verify your email before logging in."
                ], 403);
            }

            // Generate token if verified
            $token = $user->createToken("userToken")->accessToken;

            return response()->json([
                "status" => true,
                "message" => "User logged in successfully",
                "token" => $token,
                "role" => $user->role // Include user role in the response
            ]);
        }else{
            return response()->json([
                "status" => false,
                "message" => "Invalid login details"
            ]);
        }
    }

    // Password reset link sending (POST)
    public function sendResetLinkEmail(Request $request)
    {
        // Validate the email
        $request->validate(['email' => 'required|email']);

        // Check if the user is verified before sending reset link
        $user = User::where('email', $request->email)->first();

        if (!$user || !$user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Please verify your email before requesting a password reset.'], 403);
        }

        // Send the password reset link
        $response = Password::sendResetLink($request->only('email'));

        return $response == Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Password reset link sent.'])
            : response()->json(['message' => 'Failed to send reset link.'], 400);
    }

    // Profile API (GET)
    public function profile(){
        $user = Auth::user();

        return response()->json([
            "status" => true,
            "message" => "Profile information",
            "data" => [
                'user' => $user, // User data
                'about_user' => $user->aboutUser, // AboutUser data
            ]
        ]);
    }

    // Logout
    public function logout(){
        auth()->user()->token()->revoke();
        return response()->json([
            "status" => true,
            "message" => "User Logged out"
        ]);
    }

    // Delete a user
    public function delete(){
        $user = Auth::user();

        try {
            $user->delete(); // Delete user
            auth()->user()->token()->revoke(); // Revoke token
            return response()->json([
                "message" => "User Deleted"
            ]);

        }catch (\Exception $e) { //vins noker eroru lai vins neaizskrien un nesaples man visu vietni
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Update user profile
    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }
    //funckija prieks leadboard dabun visus lietotajus ja daudz lietotaji bus varbut kkadu limitu uzlikt ka like 50 panem or smtn
    public function countsUsers(Request $request)
{
    $users = User::select('users.id', 'about_users.points', 'users.name')
        ->join('about_users', 'users.id', '=', 'about_users.user_id') // Join with the AboutUser table
        ->orderBy('about_users.points', 'desc')
        ->get();

    // Iterate over users and check for relationships before accessing properties
    $users->map(function ($user) {
        // Check if 'aboutUser' exists and has 'subjects'
        if ($user->aboutUser && $user->aboutUser->subjects->isNotEmpty()) {
            // If subjects exist, retrieve the favorite subject by points
            $user->favorite_subject = $user->aboutUser->subjects->sortByDesc('points')->first()->name;
        } else {
            // Set favorite subject to null or a default value if no subjects
            $user->favorite_subject = null;
        }
        return $user;
    });

    return response()->json([
        "data" => $users->toArray(),
    ]);
}

    

    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully!'], 200);
    }

    public function getUserTasks()
    {
        // Get the authenticated user's ID
        $userId = Auth::id(); // Get the authenticated user's ID
    
        // Use left joins to ensure user data is returned even if no tasks are found
        $tasks = DB::table('users')
            ->leftJoin('about_users', 'users.id', '=', 'about_users.user_id')
            ->leftJoin('about_user_subject', 'about_users.id', '=', 'about_user_subject.about_user_id')
            ->leftJoin('subjects', 'about_user_subject.subject_id', '=', 'subjects.id')
            ->leftJoin('subject_matters', 'subjects.id', '=', 'subject_matters.subject_id')
            ->leftJoin('tasks', 'subject_matters.id', '=', 'tasks.subject_matter_id')
            ->whereNotNull('tasks.id')
            ->where('users.id', $userId) // Filter by the authenticated user's ID
            ->select(
                'users.id as user_id', 
                'users.name as user_name', 
                'users.surname', 
                'users.email', 
                'about_users.level_of_education', 
                'about_users.points',
                'subjects.id as subject_id',
                'subjects.name as subject_name',
                'subject_matters.id as subject_matter_id',
                'subject_matters.name as subject_matter_name',
                'tasks.id as task_id',
                'tasks.name as task_name',
                'tasks.task_description',
                'tasks.correct_answer'
            )
            ->get();
    
        // Return the tasks with user info
        return response()->json($tasks);
    }


    

}   

