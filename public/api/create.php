<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

        
    include_once "../../src/config/config.php";
    include_once "../../src/models/movie.php";

    $database = new Database();
    $db = $database->connect();

    $movie = new Movie($db);

    $data = json_decode(file_get_contents('php://input')); 

    // var_dump($_POST);

    $isCreated = $movie->create($_POST['title'], $_POST['description'], $_POST['cast'], $_POST['imagePathUrl']);

    echo json_encode(
        array("message" => "Created Succesfully")
    );
    
        


?>
