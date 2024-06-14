<?php

    require_once('database.php');

    header('Content-Type: application/json');

    $errors = [];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $userData = json_decode(file_get_contents("php://input"), true);

        if ($userData === null && json_last_error() !== JSON_ERROR_NONE) {
            $result = array('status' => 'error', 'message' => 'Invalid JSON data');
        }

        if ($userData['username'] == "") {
            $errors[] = ["error" => 'Полето потребителското име е празно'];
        }
        
        if ($userData['email'] == "") {
            $errors[] = ["error" => 'Полето имейл е празно'];

        }

        if ($userData['password'] == "") {
            $errors[] = ["error" => 'Полето парола е празно'];

        }

        if ($userData['confirm_password'] == "") {
            $errors[] = ["error" => 'Полето потвърждаване на парола е празно'];
        }

        if ($errors) {
            echo json_encode(array('status' => 'unsuccessful', 'message' => $errors));
        } else {
            //echo json_encode(array('status' => 'success', 'message' => 'Validation is fine'));

            try {
                $db = new DB();
                $conn = $db->getConnection();
                
                $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
                $stmt = $conn->prepare($sql);
                $stmt->execute([$userData['username'], $userData['email']]);

                if ($stmt->rowCount() > 0) {
                    $errors[] = "Потребителското име или имейл вече съществуват";
                    echo json_encode(array('status' => 'unsuccessful', 'message' => $errors));

                } else {

                    $sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
                    $stmt = $conn->prepare($sql);
                    $userData["password"] = password_hash($userData["password"], PASSWORD_DEFAULT);
                    $stmt->execute([$userData['username'], $userData['email'], $userData['password']]);

                    $sql = "SELECT * FROM users WHERE username = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute([$userData['username']]);
                    $user_id = $stmt->fetch(PDO::FETCH_ASSOC)['id'];
                    echo json_encode(array('status' => 'success', 'message' => 'Акаунта е създаден', 'user_id' => $user_id));
                }
    
            }catch(PDOException $err) {
                echo json_encode(array('status' => 'unsuccessful', 'message' => 'Тъмна магия е покварила този код'));
                http_response_code(500);
            }
        }

    } else {
        return ['status' => 'error'];
    }
?>