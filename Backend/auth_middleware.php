<?php
// Prevent raw execution
if (basename(__FILE__) == basename($_SERVER['SCRIPT_FILENAME'])) {
    header("HTTP/1.1 403 Forbidden");
    exit("Access Denied");
}

/**
 * Checks if a session is valid and active.
 * Returns the logged-in user's ID or exits with 401 Unauthorized.
 */
function require_auth() {
    // Start session if not already started
    if (session_status() === PHP_SESSION_NONE) {
        // Set secure cookie attributes
        session_set_cookie_params([
            'lifetime' => 86400,
            'path' => '/',
            'domain' => 'localhost',
            'secure' => false, // Set to true if utilizing HTTPS in production
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        session_start();
    }

    // Check if our authentication key is set
    if (!isset($_SESSION['user_id'])) {
        header('Content-Type: application/json');
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode([
            "success" => false,
            "message" => "Unauthorized: No active session found. Please log in."
        ]);
        exit;
    }

    return $_SESSION['user_id'];
}