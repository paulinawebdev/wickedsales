<?php

require 'db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");

if(!$conn){
  throw new Exception('there is an error with connection' . mysqli_connect_error());
}

$item = file_get_contents('php://input');

$output = '';
$query = "DELETE FROM `cart` WHERE `id`=$item";

if ($result = mysqli_query($conn, $query)) {
    $output = 'success';
} else {
    throw new Exception('there is an error.' . mysqli_connect_error());
}

$json_output = json_encode($output);
print $json_output;

?>
