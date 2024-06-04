<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainingSessionTag>
 */
class TrainingSessionTagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'training_session_id' => fake()->numberBetween(1, 12),
            'tag_id' => fake()->numberBetween(1, 4)
        ];
    }
}
