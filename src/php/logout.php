<?php
    session_start();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        session_unset();
        session_destroy();

    }
?>