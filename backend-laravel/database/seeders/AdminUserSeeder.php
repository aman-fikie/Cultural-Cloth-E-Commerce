<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'adminculturalcloth@gmail.com'], // Prevents duplicate creation
            [
                'name' => 'System Administrator',
                'password' => Hash::make('AdminPassword123!'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}
