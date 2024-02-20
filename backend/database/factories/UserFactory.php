<?php

namespace Database\Factories;

use App\Models\Sector;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'is_admin' => false,
        ];
    }
    public function unverified(): UserFactory
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }

    public function configure(): UserFactory
    {
        return $this->afterCreating(function (User $user) {
            $sectors = Sector::all()->random(2);
            $user->sector()->attach($sectors);
        });
    }
}
