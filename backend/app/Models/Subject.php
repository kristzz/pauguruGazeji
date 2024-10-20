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
        'subject_matter_id',
        'name',
    ];

    // Inverse One-to-Many relationship with SubjectMatter
    public function subjectMatter()
    {
        return $this->belongsTo(SubjectMatter::class);
    }

    // Many-to-Many relationship with AboutUsers
    public function aboutUsers()
    {
        return $this->belongsToMany(AboutUser::class);
    }

    public function certificate()
    {
        return $this->belongsToMany(Certificate::class);
    }
}
