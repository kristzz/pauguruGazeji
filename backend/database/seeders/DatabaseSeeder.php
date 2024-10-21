<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\AboutUser;
use App\Models\Subject;
use App\Models\SubjectMatter;
use App\Models\Message;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Define subjects
        $subjects = [
            'Geometry', 'Algebra', 'Latvian', 'English', 'Chemistry', 
            'Biology', 'Physics', 'Geography', 'Art', 'History', 
            'Programming', 'Literature', 'Sports', 'Business'
        ];

    
       

        
        User::factory()->count(10)->create()->each(function ($user) {
            // Create an AboutUser for each user
            $aboutUser = AboutUser::factory()->create([
                'user_id' => $user->id,
            ]);

            // Attach random subjects to the AboutUser (Many-to-Many)
            $subjects = Subject::inRandomOrder()->take(2)->pluck('id'); // Get 2 random subjects
            $aboutUser->subjects()->attach($subjects);

            // Create messages for each user
            Message::factory()->count(3)->create([
                'user_id' => $user->id,
            ]);
        });
        foreach ($subjects as $index => $subject) {
            
            $subjectModel = Subject::where('name', $subject)->first();

            if ($subjectModel) {
                
                SubjectMatter::create([
                    'name' => $subject . ' Matter', 
                    'subject_id' => $subjectModel->id,
                ]);
            }
        }
    }
}
