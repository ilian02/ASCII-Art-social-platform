<?php

    require_once('database.php');

    header('Content-Type: application/json');

    session_start();

    $db = new DB();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_SESSION) && isset($_SESSION['username'])) {

            $user_id = $db->getUserIdByUsername($_SESSION['username']);
            $own_pictures = $db->getUserPicturesById($user_id);

            
            $own_animations = $db->getAnimationsByUserId($user_id);

            $animations_to_send = [];

            
            foreach($own_animations as $animation) {
                $animation['username'] = $db->getUsernameById($animation['artist_id']);
                $animation['frames'] = $db->getFramesByAnimationId($animation['id']);
                $animations_to_send[] = $animation;
            }
                

            echo json_encode(array('status' => 'success', 'isLogged' => true, 'username' => $_SESSION['username'], 'pictures' => $own_pictures, 'animations' => $animations_to_send));
            return;
        } else {
            echo json_encode(array('status' => 'success', 'isLogged' => false));
            return;
        }

    } else {
        return ['status' => 'error', 'message' => 'unsupported request'];
    }
?>