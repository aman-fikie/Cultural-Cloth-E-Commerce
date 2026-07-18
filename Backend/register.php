<?php
// 1. Include the database connection (this also loads CORS headers)
require_once 'db.php';

// 2. We are accepting both JSON data or multipart/form-data (for file uploads)
// When uploading files in React, we use FormData, which sends variables in the standard $_POST array.
$fullName        = $_POST['fullName'] ?? '';
$email           = $_POST['email'] ?? '';
$password        = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';
$gender          = $_POST['gender'] ?? '';
$phoneNumber     = $_POST['phoneNumber'] ?? '';
$location        = $_POST['location'] ?? '';
$shopName        = $_POST['shopName'] ?? null;
$startTime       = $_POST['startTime'] ?? null;
$endTime         = $_POST['endTime'] ?? null;
$shopDescription = $_POST['shopDescription'] ?? null;

// 3. Validation: Check required fields
if (empty($fullName) || empty($email) || empty($password) || empty($confirmPassword) || empty($gender) || empty($phoneNumber) || empty($location)) {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "All required fields must be filled."]);
    exit();
}

// 4. Validation: Check if passwords match
if ($password !== $confirmPassword) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Passwords do not match."]);
    exit();
}

// 5. Validation: Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit();
}

// 6. Check if Email Already Exists (Using Prepared Statements)
$checkEmailQuery = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($checkEmailQuery);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    http_response_code(409); // Conflict
    echo json_encode(["success" => false, "message" => "An account with this email already exists."]);
    $stmt->close();
    exit();
}
$stmt->close();

// 7. Secure Password Hashing
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// 8. File Upload Configuration
$uploadDir = "uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true); // Create folder if it doesn't exist
}

$businessLicensePath = null;
$profilePhotoPath = null;
$allowedExtensions = ['pdf', 'png', 'jpeg', 'jpg'];
$maxFileSize = 5 * 1024 * 1024; // 5 Megabytes in bytes

// Helper function to validate and move uploaded files
/**
 * Validates and moves an uploaded file safely.
 *
 * @param string $fileKey            The key name in the $_FILES superglobal array.
 * @param string $uploadDir          The directory path where the file should be saved.
 * @param array  $allowedExtensions  List of permitted file extensions (e.g., ['pdf', 'png']).
 * @param int    $maxFileSize        The maximum allowed file size in bytes.
 * @return string|null               Returns the relative path to the file on success, or null if no file was uploaded.
 */
function processUpload(string $fileKey, string $uploadDir, array $allowedExtensions, int $maxFileSize): ?string {
    // Check if a file was actually uploaded under this key
    if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES[$fileKey];
        
        // Extract file properties securely
        $fileSize = (int)$file['size'];
        $fileTmp  = (string)$file['tmp_name'];
        $fileName = basename((string)$file['name']);
        $fileExt  = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // 1. Validate File Size
        if ($fileSize > $maxFileSize) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "File " . $fileKey . " exceeds the 5MB size limit."]);
            exit();
        }

        // 2. Validate File Type
        if (!in_array($fileExt, $allowedExtensions, true)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Invalid file format for " . $fileKey . ". Only PDF, PNG, JPEG allowed."]);
            exit();
        }

        // 3. Generate a secure, unique name to prevent collisions
        $newFileName = uniqid($fileKey . "_", true) . "." . $fileExt;
        $destination = $uploadDir . $newFileName;

        // 4. Move file from temporary directory to destination
        if (move_uploaded_file($fileTmp, $destination)) {
            return $destination;
        }
    }
    
    // Return null if the file was optional and not uploaded
    return null;
}

// Process files if provided
$businessLicensePath = processUpload('businessLicense', $uploadDir, $allowedExtensions, $maxFileSize);
$profilePhotoPath = processUpload('profilePhoto', $uploadDir, $allowedExtensions, $maxFileSize);

// 9. Insert Record into Database using secure Prepared Statement
$insertQuery = "INSERT INTO users (
    full_name, email, password, gender, phone_number, location, 
    shop_name, business_license, profile_photo, start_time, end_time, shop_description
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$insertStmt = $conn->prepare($insertQuery);

// Bind variables (s = string)
$insertStmt->bind_param(
    "ssssssssssss", 
    $fullName, 
    $email, 
    $hashedPassword, 
    $gender, 
    $phoneNumber, 
    $location, 
    $shopName, 
    $businessLicensePath, 
    $profilePhotoPath, 
    $startTime, 
    $endTime, 
    $shopDescription
);

if ($insertStmt->execute()) {
    http_response_code(201); // 201 Created
    echo json_encode([
        "success" => true,
        "message" => "Registration successful"
    ]);
} else {
    http_response_code(500); // Server Error
    echo json_encode([
        "success" => false,
        "message" => "Error occurred while creating your account. Please try again."
    ]);
}

$insertStmt->close();
$conn->close();