<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'userID'
        ])
            
        messages::create([
            'id' => $request->id,
            'content' => $request->content,
            'created_at'=>$date,
            'updated_at'=>$date
        ])
    }
}
