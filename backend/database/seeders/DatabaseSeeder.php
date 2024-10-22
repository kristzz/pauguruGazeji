<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\AboutUser;
use App\Models\Subject;
use App\Models\SubjectMatter;
use App\Models\Message;
use App\Models\Certificate;
use Illuminate\Support\Facades\Hash;

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

        // Create subjects
        foreach ($subjects as $subjectName) {
            $subject = Subject::create(['name' => $subjectName]);

            // Assign multiple subject matters to each subject
            foreach (range(1, 3) as $i) {
                SubjectMatter::create([
                    'name' => "Subject Matter $i for $subjectName",
                    'subject_id' => $subject->id,  // Link to the subject
                ]);
            }
        }
        $defaultUser = User::factory()->create([
            'name' => 'test',
            'surname' => 'test',
            'age' => 25,
            'email' => 'test@test.com', // Specific email
            'password' => Hash::make('testtest'),
        ]);
    
        // Create AboutUser for the default user
        AboutUser::factory()->create([
            'user_id' => $defaultUser->id,
        ]);

        Certificate::create([
            'user_id' => 1,
            'subject_id' => 2,
        ]);
        Certificate::create([
            'user_id' => 1,
            'subject_id' => 1,
        ]);

        // Create 10 Users, AboutUser records, Messages and Assign random subjects to AboutUsers
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
    }
}
