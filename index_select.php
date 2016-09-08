<?php
require('mysql_connect.php');

////$query2 = "INSERT INTO `student_grade`(`StudentName`, `StudentCourse`, `Grade`) VALUES ('byun','josh',86)";

//

//if(!empty($_POST["action"])){
//    switch ($_POST["action"]) {
//        case 'add':
//            print_r($_POST["action"]);
//            print_r("<br>");
//            $query = "INSERT INTO `student_grade`(`StudentName`, `StudentCourse`, `Grade`) VALUES ({$_POST["name"]},{$_POST["course"]},{$_POST["grade"]})";
//        break;
//        case 'receive':
//            print_r($_POST["action"]);
//            $query = "SELECT * FROM `student_grade`";
//        break;
//        case 'delete':
//            print_r($_POST["action"]);
//            $query = "DELETE FROM `student_grade` WHERE `ID` = {$_POST["id"]}";
//        break;
//        default:
//            print_r('ajax call unsuccessful');
//    };
//
//}
//else{
//    print_r('ajax call unsuccessful');
//}
//
//print_r($query);


//$query = "INSERT INTO `student_grade`(`StudentName`, `StudentCourse`, `Grade`) VALUES ($_POST["name"],$_POST["course"],$_POST["grade"])";
//$toInput = mysqli_query($conn,$query);
//$toSelectAll = mysqli_query($conn,$query);//query to view
//$length = mysqli_num_rows($toInput);//function to show number of total rows inside the db
//$arr = [];
//for($i = 0; $i < $length; $i++){
//    $eachRow = mysqli_fetch_assoc($toSelectAll);
//    array_push($arr,$eachRow);
//}
////while($row = mysqli_fetch_assoc($toSelectAll)){
////    $arr[] = $row;
////}
//$arr['message']='success';
//print_r(json_encode($arr));


//echo $_POST['name'];
//echo $_POST['course'];
//echo $_POST['grade'];


?>