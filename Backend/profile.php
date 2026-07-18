<?php
// Include CORS and DB Connections
require_once 'db.php'; 
require_once 'auth_middleware.php';

// Enforce Session Authentication
$userId = require_auth();

try {
    // Use a prepared statement to prevent SQL injection
    $stmt = $conn->prepare("
        SELECT id, full_name, email, phone_number, gender, location, 
               shop_name, start_time, end_time, shop_description, 
               profile_photo, business_license, created_at 
        FROM users 
        WHERE id = ?
    ");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Remove sensitive columns (like password hashes) before returning
        unset($user['password']);

        header('Content-Type: application/json');
        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $user['id'],
                "full_name" => $user['full_name'],
                "email" => $user['email'],
                "phone" => $user['phone_number'],
                "gender" => ucfirst($user['gender']),
                "location" => $user['location'],
                "shop_name" => $user['shop_name'],
                "start_time" => $user['start_time'],
                "end_time" => $user['end_time'],
                "shop_description" => $user['shop_description'],
                "profile_image" => $user['profile_photo'] ? "uploads/" . basename($user['profile_photo']) : null,
                "business_license" => $user['business_license'] ? "uploads/" . basename($user['business_license']) : null,
                "created_at" => $user['created_at']
            ]
        ]);
    } else {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(["success" => false, "message" => "User record not found."]);
    }
    $stmt->close();

} catch (Exception $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(["success" => false, "message" => "Database query failed."]);
}