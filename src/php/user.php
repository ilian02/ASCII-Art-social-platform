<?php
    require_once "database.php";

    class User {
        private $username;
        private $password;
        private $email;
        private $userId;

        private $db;

        public function __construct($username, $password, $email) {
            $this->username = $username;
            $this->password = $password;
            $this->email = $email;

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
        
    }
?>