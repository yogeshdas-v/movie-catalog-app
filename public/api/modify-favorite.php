<?php
    include_once("../../src/includes/include.php");
    $data = json_decode(file_get_contents('php://input'));
    $toggled = $movie->modifyFavorite($data->id, $data->isFavorite);
    // var_dump($data);
    $message = $toggled ? "success" : "failed";
    echo json_encode([
        "message" => $message
    ]);

?>