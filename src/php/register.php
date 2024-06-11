<?php
    require_once 'testInputUtility.php';
    require_once 'user.php';

    header('Content-Type', 'application/json');

    $server_errors = [];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $userData = isset($_POST['data']) ? json_decode($_POST['data'], true) : '';
    } else {
        $server_errors[] = 'Invalid request';
    }

    if ($server_errors) {
        http_response_code(500);
        echo json_encode($server_errors);
    } 
    else {
        http_response_code(200);
        echo json_encode('Success');
    }
?>