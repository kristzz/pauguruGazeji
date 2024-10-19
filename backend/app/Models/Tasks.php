<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'task_description',
        'subject_matter_id',
        'correct_answer'
    ];

    // One-to-Many relationship with SubjectsMatter
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
