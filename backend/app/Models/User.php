<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

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
}
