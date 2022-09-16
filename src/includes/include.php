<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include_once "../../src/config/config.php";
include_once "../../src/models/movie.php";

$database = new Database();
$db = $database->connect();

$movie = new Movie($db);
?>