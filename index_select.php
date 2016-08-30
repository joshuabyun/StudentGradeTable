<?php
require('mysql_connect.php');
$query = "SELECT * FROM `student_grade`";
$query2 = "INSERT INTO `student_grade`(`StudentName`, `StudentCourse`, `Grade`) VALUES ('byun','josh',86)";
$query3 = "DELETE FROM `student_grade` WHERE `StudentName` = 'byun'";




$toInput = mysqli_query($conn,$query2);//query to add
$toSelectAll = mysqli_query($conn,$query);//query to view
$length = mysqli_num_rows($toSelectAll);//function to show number of total rows inside the db

$arr = [];
for($i = 0; $i < $length; $i++){
    $eachRow = mysqli_fetch_assoc($toSelectAll);
    array_push($arr,$eachRow);
}
while($row = mysqli_fetch_assoc($toSelectAll)){
    $arr[] = $row;
}
print_r("<pre>");
print_r($arr);
print_r("<pre>");



?>