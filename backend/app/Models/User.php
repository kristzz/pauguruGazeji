<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\CustomVerifyEmail;


class User extends Authenticatable implements CanResetPassword, MustVerifyEmail
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'surname',
        'age',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $guarded = ['subscription'];

    // One-to-One relationship with AboutUser
    public function aboutUser()
    {
        return $this->hasOne(AboutUser::class);
    }

    // One-to-Many relationship with Messages
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function certificate()
    {
        return $this->hasMany(Certificate::class);
    }
    public function sendPasswordResetNotification($token)
    {
    $this->notify(new \App\Notifications\ResetPasswordNotification($token));
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\CustomVerifyEmail);
    }

}
