<?php

    require_once('database.php');

    header('Content-Type: application/json');

    session_start();

    $db = new DB();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_SESSION) && isset($_SESSION['username'])) {

            //$user_id = $db->getUserIdByUsername($_SESSION['username']);
            // $own_posts = $db->getUserPicturesById($user_id);
            echo json_encode(array('status' => 'success', 'isLogged' => true, 'username' => $_SESSION['username']));
            return;
        } else {
            echo json_encode(array('status' => 'success', 'isLogged' => false));
            return;
        }

    } else {
        return ['status' => 'error', 'message' => 'unsupported request'];
    }
?>