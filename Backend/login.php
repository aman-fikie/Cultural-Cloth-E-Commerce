<?php
// 1. Include the database connection (this also loads CORS headers)
require_once 'db.php';

// 2. Start a secure session
// We set session cookie options to make sure they are secure
session_set_cookie_params([
    'lifetime' => 86400, // 1 day in seconds
    'path' => '/',
    'domain' => '', // Default local domain
    'secure' => false, // Set to true if using HTTPS in production
    'httponly' => true, // Prevents JavaScript from reading the session cookie (XSS protection)
    'samesite' => 'Lax'
]);
session_start();

// 3. Receive the raw JSON payload from React's Axios post request
$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

// 4. Extract and sanitize credentials
$email    = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

// 5. Validation: Check if fields are empty
if (empty($email) || empty($password)) {
    http_response_code(400); // Bad Request
    echo json_encode([
        "success" => false, 
        "message" => "Please enter both email and password."
    ]);
    exit();
}

// 6. Find User in MySQL by Email (Using Prepared Statements)
$query = "SELECT id, full_name, email, password, gender, phone_number, location, 
                 shop_name, business_license, profile_photo, start_time, end_time, shop_description 
          FROM users 
          WHERE email = ? 
          LIMIT 1";

$stmt = $conn->prepare($query);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error occurred."]);
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// 7. Check if user exists
if ($result->num_rows === 0) {
    http_response_code(401); // Unauthorized
    echo json_encode([
        "success" => false, 
        "message" => "Invalid email or password." // Generic message for security
    ]);
    $stmt->close();
    exit();
}

// Fetch the user data array
$user = $result->fetch_assoc();
$stmt->close();

// 8. Verify Hashed Password
if (!password_verify($password, $user['password'])) {
    http_response_code(401); // Unauthorized
    echo json_encode([
        "success" => false, 
        "message" => "Invalid email or password."
    ]);
    exit();
}

// 9. Credentials are correct! Save user ID in the PHP Session
$_SESSION['user_id'] = $user['id'];
$_SESSION['logged_in'] = true;

// 10. Clean up password from the user array before sending it to React (Security Best Practice)
unset($user['password']);

// 11. Send back a successful JSON response containing complete user details
http_response_code(200); // OK
echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user" => $user
]);

$conn->close();