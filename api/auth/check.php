<?php
require_once __DIR__ . '/config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    sendJSON(['logged_in' => false], 401);
}

sendJSON(['logged_in' => true]);
