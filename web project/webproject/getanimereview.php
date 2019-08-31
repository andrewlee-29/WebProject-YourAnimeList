<!DOCTYPE html>
<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 3px solid #9FA8DA;
    padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>

<?php
$q = strval($_GET['q']);
$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbname = "anime";
$con = mysqli_connect($host, $dbUsername, $dbPassword, $dbname);
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");
$sql="SELECT Username,Score,Review FROM REVIEW_T WHERE Anime = '".$q."'";
$result = mysqli_query($con,$sql);

echo"$q";

echo "<table>
<tr>
<th>Username</th>
<th>Score</th>
<th>Review</th>
</tr>";
while($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['Username'] . "</td>";
    echo "<td>" . $row['Score'] . "</td>";
    echo "<td>" . $row['Review'] . "</td>";
    echo "</tr>";
}
echo "</table>";
mysqli_close($con);
?>
</body>
</html>