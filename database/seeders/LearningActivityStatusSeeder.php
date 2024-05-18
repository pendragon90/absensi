<?php

namespace Database\Seeders;

use App\Models\LearningActivityStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LearningActivityStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['name' => 'mulai', 'slug' => 'mulai'],
            ['name' => 'sedang', 'slug' => 'sedang'],
            ['name' => 'selesai', 'slug' => 'selesai'],
        ];

        foreach ($statuses as $status) {
            LearningActivityStatus::create($status);
        }
    }
}
