<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include_once "../../src/config/config.php";
include_once "../../src/models/movie.php";

$database = new Database();
$db = $database->connect();

$movie = new Movie($db);

$data = json_decode(file_get_contents('php://input'));


$isUnMarked = $movie->unmarkFavorite($data->id);
var_dump($isUnMarked);
if($isUnMarked) {
    
    echo json_encode(
        array("message" => "Unmarked Favorite Succesfully")
    );
}


?>