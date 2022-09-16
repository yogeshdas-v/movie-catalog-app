<?php
   include_once "../../src/includes/include.php";

    $data = json_decode(file_get_contents('php://input')); 
    
    $POSTER_PATH_BASE_URL = "https://image.tmdb.org/t/p/w500";
    
    
    foreach($data->results as $data) {
        $movie->create($data->title, $data->overview, $data->cast, $POSTER_PATH_BASE_URL . $data->poster_path);
    }

    echo json_encode([
        "saved to database" => "success"
    ]);

?>
