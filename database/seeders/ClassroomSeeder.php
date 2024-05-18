<?php

namespace Database\Seeders;

use App\Models\Classroom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = [
            ['name' => '1A', 'slug' => 'sahs'],
            ['name' => '2A', 'slug' => 'shosao'],
            ['name' => '3A', 'slug' => 'sasha'],
        ];

        foreach ($classrooms as $classroom) {
           Classroom::create($classroom);
        }
    }
}
