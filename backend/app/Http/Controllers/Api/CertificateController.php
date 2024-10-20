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

    public function checkForCertificate(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Check if the user has enough points
        if ($user->points >= 50) {
            // Create a certificate
            Certificate::create([
                'user_id' => $user->id,
                'subject_id' => $request->subject_id,
            ]);

            // Optionally reset points or keep them accumulated
            $user->points = 0; // Reset points
            $user->save();

            return response()->json(['message' => 'Certificate awarded successfully.'], 201);
        }

        return response()->json(['message' => 'Not enough points to award a certificate.'], 400);
    }
}
