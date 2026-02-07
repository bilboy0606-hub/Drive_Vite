<?php
require_once __DIR__ . '/../config.php';

if (!isLoggedIn()) {
    sendJSON(['error' => 'Unauthorized'], 401);
}

$path = $_GET['path'] ?? '/';
$userId = getCurrentUserId();

try {
    // Get folders
    $stmt = $pdo->prepare("SELECT id, folder_name, parent_path, created_at FROM folders WHERE user_id = ? AND parent_path = ? ORDER BY folder_name");
    $stmt->execute([$userId, $path]);
    $folders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get files
    $stmt = $pdo->prepare("SELECT id, file_name as name, file_size as size, mime_type, uploaded_at, folder FROM files WHERE user_id = ? AND folder = ? ORDER BY uploaded_at DESC");
    $stmt->execute([$userId, $path]);
    $files = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get used space
    $stmt = $pdo->prepare("SELECT SUM(file_size) as total FROM files WHERE user_id = ?");
    $stmt->execute([$userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $usedSpace = $result['total'] ?? 0;

    sendJSON([
        'folders' => $folders,
        'files' => $files,
        'usedSpace' => $usedSpace,
        'totalSpace' => 15 * 1024 * 1024 * 1024
    ]);
} catch(Exception $e) {
    sendJSON(['error' => 'Failed to list content'], 500);
}
