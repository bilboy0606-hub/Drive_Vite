<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

if (!isLoggedIn()) {
    sendJSON(['error' => 'Unauthorized'], 401);
}

if (empty($_FILES['file']) || !isset($_POST['folder'])) {
    sendJSON(['error' => 'File and folder required'], 400);
}

$userId = getCurrentUserId();
$file = $_FILES['file'];
$folder = $_POST['folder'];
$maxSize = 5 * 1024 * 1024 * 1024; // 5GB

if ($file['size'] > $maxSize) {
    sendJSON(['error' => 'File too large'], 400);
}

try {
    // Get user folder name
    $stmt = $pdo->prepare("SELECT folder_name FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        sendJSON(['error' => 'User not found'], 404);
    }

    // Create upload directory
    $uploadDir = __DIR__ . '/../uploads/' . $user['folder_name'];
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Generate unique filename
    $filename = time() . '_' . bin2hex(random_bytes(8)) . '_' . basename($file['name']);
    $filepath = $uploadDir . '/' . $filename;

    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        sendJSON(['error' => 'Failed to move file'], 500);
    }

    // Save to database
    $stmt = $pdo->prepare("INSERT INTO files (user_id, file_name, file_path, file_size, mime_type, folder, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
    $stmt->execute([
        $userId,
        $file['name'],
        '/uploads/' . $user['folder_name'] . '/' . $filename,
        $file['size'],
        $file['type'],
        $folder
    ]);

    $fileId = $pdo->lastInsertId();

    sendJSON(['success' => true, 'file_id' => $fileId]);
} catch(Exception $e) {
    sendJSON(['error' => 'Upload failed: ' . $e->getMessage()], 500);
}
