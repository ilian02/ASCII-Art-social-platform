<?php
    session_start();

    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        
        echo json_encode(array('status' => 'success', 'message' => 'nice'));
    }
    
?>