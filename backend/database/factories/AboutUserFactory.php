<?php

namespace Database\Factories;

use App\Models\AboutUser;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AboutUser>
 */
class AboutUserFactory extends Factory
{
    protected $model = AboutUser::class;

    public function definition(): array
    {
        return [
            'level_of_education' => $this->faker->randomElement(['High School', 'Bachelor', 'Master', 'PhD']),
            'points' => $this->faker->numberBetween(100, 1000),
        ];
    }
}