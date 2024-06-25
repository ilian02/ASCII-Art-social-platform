<?php
    require_once('database.php');

    header('Content-Type: application/json');

    session_start();

    const PAGE_SIZE = 5;

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        $page_number = isset($_GET['page']) ? $_GET['page'] : 1;


        $posts = get_page($page_number);

        echo json_encode(array('status' => 'success', 'posts' => $posts, 'message' => $page_number));
    }


    function get_page($page_number) {

        $db = new DB();
        $posts = $db->getPictures();

        $start_index = ($page_number - 1) * PAGE_SIZE;
        $posts_for_page = array_slice($posts, $start_index, PAGE_SIZE);

        $to_send = [];

        foreach($posts_for_page as $post) {
            $post['username'] = $db->getUsernameById($post['artist_id']);
            $to_send[] = $post;
        }
        
        return $to_send;
    }
?>