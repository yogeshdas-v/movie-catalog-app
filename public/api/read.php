<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include_once "../../src/config/config.php";
include_once "../../src/models/movie.php";

$database = new Database();
$db = $database->connect();

$movie = new Movie($db);
$data = json_decode(file_get_contents('php://input'));
$result = "";

if(is_null($data)) {
    $result = $movie->read();
}else {
    $result = $movie->readSingle($data->id);
}

$hasRows = $result->num_rows;
// var_dump($result);
if($hasRows) {
    $movies_arr = array();
    $movies_arr['movies'] = array();
    while($movie = $result->fetch_row()) {
        $movie_item = array(
            'id' => $movie[0],
            'title' => $movie[1],
            'description' => $movie[2],
            'cast' => $movie[3],
            'imagePathUrl' => $movie[4],
            'isFavorite' => $movie[5]
        );

        array_push($movies_arr['movies'], $movie_item);
    }

    echo json_encode($movies_arr);
}
else {
    echo json_encode(
        array('message' => 'No movie found')
    );
}
?>