<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;

use Illuminate\Support\Facades\Auth;

use App\Models\Subject;
use App\Models\SubjectMatter;
use App\Models\Tasks; 
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\AboutUser;

class SubjectController extends Controller
{
    public function addPoint()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated.'], 401);
        }

        $aboutUser = AboutUser::where('user_id', $user->id)->first();

        if (!$aboutUser) {
            return response()->json(['message' => 'AboutUser entry not found.'], 404);
        }

        $aboutUser->increment('points');

        return response()->json([
            'message' => 'Point added successfully.',
            'points' => $aboutUser->points,
        ]);
    }

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

    public function getSubjectByName(Request $request) {
        $subject = Subject::where('name', $request->name)->first();
        if (!$subject) {
            return response()->json(['status' => false, 'message' => 'Subject not found'], 404);
        }
        return response()->json(['status' => true, 'id' => $subject->id]);
    }

    public function getSubjectMatterByName(Request $request) {
        $subject = SubjectMatter::where('name', $request->name)->first();
        if (!$subject) {
            return response()->json(['status' => false, 'message' => 'Subject matter not found'], 404);
        }
        return response()->json(['status' => true, 'id' => $subject->id]);
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
/**
 * Get the last task for a specific subject matter.
 */
public function getLastTask(Request $request): JsonResponse
{
    // Validate the request for subject matter ID
    $request->validate([
        'subject_matter_id' => 'required|exists:subject_matters,id',
    ]);

    // Fetch the last task associated with the subject matter
    $lastTask = Tasks::where('subject_matter_id', $request->subject_matter_id)
        ->orderBy('created_at', 'desc')
        ->first();

    if ($lastTask) {
        return response()->json([
            'id' => $lastTask->id,
            'name' => $lastTask->name,
            'task_description' => $lastTask->task_description,
            'subject_matter_id' => $lastTask->subject_matter_id,
            'correct_answer' => $lastTask->correct_answer,
            'message' => 'Last task retrieved successfully.',
        ], 200);
    }

    return response()->json([
        'message' => 'No tasks found for this subject matter.',
    ], 404);
}

public function convertTaskToMessage(Request $request)
{
  
    $request->validate([
        'task_id' => 'required|exists:tasks,id',
    ]);
    $task = Tasks::find($request->task_id);

    if (!$task) {
        return response()->json([
            'status' => false,
            'message' => 'Task not found'
        ]);
    }
    $subjectMatter = SubjectMatter::find($task->subject_matter_id);

    if (!$subjectMatter) {
        return response()->json([
            'status' => false,
            'message' => 'Subject matter not found'
        ]);
    }
    $subject = Subject::find($subjectMatter->subject_id);

    if (!$subject) {
        return response()->json([
            'status' => false,
            'message' => 'Subject not found'
        ]);
    }
  $message = Message::create([
        'user_id' => Auth::id(),
        'content' => $task->task_description,
        'subject' => $subject->name,         
        'task_answer' => $task->correct_answer,
        'task_id'=>$request->task_id
    ]);

    return response()->json([
        'status' => true,
        'message' => 'Task converted to message successfully',
        'data' => $message
    ]);
}
}