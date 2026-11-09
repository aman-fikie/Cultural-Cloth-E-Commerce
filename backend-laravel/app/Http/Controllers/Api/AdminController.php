<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get platform overview metrics
     */
    public function stats()
    {
        return response()->json([
            'total_users'   => User::count(),
            'total_sellers' => User::role('seller')->count(),
            'total_buyers'  => User::role('buyer')->count(),
        ], 200);
    }

    /**
     * Get list of all registered sellers
     */
    public function sellers()
    {
        $sellers = User::role('seller')
            ->select('id', 'name', 'email', 'shop_name', 'phone_number', 'location', 'created_at')
            ->latest()
            ->get();

        return response()->json($sellers, 200);
    }

    /**
     * Delete or deactivate a user account
     */
    /**
     * Delete or deactivate a user account
     */
    public function deleteUser(User $user)
    {
        if ($user->hasRole('admin')) {
            return response()->json(['message' => 'Cannot delete an administrator account.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }
}
