<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

$input = getInput();
$username = trim($input['username'] ?? '');
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (empty($username) || empty($email) || empty($password)) {
    sendJSON(['error' => 'All fields required'], 400);
}

try {
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
    $stmt->execute([$email, $username]);
    if ($stmt->fetch()) {
        sendJSON(['error' => 'Email or username already exists'], 409);
    }

    // Create user
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $folderName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $username) . '_' . uniqid();

    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, folder_name) VALUES (?, ?, ?, ?)");
    $stmt->execute([$username, $email, $hashedPassword, $folderName]);
    $userId = $pdo->lastInsertId();

    // Create user directory
    $uploadDir = __DIR__ . '/../uploads/' . $folderName;
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Set session
    $_SESSION['user_id'] = $userId;
    $_SESSION['username'] = $username;
    $_SESSION['email'] = $email;

    sendJSON(['success' => true, 'user' => [
        'id' => $userId,
        'username' => $username,
        'email' => $email
    ]]);
} catch(Exception $e) {
    sendJSON(['error' => 'Registration failed: ' . $e->getMessage()], 500);
}
