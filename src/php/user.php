<?php
    require_once "database.php";

    class User {
        private $username;
        private $password;
        private $email;
        private $userId;

        private $db;

        public function __construct($username, $password) {
            $this->username = $username;
            $this->password = $password;

            $this->db = new Database();
        }

        public function getUsername() {
            return $this->username;
        }

        public function getEmail() {
            return $this->email;
        }

        public function getUserId() {
            return $this->userId;
        }

        public function exists() {
            $userResult = $this->db->selectUserQuery(['username' => $this->username]);

            if ($userResult["success"]) {
                $user = $userResult["data"]->fetch();

                return ['success' => true, 'data' => $user];
            }

            return $userResult;
        }

        public function isValid($password, $passwordHash) {
            return password_verify($password, $passwordHash);
        }

        public function createUser($passwordHash, $email) {
            $result = $this->db->insertUserQuery(['username' => $this->username, 'password' => $passwordHash, 'email' => $email]);
        }

        public function getUserById($userId) {
            return $this->db->selectUserByIdQuery(['id' => $userId])['data']->fetch();
        }
    }
?>