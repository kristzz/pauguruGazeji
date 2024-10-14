<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),  // Generates a related user
            'content' => $this->faker->sentence(),     // Generates random content
            'subject' => $this->faker->sentence(),     // Generates random subject
        ];
    }
}
