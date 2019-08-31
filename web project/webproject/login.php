<?php
$username = filter_input(INPUT_POST, 'username');
$password = filter_input(INPUT_POST, 'password');
if (!empty($username)){
    if (!empty($password)){
        $host = "localhost";
        $dbusername = "root";
        $dbpassword = "";
        $dbname = "anime";
        // Create connection
        $conn =mysqli_connect($host, $dbusername, $dbpassword, $dbname);
        if (mysqli_connect_error()){
            die("Connection failed: " . $conn->connect_error);
        }
        else{
            $sql = "SELECT Username FROM USER_T
            WHERE Username = '$username' AND Password = '$password'";
            $result = $conn->query($sql);
            if($result ->num_rows== 1) {
                //login success
                echo "Login Success";
            }
            //couldn't find ac or password incorrect
            else {
                echo "Your username or Password is invalid";
                die();
            }
            $conn->close();
        }
    }
    //password is empty
    else{
    echo "Password should not be empty";
    die();
    }
}
//username is empty
else{
    echo "Username should not be empty";
die();
}
?>