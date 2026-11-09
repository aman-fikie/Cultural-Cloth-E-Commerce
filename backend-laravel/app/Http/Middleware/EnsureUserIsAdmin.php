<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated and has the admin role via Spatie
        if (!$request->user() || !$request->user()->hasRole('admin')) {
            return response()->json([
                'message' => 'Forbidden. Admin credentials required.'
            ], 403);
        }

        return $next($request);
    }
}
