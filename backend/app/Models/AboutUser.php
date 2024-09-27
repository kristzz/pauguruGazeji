<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutUser extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'level_of_education',
        'points',
    ];

    // Inverse One-to-One relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Many-to-Many relationship with Subjects
    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'about_user_subject');
    }
}
