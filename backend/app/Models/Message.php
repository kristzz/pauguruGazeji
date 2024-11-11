<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'content',
        'subject',
        'task_answer',
        'task_id',  // Add task_answer to the fillable array
        'sender',
    ];

    /**
     * Inverse One-to-Many relationship with User.
     * A message belongs to a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function tasks()
    {
        return $this->belongsTo(Tasks::class);
    }
}
