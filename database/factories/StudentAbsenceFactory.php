<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentAbsence>
 */
class StudentAbsenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => random_int(1,50),
            'teacher_id' => random_int(1,50),
            'classroom_id' => random_int(1,3),
            'lesson_id' => random_int(1,3),
            'absence_status_id' => random_int(1,4),
        ];
    }
}
