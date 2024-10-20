<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
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
        User::create([
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

        return response()->json([
            "status" => true,
            "message" => "User created and logged in successfully",
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

        // User login check
        if(Auth::attempt([
            "email" => $request->email,
            "password" => $request->password
        ])){

            // User exists
            $user = Auth::user();

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

    // Profile API (GET)
    public function profile(){

        $user = Auth::user();

        return response()->json([
            "status" => true,
            "message" => "Profile information",
            "data" => $user
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

        $user = Auth::user(); //variable

        try{ //vins kaut ko meigina
            $user->delete(); //izdzees user
            auth()->user()->token()->revoke(); //atnem tam fujakam cepumu
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
    public function countsUsers(Request $request){
        $users = \App\Models\User::select('users.id', 'users.email')
            ->orderBy('users.id', 'asc')
            ->get(); 
    
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