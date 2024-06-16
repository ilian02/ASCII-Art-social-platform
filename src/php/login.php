<?php

    require_once('database.php');

    header('Content-Type: application/json');

    $errors = [];

    session_start();


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $userData = json_decode(file_get_contents("php://input"), true);

        if ($userData === null && json_last_error() !== JSON_ERROR_NONE) {
            $error[] = array('status' => 'error', 'message' => 'Invalid JSON data');
        }

        if ($userData['email'] == "") {
            $errors[] = ["error" => 'Полето имейл е празно'];
        }

        if ($userData['password'] == "") {
            $errors[] = ["error" => 'Полето парола е празно'];
        }

        if ($errors) {
            echo json_encode(array('status' => 'unsuccessful', 'message' => $errors));
            return;
        } else {
            try {
                $db = new DB();
                $conn = $db->getConnection();
                
                $sql = "SELECT * FROM users WHERE email = ?";
                $stmt = $conn->prepare($sql);
                $stmt->execute([$userData['email']]);

                $userWithThisEmail = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

                $isSamePassword = password_verify($userData['password'], $userWithThisEmail['password']);
                

                if ($isSamePassword) {
                    if (isset($_SESSION)) {
                        $_SESSION['username'] = $userWithThisEmail['username'];
                    }
                    echo json_encode(array('status' => 'success', 'message' => 'You were logged in', 'username' => $userWithThisEmail['username']));
                    return;
                } else {
                    echo json_encode(array('status' => 'unsuccessful', 'message' => 'No such user found'));
                    return;
                }
    
            }catch(PDOException $err) {
                echo json_encode(array('status' => 'unsuccessful', 'message' => 'Тъмна магия е покварила този код'));
                http_response_code(500);
                return;
            }
        }

    } else {
        return ['status' => 'error'];
    }
?>