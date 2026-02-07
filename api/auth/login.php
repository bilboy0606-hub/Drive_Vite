<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

$input = getInput();
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    sendJSON(['error' => 'Email and password required'], 400);
}

try {
    $stmt = $pdo->prepare("SELECT id, username, email, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        sendJSON(['error' => 'Invalid credentials'], 401);
    }

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];

    sendJSON(['success' => true, 'user' => [
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email']
    ]]);
} catch(Exception $e) {
    sendJSON(['error' => 'Login failed'], 500);
}
