<?php

namespace Database\Seeders;

use App\Models\AbsenceStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AbsenceStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statusAbsences = [
            ['name' => 'H', 'slug' => 'H'],
            ['name' => 'S', 'slug' => 'S'],
            ['name' => 'I', 'slug' => 'I'],
            ['name' => 'A', 'slug' => 'A'],
        ];

        foreach ($statusAbsences as $statusAbsence) {
            AbsenceStatus::create($statusAbsence);
        }
    }
}
