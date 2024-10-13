<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
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
    // Get the 'subjects' query parameter
    $subjects = $request->query('subjects');

    // Check if subjects are provided in the query string
    if (!$subjects) {
        return response()->json([
            "status" => false,
            "message" => "Subjects parameter is missing."
        ], 400);
    }

    // Convert the comma-separated string to an array
    $subjectsArray = explode(',', $subjects);

    // Trim any extra spaces from each subject
    $subjectsArray = array_map('trim', $subjectsArray);

    // Validate each subject name (optional length check)
    foreach ($subjectsArray as $subject) {
        if (strlen($subject) > 255) {
            return response()->json([
                "status" => false,
                "message" => "One of the subjects exceeds the maximum length of 255 characters."
            ], 400);
        }
    }

    // Get the authenticated user's ID
    $userId = $request->user()->id;

    // Find the AboutUser record for the user
    $aboutUser = AboutUser::where('user_id', $userId)->firstOrFail();

    // Save the subjects array as a JSON string in the 'subjects' field
    $aboutUser->update([
        'subjects' => json_encode($subjectsArray),
    ]);

    // Return a success response
    return response()->json([
        "status" => true,
        "message" => "Subjects saved successfully",
        "subjects" => $subjectsArray
    ]);
}
    
    

    

    public function aboutYouEducation(Request $request){
        
    }

}
