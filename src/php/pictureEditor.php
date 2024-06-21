<?php
    session_start();

    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        
        $data = $_GET['param'];

        if ($parametres['pic_name']) {
            echo json_encode(array('status' => 'success', 'message' => 'bruh'));
        } else {
            echo json_encode(array('status' => 'success', 'message' => 'nice'));
        }
    }
    
?>