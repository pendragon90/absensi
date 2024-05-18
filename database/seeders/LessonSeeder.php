<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lessons = [
            ['name' => 'IPA', 'slug' => 'ipa'],
            ['name' => 'MTK', 'slug' => 'mtk'],
            ['name' => 'English', 'slug' => 'eng'],
        ];

        foreach ($lessons as $lesson) {
            Lesson::create($lesson);
        }
    }
}
