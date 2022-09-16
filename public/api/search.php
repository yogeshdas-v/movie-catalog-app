<?php
    include_once "../../src/includes/include.php";

    if(!isset($_REQUEST['m']) or empty($_REQUEST['m'])){
       $result = $movie->read();
    }else {
        $result = $movie->search($_REQUEST['m']);
    }

  

    $hasRows = $result->num_rows;
    // var_dump($result);
    $movies_arr = array();
    $movies_arr['movies'] = array();
    if($hasRows) {
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

        
    }
    echo json_encode($movies_arr);
?>