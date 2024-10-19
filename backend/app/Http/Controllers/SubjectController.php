<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;


use App\Models\Subject;
use App\Models\SubjectMatter;
use App\Models\Tasks; 

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SubjectController extends Controller
{
    /**
     * Store a newly created subject in storage.
     */
    public function createSubject(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $subject = Subject::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'id' => $subject->id,
            'name' => $subject->name,
            'message' => 'Subject created successfully.',
        ], 201);
    }

    /**
     * Store a newly created subject matter in storage.
     */
    public function createSubjectMatter(Request $request): JsonResponse
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'name' => 'required|string|max:255',
        ]);
    
        $subjectMatter = SubjectMatter::create([ // Update to use SubjectMatters
            'name' => $request->name,
            'subject_id' => $request->subject_id,
        ]);
    
        return response()->json([
            'id' => $subjectMatter->id,
            'name' => $subjectMatter->name,
            'subject_id' => $subjectMatter->subject_id,
            'message' => 'Subject matter created successfully.',
        ], 201);
    }
     
public function createTask(Request $request): JsonResponse
{
    try {
        $validated = $request->validate([
            'subject_matter_id' => 'required|exists:subject_matters,id',
            'name' => 'required|string|max:255',
            'task_description' => 'required|string',
            'correct_answer' => 'nullable|string',
        ]);
    } catch (ValidationException $e) {
        return response()->json(['errors' => $e->errors()], 422); // Return validation errors
    }

    $task = Tasks::create($validated);

    return response()->json([
        'id' => $task->id,
        'name' => $task->name,
        'task_description' => $task->task_description,
        'subject_matter_id' => $task->subject_matter_id,
        'correct_answer' => $task->correct_answer,
        'message' => 'Task created successfully.',
    ], 201);
}
}
