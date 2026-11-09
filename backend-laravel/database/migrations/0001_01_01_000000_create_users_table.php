<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->enum('role', ['buyer', 'seller', 'admin'])->default('buyer');
            // Shared & Seller fields (nullable for pure buyers)
            $table->string('gender')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('location')->nullable();
            $table->string('shop_name')->nullable();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->text('shop_description')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('business_license')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
