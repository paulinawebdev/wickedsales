<?php

  require_once './functions.php';

  require_once './db_connection.php';

  set_exception_handler("error_handler");

  startup();

  if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
  }

  $id = false;

  if (empty($_GET['id'])) {
    $whereClause = "";
  } else {

    if (is_numeric($_GET['id'])) {

      $id = (int)$_GET['id'];
      $whereClause = "WHERE id = $id";
    } else {
      throw new Exception('id needs to be a number');
    }

  }

  $query = "SELECT * FROM `productList` $whereClause";

  if ($result = mysqli_query($conn, $query)) {
      $numRows = mysqli_num_rows($result);
  } else {
      throw new Exception('there is an error' . mysqli_connect_error());
  }

  if ($numRows === 0 && $id !== false) {
    throw new Exception("invalid id: $id");
  }

  $output = [];

  while ($row = mysqli_fetch_assoc($result)) { 
    $row['price'] = (int)$row['price'];
    $row['id'] = (int)$row['id']; 
    $output[] = $row;
  }

  $json_output = json_encode($output);
  print $json_output;

?>
