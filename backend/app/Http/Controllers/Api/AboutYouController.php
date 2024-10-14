<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\AboutUser;
use App\Models\Subject;
use Illuminate\Validation\ValidationException;

class AboutYouController extends Controller
{
    public function aboutYou(Request $request)
    {
        // Validate input data, including the ID as a required parameter
        $validated = $request->validate([
            'id' => 'required|integer|exists:users,id', // Check if the user ID exists
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'age' => 'required|integer|min:0|max:116',
            'gender' => 'required|string',
        ]);

        // Find the user by ID
        $user = User::find($validated['id']);

        // Update user data
        $user->update([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'age' => $validated['age'],
            'gender' => $validated['gender'],
        ]);

        // Optionally return a response
        return response()->json(['message' => 'User information updated successfully.']);
    }

    public function aboutYouSubjects(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'subjects' => 'required|array', // Validate that subjects are provided as an array
            'subjects.*' => 'integer|exists:subjects,id', // Ensure each subject ID exists
        ]);

        // Find the AboutUser model based on the user_id
        $aboutuser = AboutUser::where('user_id', $validated['user_id'])->first();

        if (!$aboutuser) {
            return response()->json(['message' => 'AboutUser not found'], 404);
        }

        // Sync subjects without detaching previous subjects
        $aboutuser->subjects()->syncWithoutDetaching($validated['subjects']);

        return response()->json(['message' => 'Subjects updated successfully.']);
    }


    public function aboutYouEducation(Request $request){
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'level_of_education' => 'required|string|max:255'
        ]);
    
        // Find the AboutUser model based on the user_id
        $aboutuser = AboutUser::where('user_id', $validated['user_id'])->first();
    
        if (!$aboutuser) {
            return response()->json(['message' => 'AboutUser not found'], 404);
        }

        $aboutuser->update([
            'level_of_education' => $validated['level_of_education']
        ]);
    
        
    
        return response()->json(['message' => 'education updated successfully.']);
    }
    
}


