<?php


namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailNotification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class CustomVerifyEmail extends VerifyEmailNotification
{
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
                    ->subject('Verify Email Address')
                    ->line('Please click the button below to verify your email address.')
                    ->action('Verify Email Address', $verificationUrl)
                    ->line('If you did not create an account, no further action is required.');
    }

    protected function verificationUrl($notifiable)
    {
        if (!$notifiable) {
            throw new \InvalidArgumentException('Notifiable is null');
        }

        $id = $notifiable->getKey();
    $email = $notifiable->getEmailForVerification();

    if (!$id || !$email) {
        throw new \Exception('User ID or email for verification is missing');
    }
    
    
        if (!$id || !$email) {
            throw new \Exception('User ID or email for verification is missing');
        }
    
        $frontendUrl = 'http://localhost:3000/verify-email'; // Your frontend URL
    
        // Generate the backend verification URL
        $temporarySignedUrl = URL::temporarySignedRoute(
            'verification.verify', Carbon::now()->addMinutes(60), [
                'id' => $id,
                'hash' => sha1($email),
            ]
        );
    
        // Parse the backend URL to extract necessary query parameters and append them to your frontend URL
        $urlParts = parse_url($temporarySignedUrl);
        parse_str($urlParts['query'], $queryParams);
    
        // Include the 'id' and 'hash' in the frontend URL
        return $frontendUrl . '?' . http_build_query(array_merge($queryParams, [
            'id' => $id,
            'hash' => sha1($email),
        ]));
    }
    
}
