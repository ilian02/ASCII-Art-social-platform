<?php

    session_start();

    require_once('database.php');
    require_once('picture.php');

    header('Content-Type: application/json');


    $db = new DB();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        if (!isset($_SESSION) || !isset($_SESSION['username'])) {
            echo json_encode(array('status' => 'unsuccessful', 'message' => "user is not logged in", 'error' => 'user not logged in', 'logged' => false));
            return;
        }
    
        $pic_id = (isset($_GET['pic_id'])) ? $_GET['pic_id'] : ''; 
        if ($pic_id) {  
            $pic_data = $db->getPictureById($pic_id);
            //echo json_encode(array('status' => 'success', 'message' => $pic_id, 'logged' => true));
            echo json_encode(array('status' => 'success', 'message' => $pic_id, 'pic_data' => $pic_data, 'logged' => true));
        } else {
            echo json_encode(array('status' => 'success', 'message' => 'creating new image', 'logged' => true));
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $pictureData = json_decode(file_get_contents("php://input"), true);
        
        $width = $pictureData['width'];
        $height = $pictureData['height'];
        $content = $pictureData['content'];
        $title = $pictureData['title'];
        
        $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Anon';

        $user_id = $db->getUserIdByUsername($username);
        $new_pic_id = $db->createNewPicture($user_id, $content, $width, $height, $title);
        echo json_encode(array('status' => 'success', 'message' => 'hello', 'pic_id' => $new_pic_id));
        
    } else if ($_SERVER['REQUEST_METHOD'] === 'UPDATE') {
        
        $pictureData = json_decode(file_get_contents("php://input"), true);

        // ADD CHECK IF CURRENT SESSION LOGGED IS THE SAME AS THE PIC AUTHOR

        $width = $pictureData['width'];
        $height = $pictureData['height'];
        $content = $pictureData['content'];
        $pic_id = $pictureData['pic_id'];
        $title = $pictureData['title'];

        $user_id = $db->getUserIdByUsername($_SESSION['username']);
        $db->updatePictureById($pic_id, $content, $width, $height, $title);
        
        echo json_encode(array('status' => 'success', 'message' => $width));
    } 
    
?>