<?php

require 'db_connection.php';
require_once './functions.php';

set_exception_handler("error_handler");
session_start();

if(!$conn){
  throw new Exception('there is an error with connection' . mysqli_connect_error());
}

$user = null;
$cartExists = false;

if (isset($_SESSION['userId'])) {
  $user = $_SESSION['userId'];
}

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

$output = [];


if ($user !== null) {
  //check if the item exists in their cart
  $checkQuery = "SELECT * FROM `cart` WHERE `user_id` = '$user'";

  $checkResult = mysqli_query($conn, $checkQuery);
  if ($checkResult) {
    $numRows = mysqli_num_rows($checkResult);

    if ($numRows) {
      $cartExists = true;
    }
  }
} else {
  $_SESSION['userId'] = uniqid();
  $user = $_SESSION['userId'];
}

if ($cartExists) {
  if ($method == 'GET') {
    
    $query = "SELECT `cart`.`id` AS cart_id, `cart`.`prod_id`, `cart`.`quantity`, `cart`.`created_at`, `cart`.`user_id`, `productList`.`name`, `productList`.`price`, `productList`.`image` FROM `cart` JOIN `productList` ON `productList`.`id` = `cart`.`prod_id` WHERE `cart`.`user_id` = '$user'";

    if ($result = mysqli_query($conn, $query)) {
      $numRows = mysqli_num_rows($result);

      while ($row = mysqli_fetch_assoc($result)) {  
        $output["products"][] = $row;
      }

    }
    else {
      throw new Exception('there is an error with GET request' . mysqli_connect_error());
    }

  }
  else if ($method == 'POST') {
    $item = file_get_contents('php://input');
    $item_decoded = json_decode($item);
    $prod_id = $item_decoded->product->id;
    $prod_new_quantity = $item_decoded->quantity;
    $cartItemExists = false;

    //check if the item exists in the cart
    $checkQuery = "SELECT `cart`.`prod_id` FROM `cart` WHERE `cart`.`user_id` = '$user' AND `cart`.`prod_id` = $prod_id";

    $checkResult = mysqli_query($conn, $checkQuery);
    if ($checkResult) {
      $numRows = mysqli_num_rows($checkResult);
      $outputCheck = null;

      if ($numRows) {
        $cartItemExists = true;
      }
    }

    if ($cartItemExists) {
      //udpate cart item
      $updateQuery = "UPDATE `cart` SET `quantity`= `quantity`+$prod_new_quantity WHERE `user_id`='$user' AND `prod_id`=$prod_id";
      $updateResult = mysqli_query($conn, $updateQuery);
      if ($updateResult) {
        $output[] = "Updated cart";
      } else {
        throw new Exception('there is an error with updating' . mysqli_error($conn));
      }
    } else {

      $postQuery = "INSERT INTO `cart` (`prod_id`, `quantity`, `created_at`, `user_id`) VALUES ($prod_id, $prod_new_quantity, CURRENT_TIMESTAMP, '$user')";

      $postResponse = mysqli_query($conn, $postQuery);

      if ($postResponse) {
        $getQuery = "SELECT `cart`.`id` AS cart_id, `cart`.`prod_id`, `cart`.`quantity`, `cart`.`created_at`, `cart`.`user_id`, `productList`.`name`, `productList`.`price`, `productList`.`image` FROM `cart` JOIN `productList` ON `productList`.`id` = `cart`.`prod_id` WHERE `cart`.`user_id` = '$user'";

        $getResult = mysqli_query($conn, $getQuery);

        if ($getResult) {
          $numRows = mysqli_num_rows($getResult);
        } else {
          throw new Exception('there is an error with post request' . mysqli_error($conn));
        }
        
        while ($row = mysqli_fetch_assoc($getResult)) {   
          $output["products"][] = $row;
        }

      } else {
        throw new Exception("failed to add to cart " . mysqli_error($conn));
      }

    }
    
  }
}

if ((!$cartExists) && ($method == 'POST')) {
  $item = file_get_contents('php://input');
  $item_decoded = json_decode($item);
  $prod_id = $item_decoded->product->id;
  $prod_new_quantity = $item_decoded->quantity;
  $cartItemExists = false;

  $postQuery = "INSERT INTO `cart` (`prod_id`, `quantity`, `created_at`, `user_id`) VALUES ($prod_id, $prod_new_quantity, CURRENT_TIMESTAMP, '$user')";

  $postResponse = mysqli_query($conn, $postQuery);

  if ($postResponse) {
    $getQuery = "SELECT `cart`.`id` AS cart_id, `cart`.`prod_id`, `cart`.`quantity`, `cart`.`created_at`, `cart`.`user_id`, `productList`.`name`, `productList`.`price`, `productList`.`image` FROM `cart` JOIN `productList` ON `productList`.`id` = `cart`.`prod_id` WHERE `cart`.`user_id` = '$user'";

    $getResult = mysqli_query($conn, $getQuery);

    if ($getResult) {
      $numRows = mysqli_num_rows($getResult);
    } else {
      throw new Exception('there is an error with post request' . mysqli_error($conn));
    }
    
    while ($row = mysqli_fetch_assoc($getResult)) {   
      $output["products"][] = $row;
    }

  } else {
    throw new Exception("failed to add to cart " . mysqli_error($conn));
  }
}

$json_output = json_encode($output);
print $json_output;

?>
