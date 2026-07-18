<?php
// 1. Configure CORS (Cross-Origin Resource Sharing)
// This allows your React frontend (running on port 5173) to securely communicate with this PHP backend.

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// 2. Handle preflight (OPTIONS) requests
// Browsers send an OPTIONS request before sending POST requests to verify permissions. 
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3. Database Credentials
$host = "localhost";
$db_user = "root";       // Default XAMPP username
$db_pass = "";           // Default XAMPP password is empty
$db_name = "cultural_clothing_db";

// 4. Establish mysqli connection
// We use object-oriented mysqli for speed and simplicity.
$conn = new mysqli($host, $db_user, $db_pass, $db_name);

// 5. Check Connection & Handle Errors Gracefully
if ($conn->connect_error) {
    // Send a 500 Internal Server Error header
    http_response_code(500);
    
    // Return a clean JSON response instead of a raw PHP crash error
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed. Please try again later."
    ]);
    exit(); // Stop script execution
}

// 6. Set Charset to support all characters (emojis, cultural accents, symbols)
$conn->set_charset("utf8mb4");