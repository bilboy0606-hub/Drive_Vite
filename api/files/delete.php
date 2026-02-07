<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

if (!isLoggedIn()) {
    sendJSON(['error' => 'Unauthorized'], 401);
}

$fileId = $_GET['id'] ?? null;
$userId = getCurrentUserId();

if (!$fileId) {
    sendJSON(['error' => 'File ID required'], 400);
}

try {
    // Get file info
    $stmt = $pdo->prepare("SELECT file_path FROM files WHERE id = ? AND user_id = ?");
    $stmt->execute([$fileId, $userId]);
    $file = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$file) {
        sendJSON(['error' => 'File not found'], 404);
    }

    // Delete file from filesystem
    $filePath = __DIR__ . '/..' . $file['file_path'];
    if (file_exists($filePath)) {
        unlink($filePath);
    }

    // Delete from database
    $stmt = $pdo->prepare("DELETE FROM files WHERE id = ? AND user_id = ?");
    $stmt->execute([$fileId, $userId]);

    sendJSON(['success' => true]);
} catch(Exception $e) {
    sendJSON(['error' => 'Delete failed'], 500);
}
