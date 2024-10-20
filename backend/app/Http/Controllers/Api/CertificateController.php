<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Subject;
use App\Models\Certificate;
use Illuminate\Support\Facades\Auth;

class CertificateController extends Controller
{
    public function getUserCertificates(Request $request)
    {
        $user = Auth::user();
        // Fetch certificates for the user
        $certificates = Certificate::where('user_id', $user->id)->with('subject')->get();

        return response()->json([
            'message' => 'User information retrieved successfully.',
            'data' => $certificates,
        ], 200);
    }
}
