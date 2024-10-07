<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\AboutUser;
use App\Models\SubjectMatter;

class AboutYouController extends Controller
{
    public function submit(Request $request)
    {
        // Validate input data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'age' => 'required|integer|min:0|max:116',
            'gender' => 'required|string',
            'subjects' => 'required|array', // Ensure subjects are an array
            'education' => 'required|string',
        ]);

        // Get the authenticated user
        $user = auth()->user();

        // Update user data
        $user->update([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'age' => $validated['age'],
        ]);

        // Update or create AboutUser
        $aboutUser = AboutUser::updateOrCreate(
            ['user_id' => $user->id], // Check if record exists for user
            [
                'level_of_education' => $validated['education'],
                'points' => 0, // You can modify how you set points
            ]
        );

        // Sync subjects with AboutUser (assuming subjects are related via a pivot table)
        $subjectIds = SubjectMatter::whereIn('name', $validated['subjects'])->pluck('id')->toArray();
        $aboutUser->subjects()->sync($subjectIds); // Sync subjects

        return response()->json(['message' => 'Form submitted successfully']);
    }
}
