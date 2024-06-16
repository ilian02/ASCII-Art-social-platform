<?php

    // require_once('database.php');

    header('Content-Type: application/json');

    session_start();

    $errors = [];


    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_SESSION) && isset($_SESSION['username'])) {
            echo json_encode(array('status' => 'success', 'isLogged' => true, 'username' => $_SESSION['username']));
            return;
        } else {
            echo json_encode(array('status' => 'success', 'isLogged' => false));
            return;
        }


    } else {
        return ['status' => 'error'];
    }
?>