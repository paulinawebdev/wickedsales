<?php

  require_once './functions.php';

  require_once './db_connection.php';

  set_exception_handler("error_handler");

  startup();

  if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
  }


  if (empty($_GET['id'])) {
    //readfile('dummy-products-list.json');

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

  } else {
    //readfile('dummy-product-details.json');
    $query = "SELECT * FROM productList WHERE id = " . ($_GET['id']);
    
    if ($result = mysqli_query($conn, $query)) {
        $numRows = mysqli_num_rows($result);
    } else {
        throw new Exception('there is an error' . mysqli_connect_error());
    }

    while ($row = mysqli_fetch_assoc($result)) {  
        $output = $row;
    }

    $json_output = json_encode($output);
    print $json_output;
  }

?>
