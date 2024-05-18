<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use DateTime;
use DateTimeZone;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Set a specific birthdate
        $birthdate = new DateTime('1990-01-01 00:00:00', new DateTimeZone('Asia/Jakarta'));

        $users = [
            [
                'role_id' => 3,
                'username' => 'admin', 
                'name' => 'admin',
                'slug' => 'admin',
                'birthdate' => $birthdate->format('Y-m-d H:i:s'), // Set the specific birthdate
                'password' => Hash::make('admin')
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
