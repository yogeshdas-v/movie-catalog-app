<?php 
    class Movie {
        private $db;
        private $table = 'Movies';
        
        public function __construct($db){
            $this->db = $db;
        }

        public function read() {
            $query = "SELECT * FROM $this->table order by isFavorite DESC, title;";
            $result = $this->db->query($query);
            return $result;
        }

        public function readSingle($id) {
            $query = "SELECT * FROM $this->table where id = ?;";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param("s", $id);
            $stmt->execute();
            return $stmt->get_result();
        }
        public function search($title) {
            $query = "SELECT * FROM $this->table WHERE title LIKE ? ORDER BY title;";
            $stmt = $this->db->prepare($query);
            $movie_name = "%".$title."%";
            $stmt->bind_param("s", $movie_name);
            $stmt->execute();
            return $stmt->get_result();
        }
        public function create($title, $description, $cast, $imagePathUrl) {
            $query = "INSERT INTO Movies(title, description, cast, imagePathUrl)
                      VALUES(?, ?, ?, ?);";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param("ssss", $title, $description, $cast, $imagePathUrl);
            $stmt->execute();
            return $stmt;
        }

        public function update($id, $description, $cast, $imagePathUrl) {
            $query = "UPDATE $this->table
                      SET description = ?, cast = ?, imagePathUrl = ?
                      WHERE id = ?;";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param("sssi", $description, $cast, $imagePathUrl, $id);
            $stmt->execute();
            return $stmt;
        }

        public function modifyFavorite($id, $isFavorite) {
            $query = "UPDATE $this->table
                      SET isFavorite = ?
                      WHERE id = ?;";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param("ii", $isFavorite, $id);
            $stmt->execute();
            return $stmt;
        }
        

    }
?>