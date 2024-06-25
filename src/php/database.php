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
        $sql = "SELECT id FROM users WHERE username = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$username]);
        $userWithThisId = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

        return $userWithThisId['id'];
    }

    public function getUsernameById($id) {
        $sql = "SELECT username FROM users WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$id]);
        $user = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

        return $user['username'];
    }

    public function createNewPicture($userid, $content, $width, $height, $title) {

        $sql = "INSERT INTO pictures (title, content, width, height, artist_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
        $stmt = $this->connection->prepare($sql);

        $stmt->execute([$title, $content, $width, $height, $userid]);

        $new_pick_id = $this->connection->lastInsertId();

        return $new_pick_id;
    }

    public function updatePictureById($picId, $content, $width, $height, $title) {
        $sql = "UPDATE pictures SET content = ?, width = ?, height = ?, title = ? WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$content, $width, $height, $title, $picId]);
    }

    public function getUserPicturesById($userId) {
        $sql = "SELECT id, content, width, height, title FROM pictures WHERE artist_id = ? ORDER BY created_at DESC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$userId]);

        $pictures = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $pictures;
    }

    public function getPictureById($picId) {
        $sql = "SELECT content, width, height, artist_id FROM pictures WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$picId]);

        $picture = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
        return $picture;
    }

    public function getPictures() {
        $sql = "SELECT id, content, width, height, artist_id, title FROM pictures ORDER BY created_at DESC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        $pictures = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $pictures;
    }

    public function createNewAnimation($userid, $width, $height, $content, $title) {

        $sql = "INSERT INTO animations (title, width, height, artist_id, created_at) VALUES (?, ?, ?, ?, NOW())";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$title, $width, $height, $userid]);
        $new_animation_id = $this->connection->lastInsertId();
        
        $order = 1;
        foreach($content as $frame) {
            $sql = "INSERT INTO frames (animation_id, ind, content) VALUES (?, ?, ?)";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute([$new_animation_id, $order, $frame]);
            $order += 1;
        }

        return $new_animation_id;
    }

    public function getAnimations() {
        $sql = "SELECT id, width, height, artist_id, title FROM animations ORDER BY created_at DESC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute();

        $animations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $animations;
    }

    public function getFramesByAnimationId($animationId) {
        $sql = "SELECT content FROM frames WHERE animation_id = ? ORDER BY ind ASC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$animationId]);

        $frames = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $frames;
    }

    public function getAnimationsByUserId($userId) {
        $sql = "SELECT id, width, height, artist_id, title FROM animations WHERE artist_id = ? ORDER BY created_at DESC";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute([$userId]);

        $animations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $animations;
    }

    public function getConnection() {
        return $this->connection;
    }

    function __destruct() {
        $this->connection = null;
    }
}