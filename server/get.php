<?php
require_once "mysql_connect.php";

if(!empty($_POST['requestType'])){
    switch ($_POST['requestType']) {
        case 'read':
            requestRead();
        break;
        case 'delete':
            requestDelete();
            break;
        case 'add':
            requestAdd();
            break;
        default:
            print 'request code not read';
    }
}else{
    print 'post var not selected';
}
function requestAdd(){
    global $conn;
    $name = $_POST['name'];
    $course = $_POST['course'];
    $grade = $_POST['grade'];
    if(!empty($name)&&!empty($course)&&!empty($grade)){
        print $name;
        print $course;
        print $grade;
        $query1 = 'INSERT INTO `students`(name, grade, course) VALUES (\''.$name.'\',\''.$grade.'\',\''.$course.'\')';
        print $query1;
        mysqli_query($conn,$query1);
    }
    
//INSERT INTO `student_grade_table`.`students` (`id`, `name`, `grade`, `course`) VALUES (NULL, 'James', '75', '"Choir"');
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
            //$sid = $row['id'];
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

