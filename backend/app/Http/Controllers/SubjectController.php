<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\SubjectMatters;
use App\Models\Tasks;  // Import the Tasks model
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
    
        $subjectMatter = SubjectMatters::create([ // Update to use SubjectMatters
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
    

    /**
     * Store a newly created task in storage.
     */
    public function createTask(Request $request): JsonResponse
    {
        $request->validate([
            'subject_matter_id' => 'required|exists:subject_matters,id',
            'name' => 'required|string|max:255',
            'task_description' => 'required|string',
            'correct_answer' => 'nullable|string|max:255', // Add validation for correct_answer
        ]);

        $task = Tasks::create([
            'name' => $request->name,
            'task_description' => $request->task_description,
            'subject_matter_id' => $request->subject_matter_id,
            'correct_answer' => $request->correct_answer, // Store correct_answer if provided
        ]);

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
