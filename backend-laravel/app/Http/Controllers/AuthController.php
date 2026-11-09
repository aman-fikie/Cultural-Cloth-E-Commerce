<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * 1. BUYER REGISTRATION LOGIC
     */
    public function registerBuyer(Request $request)
    {
        // 1. Basic validation WITHOUT unique:users rule on email
        $validator = Validator::make($request->all(), [
            'fullName'        => 'required|string|max:255',
            'email'           => 'required|string|email|max:255',
            'phone'           => 'required|string|max:20',
            'password'        => 'required|string|min:8',
            'confirmPassword' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $email = strtolower($request->email);
        $existingUser = User::where('email', $email)->first();

        // 2. Role Check for Buyer
        if ($existingUser) {
            if ($existingUser->hasRole('buyer')) {
                return response()->json([
                    'errors' => ['email' => ['This email address is already registered as a buyer.']]
                ], 422);
            }

            // User exists as Seller only -> Add 'buyer' role & update phone if missing
            $existingUser->update([
                'phone_number' => $existingUser->phone_number ?? $request->phone,
            ]);

            $existingUser->assignRole('buyer');

            return response()->json([
                'message'  => 'Your existing seller account has now been enabled for buyer access! Please login.',
                'redirect' => '/login',
            ], 200);
        }

        // 3. Completely New User
        $user = User::create([
            'name'         => $request->fullName,
            'email'        => $email,
            'phone_number' => $request->phone,
            'password'     => Hash::make($request->password),
        ]);

        $user->assignRole('buyer');

        return response()->json([
            'message'  => 'Buyer registration successful! Please login.',
            'redirect' => '/login',
        ], 201);
    }

    /**
     * 2. SELLER REGISTRATION LOGIC
     */
    public function registerSeller(Request $request)
    {
        // 1. Basic validation WITHOUT unique:users rule on email
        $validator = Validator::make($request->all(), [
            'fullName'        => 'required|string|max:255',
            'email'           => 'required|string|email|max:255',
            'password'        => 'required|string|min:6',
            'confirmPassword' => 'required|same:password',
            'gender'          => 'nullable|string',
            'phoneNumber'     => 'nullable|string',
            'location'        => 'nullable|string',
            'shopName'        => 'nullable|string',
            'startTime'       => 'nullable',
            'endTime'         => 'nullable',
            'shopDescription' => 'nullable|string',
            'profilePhoto'    => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'businessLicense' => 'nullable|file|mimes:pdf,jpeg,png,jpg|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $email = strtolower($request->email);
        $existingUser = User::where('email', $email)->first();

        // 2. Role Check for Seller
        if ($existingUser && $existingUser->hasRole('seller')) {
            return response()->json([
                'errors' => ['email' => ['This email address is already registered as a seller.']]
            ], 422);
        }

        // --- FILE 1: PROFILE IMAGE UPLOADING LOGIC ---
        $profileImagePath = null;
        if ($request->hasFile('profilePhoto')) {
            $file = $request->file('profilePhoto');
            $filename = time() . '_profile_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/profile'), $filename);
            $profileImagePath = 'uploads/profile/' . $filename;
        }

        // --- FILE 2: BUSINESS LICENSE UPLOADING LOGIC ---
        $businessLicensePath = null;
        if ($request->hasFile('businessLicense')) {
            $file = $request->file('businessLicense');
            $filename = time() . '_license_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/licenses'), $filename);
            $businessLicensePath = 'uploads/licenses/' . $filename;
        }

        if ($existingUser) {
            // User exists as Buyer only -> Attach shop info & assign 'seller' role
            $existingUser->update([
                'phone_number'     => $request->phoneNumber ?? $existingUser->phone_number,
                'gender'           => $request->gender ?? $existingUser->gender,
                'location'         => $request->location ?? $existingUser->location,
                'shop_name'        => $request->shopName ?? $existingUser->shop_name,
                'start_time'       => $request->startTime ? date("H:i:s", strtotime($request->startTime)) : $existingUser->start_time,
                'end_time'         => $request->endTime ? date("H:i:s", strtotime($request->endTime)) : $existingUser->end_time,
                'shop_description' => $request->shopDescription ?? $existingUser->shop_description,
                'profile_image'    => $profileImagePath ?? $existingUser->profile_image,
                'business_license' => $businessLicensePath ?? $existingUser->business_license,
            ]);

            $existingUser->assignRole('seller');

            return response()->json([
                'message'  => 'Your existing buyer account has been upgraded to a seller account! Please login.',
                'redirect' => '/login',
            ], 200);
        }

        // 3. Completely New Seller
        $user = User::create([
            'name'             => $request->fullName,
            'email'            => $email,
            'password'         => Hash::make($request->password),
            'gender'           => $request->gender,
            'phone_number'     => $request->phoneNumber,
            'location'         => $request->location,
            'shop_name'        => $request->shopName,
            'start_time'       => $request->startTime ? date("H:i:s", strtotime($request->startTime)) : null,
            'end_time'         => $request->endTime ? date("H:i:s", strtotime($request->endTime)) : null,
            'shop_description' => $request->shopDescription,
            'profile_image'    => $profileImagePath,
            'business_license' => $businessLicensePath,
        ]);

        $user->assignRole(['buyer', 'seller']);

        return response()->json([
            'message'  => 'Seller registration successful! Please login.',
            'redirect' => '/login',
        ], 201);
    }

    /**
     * 3. LOGIN LOGIC WITH ADMIN REDIRECT SUPPORT
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt(['email' => strtolower($request->email), 'password' => $request->password])) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        $user = User::findOrFail(Auth::id());
        $token = $user->createToken('auth_token')->plainTextToken;
        $roles = $user->getRoleNames()->toArray();

        // Updated Match Expression: Prioritizes Admin first
        $redirectTo = match (true) {
            in_array('admin', $roles, true)  => '/admin/dashboard',
            count($roles) > 1                 => '/select-role',
            in_array('buyer', $roles, true)  => '/buyer/dashboard',
            in_array('seller', $roles, true) => '/seller/dashboard',
            default                          => '/login',
        };

        return response()->json([
            'message'      => 'Login successful',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'roles'        => $roles,
            'redirect_to'  => $redirectTo,
            'user'         => [
                'id'            => $user->id,
                'name'          => $user->name,
                'email'         => $user->email,
                'role'          => $roles[0] ?? 'buyer', // Primary role
                'shop_name'     => $user->shop_name,
                'profile_image' => $user->profile_image ? asset($user->profile_image) : null,
            ],
        ]);
    }

    public function profile(Request $request)
    {
        return response()->json([
            'user'  => $request->user(),
            'roles' => $request->user()->getRoleNames(),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
