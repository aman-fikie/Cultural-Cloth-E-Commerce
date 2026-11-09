<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Support\Facades\Route;

// Public Auth Routes
Route::post('/register/buyer', [AuthController::class, 'registerBuyer']);
Route::post('/register/seller', [AuthController::class, 'registerSeller']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Buyer Routes
    Route::middleware('role:buyer')->prefix('buyer')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Welcome to the Buyer Dashboard']);
        });
    });

    // Seller Routes
    Route::middleware('role:seller')->prefix('seller')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Welcome to the Seller Dashboard']);
        });
    });

    // Admin Routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/stats', [AdminController::class, 'stats']);
        Route::get('/sellers', [AdminController::class, 'sellers']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    });
});
