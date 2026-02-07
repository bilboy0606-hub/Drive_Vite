<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

if (!isLoggedIn()) {
    sendJSON(['error' => 'Unauthorized'], 401);
}

$input = getInput();
$folderName = trim($input['folderName'] ?? '');
$parentPath = $input['parentPath'] ?? '/';
$userId = getCurrentUserId();

if (empty($folderName)) {
    sendJSON(['error' => 'Folder name required'], 400);
}

try {
    $stmt = $pdo->prepare("INSERT INTO folders (user_id, folder_name, parent_path, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$userId, $folderName, $parentPath]);
    $folderId = $pdo->lastInsertId();

    sendJSON(['success' => true, 'folder_id' => $folderId]);
} catch(Exception $e) {
    sendJSON(['error' => 'Failed to create folder'], 500);
}
