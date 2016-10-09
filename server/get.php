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
            requestCreate();
            break;
        case 'edit':
            requestEdit();
            break;
        default:
            print 'request code not read';
    }
}else{
    print 'post var not selected';
}
function requestRead(){
    global $conn;
    $query = "SELECT * FROM students";
    $results = mysqli_query($conn,$query);
    if(mysqli_num_rows($results) > 0){
        while($row = mysqli_fetch_assoc($results)){
            $output['success'][] = $row;
        }
    }else{
        $output['error'][] = 'data base is empty';
    }
    print_r(json_encode($output));
    mysqli_close($conn);
}
function requestCreate(){
    global $conn;
    $name = $_POST['name']; //only char
    $course = $_POST['course']; //char and number
    $grade = $_POST['grade']; //number =<100
    if(!empty($name)&&!empty($course)&&!empty($grade)){
        //$query = "INSERT INTO students (name, grade, course) VALUES ('$name','$grade','$course')";
        $query = 'INSERT INTO `students`(name, grade, course) VALUES (\''.$name.'\',\''.$grade.'\',\''.$course.'\')';
        mysqli_query($conn,$query);
        if(mysqli_affected_rows($conn) == 1){
            $output['success'][] = 'entry successfully added';
        }else if(mysqli_affected_rows($conn) == 0){
            $output['error'][] = 'entry unsuccessfully added';
        }
    }
    print_r(json_encode($output));
    mysqli_close($conn);
}
function requestEdit(){
    global $conn;
    $studentId = $_POST['studentId'];
    $editedName = $_POST['editedName'];
    $editedCourse = $_POST['editedCourse'];
    $editedGrade = $_POST['editedGrade'];
    if(!empty($studentId)&&!empty($editedName)&&!empty($editedCourse)&&!empty($editedGrade)){
        //$query ='UPDATE `students` SET `name`=\''.$editedName.'\',`grade`='.$editedGrade.',`course`=\''.$editedCourse.'\' WHERE `id`='.$studentId;
        $query ="UPDATE students SET name='$editedName',grade='$editedGrade',course ='$editedCourse' WHERE id=''$studentId";
        mysqli_query($conn,$query);
        if(mysqli_affected_rows($conn) == 1){
            //db updated
            $output['success'][] = 'entry successfully edited';
        }else{
            $output['success'][] = 'no input edited';
        };
    }else{
        $output['error'][] = 'please input all 3 inputs';
    }
    print_r(json_encode($output));
    mysqli_close($conn);
}
function requestDelete(){
    global $conn;
    if(!empty($_POST['studentId'])){
        $studentID = $_POST['studentId'];
        $query = 'DELETE FROM students WHERE id = '.$studentID;
        mysqli_query($conn,$query);
        if(mysqli_affected_rows($conn) == 1){
            $output['success'][] = 'entry successfully deleted';
        }else if(mysqli_affected_rows($conn) == 0){
            $output['error'][] = 'delete not successful';
        }
    }else{
        $output['error'][] = 'student ID not available';
    }
    print_r(json_encode($output));
    mysqli_close($conn);
}
?>

