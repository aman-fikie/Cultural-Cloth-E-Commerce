<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // 1. Ensure Spatie Roles Exist
        $adminRole  = Role::firstOrCreate(['name' => 'admin']);
        $sellerRole = Role::firstOrCreate(['name' => 'seller']);
        $buyerRole  = Role::firstOrCreate(['name' => 'buyer']);

        // 2. Create System Administrator (UPDATED EMAIL HERE)
        $admin = User::updateOrCreate(
            ['email' => 'adminculturalcloth@gmail.com'],
            [
                'name'     => 'System Administrator',
                'password' => Hash::make('AdminPassword123!'),
                'role'     => 'admin',
            ]
        );

        // Assign Spatie Permission Role
        $admin->assignRole($adminRole);

        // 3. Create Default Test Buyer
        $buyer = User::factory()->create([
            'name'  => 'Test Buyer',
            'email' => 'buyer@example.com',
            'role'  => 'buyer',
        ]);

        // Assign Spatie Permission Role
        $buyer->assignRole($buyerRole);
    }
}
