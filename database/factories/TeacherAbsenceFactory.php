<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeacherAbsence>
 */
class TeacherAbsenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate a random date between January 1, 2024, and May 31, 2024
        $start = Carbon::create(2024, 1, 1);
        $end = Carbon::create(2024, 5, 31);
        $randomDate = $this->faker->dateTimeBetween($start, $end);

        return [
            'user_id' => random_int(1,50),
            'classroom_id' => random_int(1,3),
            'lesson_id' => random_int(1,3),
            'learning_activity_status_id' => random_int(1,3),
            'absence_status_id' => random_int(1,4),
            'created_at' => $randomDate,
            'updated_at' => $randomDate,
        ];
    }
}
