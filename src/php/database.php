<?php

class Database {
    private $connection;
    private $selectUser;
    private $selectUserById;
    private $insertUser;


    public function __construct() {
        $config = parse_ini_file('../config/config.ini', true);

        $type = $config['db']['db_type'];
        $host = $config['db']['host'];
        $name = $config['db']['db_name'];
        $user = $config['db']['user'];
        $password = $config['db']['password'];

        $this->init($type, $host, $name, $user, $password);
    }

    private function init($type, $host, $name, $user, $password) {
        try {
            $this->connection = new PDO("$type:host=$host;dbname=$name", $user, $password,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

            $this->prepareStatements();
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    private function prepareStatements() {

        $sql = "SELECT * FROM users WHERE username = :username";
        $this->selectUser = $this->connection->prepare($sql);

        $sql = "SELECT * FROM users WHERE id=:id";
        $this->selectUserById = $this->connection->prepare($sql);

        $sql = "INSERT INTO users(username, password, email) VALUES (:username, :password, :email)";
        $this->insertUser = $this->connection->prepare($sql);

    }

    public function selectUserQuery($data) {
        try {
            // ["user" => "..."]
            $this->selectUser->execute($data);

            return ["success" => true, "data" => $this->selectUser];
        } catch(PDOException $e) {
            return ["success" => false, "error" => $e->getMessage()];
        }
    }

    public function insertUserQuery($data) {
        try {
            $this->insertUser->execute($data);

            return ["success" => true];
        } catch(PDOException $e) {
            $this->connection->rollBack();
            return ["success" => false, "error" => "Connection failed: " . $e->getMessage()];
        }
    }

    public function selectUserByIdQuery($data) {
        try{
            $this->selectUserById->execute($data);

            return array("success" => true, "data" => $this->selectUserById);
        } catch(PDOException $e){
            echo "Connection failed: " . $e->getMessage();

            return array("success" => false, "error" => $e->getMessage());
        }
    }

    function __destruct() {
        $this->connection = null;
    }
}