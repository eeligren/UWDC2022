<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainingSession>
 */
class TrainingSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type_id' => rand(1, 2),
            'category_id' => rand(1, 4),
            'time_spent' => rand(1, 5),
            'notes' => fake()->sentence(5),
            'user_id' => rand(1, 2)
        ];
    }
}
