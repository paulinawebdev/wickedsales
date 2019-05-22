<?php

  require_once './functions.php';

  require_once './db_connection.php';

  set_exception_handler("error_handler");

  startup();

  if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
  }

  $query = "SELECT * FROM productList";
  
  if ($result = mysqli_query($conn, $query)) {
      $numRows = mysqli_num_rows($result);
  } else {
      throw new Exception('there is an error' . mysqli_connect_error());
  }

  $output = [];

  while ($row = mysqli_fetch_assoc($result)) {  
      $output[] = $row;
  }

  $json_output = json_encode($output);
    print $json_output;

// header('Content-Type: application/json');

// if (empty($_GET['id'])) {
//   readfile('dummy-products-list.json');
// } else {
//   readfile('dummy-product-details.json');
// }

?>
