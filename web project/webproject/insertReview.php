<?php
$username = filter_input(INPUT_POST, 'username');
$anime = filter_input(INPUT_POST, 'anime');
$score = filter_input(INPUT_POST, 'score');
$review = filter_input(INPUT_POST, 'review');
if (!empty($score) || !empty($review) || !empty($username) || !empty($anime)) {
 $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "anime";
    //create connection
    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);
    if (mysqli_connect_error()) 
    {
      die('Connect Error('. mysqli_connect_errno().')'. mysqli_connect_error());
    } 
    else{
      $sql = "INSERT INTO REVIEW_T (ReviewId,Username,Anime,Score,Review)
      values (NULL,'$username','$anime','$score','$review')";
      if ($conn->query($sql)){
        echo "New record is inserted sucessfully";
      }
      else{
        echo "Error: ". $sql ."
        ". $conn->error;
      }
      $conn->close();
    } 
  }
  else{
    echo "Review and score should not be empty";
    die();
      }
      ?>