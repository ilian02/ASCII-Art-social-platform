<?php
    require_once('database.php');

    header('Content-Type: application/json');

    session_start();


    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        $page_number = isset($_GET['page']) ? $_GET['page'] : 1;


        $posts = get_page($page_number);

        echo json_encode(array('status' => 'success', 'posts' => $posts, 'message' => 'loaded posts'));
    }


    function get_page($page_number) {

        $posts = ['pic1', 'pic2', 'pic3'];

        return $posts;
    }
?>