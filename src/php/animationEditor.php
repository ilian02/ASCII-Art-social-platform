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
    
        // Adding function to click an animation from your gallery and edit it
        $animation_id = (isset($_GET['animation_id'])) ? $_GET['animation_id'] : ''; 
        if ($animation_id) {  
            $animation_data = $db->getAnimationById($animation_id);
            $animation_frames = $db->getFramesByAnimationId($animation_id);
            echo json_encode(array('status' => 'success', 'message' => "Editing older animation", 'animation_data' => $animation_data, 'frames' => $animation_frames, 'logged' => true));
        } else {
            echo json_encode(array('status' => 'success', 'message' => 'creating new image', 'logged' => true));
        }

    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $pictureData = json_decode(file_get_contents("php://input"), true);
        
        $width = $pictureData['width'];
        $height = $pictureData['height'];
        $content = $pictureData['content'];
        $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Anon';
        $title = $pictureData['title'];

        $user_id = $db->getUserIdByUsername($username);
        $new_animation_id = $db->createNewAnimation($user_id, $width, $height, $content, $title);

        echo json_encode(array('status' => 'success', 'message' => 'created new animation', 'animation_id' => $new_animation_id));
        
    } else if ($_SERVER['REQUEST_METHOD'] === 'UPDATE') {
        
        $pictureData = json_decode(file_get_contents("php://input"), true);

        // ADD CHECK IF CURRENT SESSION LOGGED IS THE SAME AS THE PIC AUTHOR

        
        $width = $pictureData['width'];
        $height = $pictureData['height'];
        $content = $pictureData['content'];
        $pic_id = $pictureData['animation_id'];
        

        $user_id = $db->getUserIdByUsername($_SESSION['username']);
        $db->updateAnimationById($title, $width, $height, $content, $pic_id);
        
        echo json_encode(array('status' => 'success', 'message' => 'updated'));
    } 
    
?>