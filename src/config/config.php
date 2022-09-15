<?php
    class Database {
        private $host = '172.25.0.1';
        private $username = 'root';
        private $password = 'password';
        private $databaseName = 'project';
        private $connection;  
        
        public function __construct() {
            $this->connection = null;
        }
    
        public function connect() {
            $this->connection = new mysqli($this->host, $this->username, $this->password, $this->databaseName);
         
         if($this->connection->connect_errno ) {
            printf("Connect failed: %s<br/>", $this->connection->connect_error);
            exit();
         }
         return $this->connection;
        }
    }
?>