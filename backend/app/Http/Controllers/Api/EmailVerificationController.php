<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;  // Import the User model

class EmailVerificationController extends Controller
{
    // Verify email based on the signed URL
    public function verify(Request $request, $id, $hash)
    {
        // Find the user by ID
        $user = User::find($id);

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        // Check if the email hash matches
        if (!hash_equals($hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Invalid hash.'], 400);
        }

        // If the user is already verified, return success
        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email is already verified.'], 200);
        }

        // Verify the email if the signature is valid
        if ($request->hasValidSignature()) {
            $user->markEmailAsVerified();  // Mark the user's email as verified

            event(new Verified($user));  // Trigger the verified event

            return response()->json(['message' => 'Email verified successfully.'], 200);
        }

        return response()->json(['message' => 'Invalid or expired verification link.'], 400);
    }

    // Resend verification email
    public function resend(Request $request)
    {
        // Check if user is already verified
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email is already verified.'], 200);
        }

        // Send verification email
        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification email sent.'], 200);
    }
}
