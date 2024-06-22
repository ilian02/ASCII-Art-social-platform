<?php
    session_start();

    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        //echo json_encode(array('status' => 'success', 'message' => 'bruh'));
        
        $pic_id = (isset($_GET['pic_id'])) ? $_GET['pic_id'] : ''; 

        if ($pic_id) {
            echo json_encode(array('status' => 'success', 'message' => $pic_id));
        } else {
            echo json_encode(array('status' => 'success', 'message' => 'nice'));
        }
    }
    
?>