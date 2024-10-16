<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\SubjectMatter;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $subjects = [
            'Geometry', 'Algebra', 'Latvian', 'English', 'Chemistry', 
            'Biology', 'Physics', 'Geography', 'Art', 'History', 
            'Programming', 'Literature', 'Sports', 'Business'
        ];

        return [
            'name' => $this->faker->randomElement($subjects), // Pick from predefined subjects
            'subject_matter_id' => SubjectMatter::factory(),
        ];
    }
}
