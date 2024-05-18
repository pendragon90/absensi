<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use DateTime;
use DateTimeZone;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = $this->faker;
        $birthdate = $faker->dateTimeBetween('-30 years', '-18 years'); // Generate a birthdate between 18 and 30 years ago
        $birthdate->setTimezone(new DateTimeZone('Asia/Jakarta')); // Convert to Asia/Jakarta timezone

        return [
            'role_id' => $faker->numberBetween(1, 2),
            'birthdate' => $birthdate->format('Y-m-d H:i:s'), // Format the birthdate as a datetime string
            'username' => $faker->name() . '-' .random_int(1,100),
            'name' => $faker->name(),
            'slug' => Str::slug($faker->name() . '-' . $faker->numberBetween(1, 10)),
            'classroom_id' => $faker->numberBetween(1, 3),
            'password' => Hash::make('123'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

