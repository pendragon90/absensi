<?php

namespace Database\Seeders;

use App\Models\StatusAbsence;
use App\Models\Student;
use App\Models\StudentAbsence;
use App\Models\TeacherAbsence;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            ClassroomSeeder::class,
            LessonSeeder::class,
            AbsenceStatusSeeder::class,
            LearningActivityStatusSeeder::class,
            UserSeeder::class,
        ]);
        User::factory(50)->create();
        TeacherAbsence::factory(250)->create();
        StudentAbsence::factory(250)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
