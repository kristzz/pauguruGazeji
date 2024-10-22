<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    // Get user settings
    public function getSettings()
    {
        $user = Auth::user();
        $settings = Setting::where('user_id', $user->id)->first();

        return response()->json($settings);
    }

    // Update user settings
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'email_notifications' => 'required|boolean',
            'push_notifications' => 'required|boolean',
        ]);

        $user = Auth::user();

        // Check if settings exist, otherwise create them
        $settings = Setting::firstOrCreate(
            ['user_id' => $user->id],
            ['email_notifications' => false, 'push_notifications' => false]
        );

        // Update settings
        $settings->email_notifications = $validated['email_notifications'];
        $settings->push_notifications = $validated['push_notifications'];
        $settings->save();

        return response()->json(['message' => 'Settings updated successfully.']);
    }
}
