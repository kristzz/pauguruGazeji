<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class SubjectMatter extends Model // Change this to singular
    {
        use HasFactory;

        protected $fillable = [
            'name',
            'subject_id', 
        ];

        public function subjects()
        {
            return $this->belongsTo(Subject::class); // Change this to belongsTo
        }

        public function aboutUsers()
        {
            return $this->belongsToMany(AboutUser::class, 'about_user_subject');
        }
    }
