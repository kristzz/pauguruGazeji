<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AboutUser>
 */
class AboutUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'level_of_education' => $this->faker->randomElement(['High School', 'Bachelor', 'Master', 'PhD']),
            'points' => $this->faker->numberBetween(100, 1000),
        ];
    }
}
