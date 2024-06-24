<?php

    session_start();

    require_once('database.php');
    require_once('picture.php');

    header('Content-Type: application/json');

    $db = new DB();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $pic_id = (isset($_GET['pic_id'])) ? $_GET['pic_id'] : ''; 
        if ($pic_id) {  
            // $pic_data = $db->getPictureById($pic_id);
            echo json_encode(array('status' => 'success', 'message' => $pic_id, 'pic_data' => $pic_data));
        } else {
            echo json_encode(array('status' => 'success', 'message' => 'nice'));
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $pictureData = json_decode(file_get_contents("php://input"), true);

        $width = $pictureData['width'];
        $height = $pictureData['height'];
        $content = $pictureData['content'];

        $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Anon';

        $user_id = $db->getUserIdByUsername($username);
        $new_pic_id = $db->createNewPicture($user_id, $content, $width, $height);
        echo json_encode(array('status' => 'success', 'message' => $new_pic_id));
        
    }/* else if ($_SERVER['REQUEST_METHOD'] === 'UPDATE') {
        
        $pictureData = json_decode(file_get_contents("php://input"), true);

        // ADD CHECK IF CURRENT SESSION LOGGED IS THE SAME AS THE PIC AUTHOR

        $width = $pictureData['width'];
        $height = $pictureData['height'];
        $content = $pictureData['content'];
        $pic_id = $pictureData['pic_id'];

        $user_id = $db->getUserIdByUsername($_SESSION['username']);
        $db->updateNewPictureById($pic_id, $content, $width, $height);
        echo json_encode(array('status' => 'success', 'message' => 'updated picture'));
    }   */
    
?>