/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var studentName = null;
var course = null;
var studentGrade = null;
/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked(){
    console.log("add button clicked");
    addStudent();
    updateData();
    clearAddStudentForm();
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
    console.log("cancel button clicked");
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(){
    var student = {};
    student.name = studentName.val();
    student.course = course.val();
    student.grade = studentGrade.val();
    console.log("student object created", student);
    student_array.push(student);
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    studentName.val('');
    course.val('');
    studentGrade.val('');
    console.log("data in the form removed");
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage (){
    var gradeTotal = 0;
    var studentAvg;
    if(student_array.length == 0){
        studentAvg = 0;
    }
    else{
        for(var i = 0 ; i < student_array.length ; i++){
            gradeTotal += parseFloat(student_array[i].grade);
        }
        studentAvg = gradeTotal/(student_array.length);
        studentAvg = studentAvg.toFixed(2);
    }
    $('.avgGrade').text(studentAvg);
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    calculateAverage();
    updateStudentList();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    $('tbody > tr').remove();   //delete what's shown on the DOM to avoid showing duplicated data in the table
    for(var i = 0; i < student_array.length; i++){
        addStudentToDom(student_array[i]);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObject){
    var studentName = studentObject.name;
    var studentCourse = studentObject.course;
    var studentGrade = studentObject.grade;
    var tdName = $('<td>').text(studentName);
    var tdCourse = $('<td>').text(studentCourse);
    var tdGrade = $('<td>').text(studentGrade);
    var tdDel = $('<td>').html('<button class="btn btn-danger btn-xs">Delete</button>');
    var tr = $('<tr>').append(tdName,tdCourse,tdGrade,tdDel);
    $('tbody').append(tr);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    student_array = [];
    studentName = null;
    course = null;
    studentGrade = null;
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function(){
        initialize();
});
function initialize(){
    reset();
    studentName = $('#studentName');
    course = $('#course');
    studentGrade = $('#studentGrade');
    updateStudentList();
}
