<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

if (!isLoggedIn()) {
    sendJSON(['error' => 'Unauthorized'], 401);
}

session_destroy();
sendJSON(['success' => true]);
