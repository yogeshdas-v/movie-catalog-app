<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

        
    include_once "../../src/config/config.php";
    include_once "../../src/models/movie.php";

    $database = new Database();
    $db = $database->connect();

    $movie = new Movie($db);


    $data = json_decode(file_get_contents('php://input')); 
    $POSTER_PATH_BASE_URL = "https://image.tmdb.org/t/p/w500";
    
    
    foreach($data->results as $data) {
        // var_dump($data->cast);
        $movie->create($data->title, $data->overview, $data->cast, $POSTER_PATH_BASE_URL . $data->poster_path);
    }

    echo json_encode([
        "saved to database" => "success"
    ]);

?>
