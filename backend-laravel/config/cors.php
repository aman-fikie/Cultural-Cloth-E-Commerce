<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // This pulls your http://localhost:5173 straight from the .env file
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')], 

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // CRITICAL FIX: Turn this from false to true
    'supports_credentials' => true, 
];
