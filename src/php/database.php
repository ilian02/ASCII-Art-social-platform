<?php


class DB {
    private $connection;


    public function __construct() {
        $config = parse_ini_file('../../config/config.ini', true);

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

        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function getUserIdByUsername($username) {
        $stmt = $this->connection->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
    
        $stmt->execute();
        
        // Bind result variables
        $stmt->bind_result($user_id);
        
        // Fetch the result
        if ($stmt->fetch()) {
            return $user_id;
        } else {
            return null;
        }
    }

    public function createNewPicture($userid, $content, $width, $height) {
        $stmt = $this->connection->prepare("INSERT INTO pictures (title, content, width, height, artist_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())");

        $stmt->bind_param("ssiii", $title, $content, $width, $height, $artist_id);

        $stmt->execute();
        $stmt->store_result();

        $new_pick_id = $this->connection->insert_id;

        return $new_pick_id;
    }

    public function updateNewPictureById($picId, $content, $width, $height) {
        $stmt = $this->connection->prepare("INSERT pictures content = ?, width = ?, height = ? WHERE id = ?");
        $stmt->bind_param("siii", $content, $width, $height, $picId);
        $stmt->execute();
    }

    public function getPictureById($picId) {
        $stmt = $this->connection->prepare("SELECT content, width, height WHERE id = ?");
        $stmt->bind_param("i", $picId);
        $stmt->execute();

        $stmt->bind_result($content, $width, $height);
    }

    public function getConnection() {
        return $this->connection;
    }

    function __destruct() {
        $this->connection = null;
    }
}