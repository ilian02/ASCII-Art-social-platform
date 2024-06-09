<?php

class Database {
    private $connection;


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

            // $this->prepareStatements();
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

}