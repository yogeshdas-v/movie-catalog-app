<?php
    include_once "../../src/includes/include.php";
    $data = json_decode(file_get_contents('php://input'));
    // var_dump($data);
    $updated = $movie->update($data->id, $data->description, $data->cast, $data->imagePathUrl);
    $message = $updated ? "success" : "failed";
    echo json_encode([
        "message" => $message
    ]);
?>