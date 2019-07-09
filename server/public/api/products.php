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
      $whereClause = "WHERE prodlist.id = $id";
    } else {
      throw new Exception('id needs to be a number');
    }

  }

  $query = "SELECT prodlist.id, prodlist.name, prodlist.price, prodlist.image, prodlist.shortDescription, prodlist.longDescription, img.url FROM `productList` AS prodlist JOIN `images` AS img ON prodlist.`id` = img.`productList_id` $whereClause";

  if ($result = mysqli_query($conn, $query)) {
      $numRows = mysqli_num_rows($result);
  } else {
      throw new Exception('there is an error' . mysqli_connect_error());
  }

  if ($numRows === 0 && $id !== false) {
    throw new Exception("invalid id: $id");
  }

  $output = [];

  while( $row = mysqli_fetch_assoc($result)) {
    $rowID = $row['id'];

    if(empty($output[$rowID])) {
        $imageUrl = $row['url'];
        unset($row['url']);
        $row['url'] = [$imageUrl];
        $output[$rowID] = $row;
    } else {
        $imageUrl = $row['url'];
        $output[$rowID]['url'][] = $imageUrl;
    }
  }

  $output2 = [];

  foreach ($output as $key => $value) {
    $output2[] = $value;
  }

  if ($id) {
    $output2 = $output2[0];
  }

  $json_output2 = json_encode($output2);
  print $json_output2;

?>
