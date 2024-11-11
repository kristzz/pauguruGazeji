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
use App\Models\Tasks;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $subjects = [
            'Geometry', 'Algebra', 'Latvian', 'English', 'Chemistry', 
            'Biology', 'Physics', 'Geography', 'Art', 'History', 
            'Programming', 'Literature', 'Sports', 'Business'
        ];
        // Create subjects
        foreach ($subjects as $subjectName) {
            $subject = Subject::create(['name' => $subjectName]);


        }

        // Define subjects
        $subjects = [
            'Geometry', 'Algebra', 'Latvian', 'English', 'Chemistry', 
            'Biology', 'Physics', 'Geography', 'Art', 'History', 
            'Programming', 'Literature', 'Sports', 'Business'
        ];
        SubjectMatter::create([
            'name' => 'Shapes',
            'subject_id' => 1,
        ]);
        SubjectMatter::create([
            'name' => 'Exponential functions',
            'subject_id' => 2,
        ]);
        SubjectMatter::create([
            'name' => 'Latvian words',
            'subject_id' => 3,
        ]);
        SubjectMatter::create([
            'name' => 'Present simple',
            'subject_id' => 4,
        ]);
        SubjectMatter::create([
            'name' => 'Elements',
            'subject_id' => 5,
        ]);
        SubjectMatter::create([
            'name' => 'Plants',
            'subject_id' => 6,
        ]);
        SubjectMatter::create([
            'name' => 'Speed',
            'subject_id' => 7,
        ]);
        SubjectMatter::create([
            'name' => 'Countries',
            'subject_id' => 8,
        ]);
        SubjectMatter::create([
            'name' => 'Famous painters',
            'subject_id' => 9,
        ]);
        SubjectMatter::create([
            'name' => 'Wars',
            'subject_id' => 10,
        ]);
        SubjectMatter::create([
            'name' => 'Python',
            'subject_id' => 11,
        ]);
        SubjectMatter::create([
            'name' => 'Famous writers',
            'subject_id' => 12,
        ]);
        SubjectMatter::create([
            'name' => 'Sports balls',
            'subject_id' => 13,
        ]);
        SubjectMatter::create([
            'name' => 'Economics',
            'subject_id' => 14,
        ]);

        Tasks::create([
            'subject_matter_id' => 1,
            'name' => "Square",
            'task_description' => "Does a square have 4 sides?",
            'correct_answer' => "yes",
        ]);

        Tasks::create([
            'subject_matter_id' => 1,
            'name' => "Circle",
            'task_description' => "Does a circle have 3 corners?",
            'correct_answer' => "no",
        ]);

        Tasks::create([
            'subject_matter_id' => 2,
            'name' => "Get x value",
            'task_description' => "In the fucntion y = 2^x what is the x value if y = 1?",
            'correct_answer' => "o",
        ]);

        Tasks::create([
            'subject_matter_id' => 2,
            'name' => "Get x value",
            'task_description' => "In the fucntion y = 2^x what is the x value if y = 2?",
            'correct_answer' => "1",
        ]);
        Tasks::create([
            'subject_matter_id' => 3,
            'name' => "Word meaning",
            'task_description' => "What does the word 'Grāmata' mean ",
            'correct_answer' => "Book",
        ]);

        Tasks::create([
            'subject_matter_id' => 3,
            'name' => "Word meaning",
            'task_description' => "Does car mean 'Māšīna' in Latvian?",
            'correct_answer' => "yes",
        ]);
        Tasks::create([
            'subject_matter_id' => 4,
            'name' => "Present simple sentences",
            'task_description' => "Is this present simple:I eat fruit",
            'correct_answer' => "yes",
        ]);

        Tasks::create([
            'subject_matter_id' => 4,
            'name' => "Present simple sentences",
            'task_description' => "Is this present simple:I was at school",
            'correct_answer' => "no",
        ]);

        Tasks::create([
            'subject_matter_id' => 5,
            'name' => "Element weight",
            'task_description' => "Is hydrogen the lightest element?",
            'correct_answer' => "yes",
        ]);
        Tasks::create([
            'subject_matter_id' => 5,
            'name' => "Element weight",
            'task_description' => "Is oxygen the heaviest element?",
            'correct_answer' => "no",
        ]);

        Tasks::create([
            'subject_matter_id' => 6,
            'name' => "Plants types",
            'task_description' => "Is a cactus a plant?",
            'correct_answer' => "yes",
        ]);

        Tasks::create([
            'subject_matter_id' => 6,
            'name' => "Plants types",
            'task_description' => "What is a plant with spikes on it?",
            'correct_answer' => "cactus",
        ]);

        Tasks::create([
            'subject_matter_id' =>7,
            'name' => "Train speed",
            'task_description' => "If a train is traveling 60/kph how many km will it travel in 2hr?",
            'correct_answer' => "120",
        ]);
        Tasks::create([
            'subject_matter_id' =>7,
            'name' => "Train speed",
            'task_description' => "If a train is traveling 60/kph will it travel in 60 km in 4 hrs?",
            'correct_answer' => "no",
        ]);
        Tasks::create([
            'subject_matter_id' =>8,
            'name' => "Real countries",
            'task_description' => "Is Spain a real country?",
            'correct_answer' => "yes",
        ]);
        Tasks::create([
            'subject_matter_id' =>8,
            'name' => "Countrie locations",
            'task_description' => "What contitent is Spain in?",
            'correct_answer' => "Europe",
        ]);
        Tasks::create([
            'subject_matter_id' =>9,
            'name' => "Da vinci",
            'task_description' => "What is the name of Da Vincis most famous painting?",
            'correct_answer' => "Mona Lisa",
        ]);
        Tasks::create([
            'subject_matter_id' =>9,
            'name' => "Da vinci",
            'task_description' => "Was Da Vinci an inventor as well as a painter?",
            'correct_answer' => "yes",
        ]);
        Tasks::create([
            'subject_matter_id' =>10,
            'name' => "War dates",
            'task_description' => "What year did WW1 end?",
            'correct_answer' => "1918",
        ]);
        Tasks::create([
            'subject_matter_id' =>10,
            'name' => "War dates",
            'task_description' => "Did WW2 end in 1876?",
            'correct_answer' => "no",
        ]);
        Tasks::create([
            'subject_matter_id' =>11,
            'name' => "Programming enviorments",
            'task_description' => "Can you use Spyder to program Python?",
            'correct_answer' => "yes",
        ]);
        Tasks::create([
            'subject_matter_id' =>11,
            'name' => "Python history",
            'task_description' => "What year was Python created?",
            'correct_answer' => "1991",
        ]);
        Tasks::create([
            'subject_matter_id' =>12,
            'name' => "Shakespear",
            'task_description' => "Did Shakspear write plays and books?",
            'correct_answer' => "yes",
        ]);
        Tasks::create([
            'subject_matter_id' =>12,
            'name' => "Shakespear",
            'task_description' => "What Shakespear story features a character named Romeo?",
            'correct_answer' => "Romeo and Juliet",
        ]);
        Tasks::create([
            'subject_matter_id' =>13,
            'name' => "Basketball",
            'task_description' => "Is a basketball round?",
            'correct_answer' => "yes",
        ]);
        Tasks::create([
            'subject_matter_id' =>13,
            'name' => "Florball",
            'task_description' => "True or false: A florball doesn't have holes in it",
            'correct_answer' => "false",
        ]);
        Tasks::create([
            'subject_matter_id' =>14,
            'name' => "Stock market",
            'task_description' => "Can you loose all your money in the stock market?",
            'correct_answer' => "yes",
        ]);
        Tasks::create([
            'subject_matter_id' =>14,
            'name' => "Stock market",
            'task_description' => "Can anyone trade stocks?",
            'correct_answer' => "yes",
        ]);




        $defaultUser = User::factory()->create([
            'name' => 'test',
            'surname' => 'test',
            'age' => 25,
            'email' => 'test@test.com', // Specific email
            'password' => Hash::make('testtest'),
            'email_verified_at' => now(),
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


        });
    }
}
