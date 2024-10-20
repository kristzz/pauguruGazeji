<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName(),
            'surname' => $this->faker->lastName(),
            'age' => $this->faker->numberBetween(18, 60),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'),
        ];
    }

    public function defaultUser()
    {
        return $this->state([
            'name' => 'test',
            'surname' => 'test',
            'age' => 25,
            'email' => 'test@test.com',
            'password' => Hash::make('test'), // Default password
        ])->hasAboutUser([
            'level_of_education' => 'Bachelor',
            'points' => 500,
        ]);
    }
}
