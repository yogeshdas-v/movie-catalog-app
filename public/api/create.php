<?php

    include_once "../../src/includes/include.php";
    
    $data = json_decode(file_get_contents('php://input')); 

    // var_dump($data);

    $isCreated = $movie->create($data->title, $data->description, $data->cast, $data->imagePathUrl);

    echo json_encode(
        array("message" => "Created Succesfully")
    );
    
        


?>
