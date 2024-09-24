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
        // Create some Subject Matters
        $subjectMatters = SubjectMatter::factory()->count(5)->create();

        // Create some Subjects under each Subject Matter
        $subjectMatters->each(function ($subjectMatter) {
            $subjects = Subject::factory()->count(3)->create([
                'subject_matter_id' => $subjectMatter->id
            ]);
        });

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
