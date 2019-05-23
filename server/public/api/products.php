<?php

  require_once './functions.php';

  require_once './db_connection.php';

  set_exception_handler("error_handler");

  startup();

  if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
  }

  if (empty($_GET['id'])) {
    $whereClause = "";
  } else {
    $whereClause = "WHERE id = " . ($_GET['id']);
  }

  $query = "SELECT * FROM `productList`" . $whereClause;

  if ($result = mysqli_query($conn, $query)) {
      $numRows = mysqli_num_rows($result);
  } else {
      throw new Exception('there is an error' . mysqli_connect_error());
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
