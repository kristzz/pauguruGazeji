<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\AboutUser;
use Illuminate\Support\Facades\Auth;
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
        'subjects' => 'required|array',
        'subjects.*' => 'integer|exists:subjects,id',
    ]);

    try {
        $aboutUser = AboutUser::where('user_id', $validated['user_id'])->first();

        if (!$aboutUser) {
            return response()->json(['message' => 'AboutUser not found'], 404);
        }

        // Sync subjects without detaching previous subjects
        $aboutUser->subjects()->syncWithoutDetaching($validated['subjects']);

        return response()->json(['message' => 'Subjects updated successfully.']);
    }catch (\Exception $e) {
            // Dump the error message and stack trace for immediate feedback
            return response()->json([
                'error' => 'An error occurred while updating subjects.',
                'details' => $e->getMessage(),
                'stack' => $e->getTraceAsString() // Return stack trace for context
            ], 500);
        }
}



    public function aboutYouEducation(Request $request){
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'level_of_education' => 'required|string|max:255'
        ]);

        // Find the AboutUser model based on the user_id

            $aboutUser = AboutUser::create([
                'user_id' => $validated['user_id'],
                'level_of_education' => $validated['level_of_education']
            ]);

            return response()->json(['message' => 'education updated successfully']);
    }

    public function updateVisibility(Request $request){
        $validated = $request->validate([
            'is_visible' => 'required|boolean'
        ]);

        $user = Auth::user();

        $aboutUser = AboutUser::where('user_id', $user->id)->first();

        if (!$aboutUser) {
            return response()->json(['message' => 'AboutUser not found'], 404);
        }
        $aboutUser->is_visible = $validated['is_visible'];
        $aboutUser->save();

        return response()->json(['message' => 'Profile visibility updated successfully.']);
    }
}
