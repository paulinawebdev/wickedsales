<?php

require 'db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");
session_start();

if(!$conn){
  throw new Exception('there is an error' . mysqli_connect_error());
}

if(!isset($_SESSION['userId'])) {
  $_SESSION['userId'] = 1;
}

$user = $_SESSION['userId'];

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

$output = [];

if ($method == 'GET') {

  if(isset($_SESSION['userId'])) {
    
  $query = "SELECT `cart`.`id` AS cart_id, `cart`.`prod_id`, `cart`.`quantity`, `cart`.`created_at`, `cart`.`user_id`, `productList`.`name`, `productList`.`price`, `productList`.`image` FROM `cart` JOIN `productList` ON `productList`.`id` = `cart`.`prod_id` WHERE `cart`.`user_id` = {$user}";

    if ($result = mysqli_query($conn, $query)) {
      $numRows = mysqli_num_rows($result);

      while ($row = mysqli_fetch_assoc($result)) {  
        $output["products"][] = $row;
      }

    } else {
        throw new Exception('there is an error' . mysqli_connect_error());
    }
  }
  
} else if ($method == 'POST') {
  
  $item = file_get_contents('php://input', FILE_USE_INCLUDE_PATH);
  print $item;
  $query = "INSERT INTO `cart` (`prod_id`, `quantity`, `created_at`, `user_id`) VALUES ('3', '3', CURRENT_TIMESTAMP, '1')";

} else {
  http_response_code(404);
  print(json_encode([
    'error' => 'Not Found',
    'message' => "Cannot $method /api/cart.php"
  ]));
}

$json_output = json_encode($output);
print $json_output;

?>
