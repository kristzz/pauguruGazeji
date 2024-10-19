<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'id', // Keeping the 'id' as fillable, if needed (normally not required)
    ];

    // Inverse One-to-Many relationship with SubjectMatter
    public function subjectMatter()
    {
        return $this->belongsTo(SubjectMatters::class);
    }

    // Many-to-Many relationship with AboutUsers
    public function aboutUsers()
    {
        return $this->belongsToMany(AboutUser::class);
    }

    // One-to-Many relationship with Task
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
