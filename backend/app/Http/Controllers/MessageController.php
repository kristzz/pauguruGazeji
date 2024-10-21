<?php
    namespace App\Http\Controllers;

    use App\Models\Message;
    use Illuminate\Http\Request;
    use App\Models\AboutUser; 
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Http\JsonResponse; // Ensure this is included

    class MessageController extends Controller
    {
        public function awardPoints()
        {
           
            $userId = Auth::id();
        
            \Log::info("Awarding points for user ID: {$userId}"); 
        
            $aboutUser = AboutUser::where('user_id', $userId)->first();
        
            if ($aboutUser) {
       
                $aboutUser->increment('points', 1); 
            } else {
                \Log::warning("No AboutUser found for user ID: {$userId}");
            }
        }

        public function markMessageAsSolved(Request $request): JsonResponse
        {
            
            $request->validate([
                'id' => 'required|integer|exists:messages,id', 
            ]);
        
            $messageId = $request->input('id'); 
        
            $message = Message::where('id', $messageId)->where('user_id', Auth::id())->first();
        
            if (!$message) {
                return response()->json([
                    'status' => false,
                    'message' => 'Message not found or you do not have permission to update it.',
                ], 404);
            }
        
       
            $message->isSolved = true;
            $message->save();
        
            return response()->json([
                'status' => true,
                'message' => 'Message marked as solved.',
                'data' => $message
            ]);
        }
        
        
        

        
        public function postMessage(Request $request)
        {  
            
            $request->validate([
                "content" => "required",
                "subject" => "required",
            ]);
            
            Message::create([
                "user_id" => Auth::id(),
                "content" => $request->content,
                "subject" => $request->subject
            ]);
        
            return response()->json([
                "status" => true,
                "message" => "Message created successfully"
            ]);
        }
        
        
public function getMessageFrom(Request $request)
{
    $subject = $request->input('subject');
    $userId = Auth::id();
    
    // Fetch the latest completed task's answer
    $lastCompletedTask = Message::where('user_id', $userId)
                                 ->whereNotNull('task_answer') // Ensure it's a task message
                                 ->where('content', '!=', '') // Exclude empty content
                                 ->latest('created_at')
                                 ->first();
    
    // Fetch messages based on the current subject
    $messages = Message::where('user_id', $userId)
                        ->where('subject', $subject)
                        ->get(['id', 'content', 'created_at', 'task_answer']);

    // Filter messages to only show if the last task has been completed
    if ($lastCompletedTask && $lastCompletedTask->task_answer) {
        return response()->json([
            'status' => true,
            'messages' => $messages
        ]);
    } else {
        return response()->json([
            'status' => true,
            'messages' => $messages->where(fn($msg) => !$msg->task_answer) // Show messages without task_answer if no previous task is completed
        ]);
    }
}

        public function getLastMessageFrom()
        {
            $userId = Auth::id();
            $lastMessage = Message::where('user_id', $userId)
                                ->latest('created_at')
                                ->first();

            if ($lastMessage) {
                return response()->json([
                    'status' => true,
                    'message' => $lastMessage->content
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'No messages found'
                ]);
            }
        } 
        
        public function getLastMessageFromSubject(Request $request)
        {
            $userId = Auth::id();
            $subject = $request->input('subject'); // Getting the subject from the request
    
            $lastMessage = Message::where('user_id', $userId)
                                ->where('subject', $subject)
                                ->latest('created_at')
                                ->first();
    
            if ($lastMessage) {
                return response()->json([
                    'status' => true,
                    'message' => $lastMessage->content,
                    'subject' => $lastMessage->subject // Also return the subject for clarity
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'No messages found with the specified subject'
                ]);
            }
        }
        

        public function getSubjectsWithLastMessages()
        {
            $userId = Auth::id();
        
            // Fetch the latest message for each unique subject by the user
            $messages = Message::where('user_id', $userId)
                        ->select('subject', \DB::raw('MAX(created_at) as latest_message_time'))
                        ->groupBy('subject')
                        ->get();
        
            // Fetch the actual latest message content for each subject
            $lastMessages = $messages->map(function($message) use ($userId) {
                return Message::where('user_id', $userId)
                            ->where('subject', $message->subject)
                            ->latest('created_at')
                            ->first();
            });
        
            // Build the response with subject and the last message content
            $response = $lastMessages->map(function($message) {
                return [
                    'subject' => $message->subject,
                    'last_message' => $message->content,
                    'created_at' => $message->created_at
                ];
            });
        
            return response()->json([
                'status' => true,
                'data' => $response
            ]);
        }        

        public function getLastTask(Request $request): JsonResponse
        {
            $request->validate([
                'subject_matter_id' => 'required|exists:subject_matters,id',
            ]);
        
            $subjectMatterId = $request->input('subject_matter_id');
        
            $lastTask = Tasks::where('subject_matter_id', $subjectMatterId)
                            ->orderBy('created_at', 'desc')
                            ->first();
        
            if (!$lastTask) {
                return response()->json([
                    'message' => 'No tasks found for the specified subject matter.',
                ], 404);
            }
        
            return response()->json([
                'id' => $lastTask->id,
                'name' => $lastTask->name,
                'task_description' => $lastTask->task_description,
                'correct_answer' => $lastTask->correct_answer,
                'created_at' => $lastTask->created_at,
                'message' => 'Last task retrieved successfully.',
            ]);
        }
        
}
