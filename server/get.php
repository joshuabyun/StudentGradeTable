<?php
require_once "mysql_connect.php";

//if (!$conn) {
//    $output['success'] = "false";
//    $output['message'] = "Unable to connect to database.";
//}


if(!empty($_POST['requestType'])){
    switch ($_POST['requestType']) {
        case 'read':
            requestRead();
        break;
        case 'delete':
            requestDelete();
            break;
        case 'add':
            requestCreate();
            break;
        default:
            print 'request code not read';
    }
}else{
    print 'post var not selected';
}
function requestCreate(){
    global $conn;
    $name = $_POST['name']; //only char
    $course = $_POST['course']; //char and number
    $grade = $_POST['grade']; //number =<100
    if(!empty($name)&&!empty($course)&&!empty($grade)){
        $query1 = 'INSERT INTO `students`(name, grade, course) VALUES (\''.$name.'\',\''.$grade.'\',\''.$course.'\')';
        mysqli_query($conn,$query1);
    }
};
function requestDelete(){
    global $conn;
    if(!empty($_POST['studentId'])){
        $studentID = $_POST['studentId'];
        $query = 'DELETE FROM `students` WHERE `id` = '.$studentID;
        mysqli_query($conn,$query);
    }else{
        print 'studentId invalid';
    }
}
function requestRead(){
    global $conn;
    $query = 'SELECT * FROM `students`';
    $results = mysqli_query($conn,$query);
    if(mysqli_num_rows($results) > 0){
        while($row = mysqli_fetch_assoc($results)){
            $output[] = $row;
        }
    }
    print_r(json_encode($output));
}









//$result = $conn->query($query);
//$count = 0;
//if($result->num_rows > 0){
//    while($row = $result->fetch_assoc()){
//        $output[] = $row;
//    }
//}

?>

