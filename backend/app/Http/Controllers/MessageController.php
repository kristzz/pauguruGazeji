<?php

namespace App\Http\Controllers;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function postMessage(Request $request){
        $request->validate([
            "user_id" => "required",
            "content" => "required"
        ]);
        
        Message::create([
            "user_id" => $request->user_id,
            "content" => $request->content
        ]);            
        
        return response()->json([
            "status" => true,
            "message" => "message created successfully"
        ]);

    }
    
    public function getMessageFrom(Request $request)
    {   
        $request->validate([
            'user_id' => 'required|integer'
        ]);

        $messages = Message::where('user_id', $request->user_id)->get();

        return response()->json([
            'status' => true,
            'messages' => $messages
        ]);
    }

    public function getMessage()
    {
        $messages = Message::all();  
        return response()->json([
            'status' => true,
            'messages' => $messages
        ]);
    }

  

}
