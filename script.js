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
    addStudent(); //create an object based on form info and push it to the student_array
    updateData(); //calculate_avg and create dom via updateStudentList
    clearAddStudentForm();//clear form
    sendDataToServer();
}
function sendDataToServer (){
    console.log("sendDataToServer");
    var newObjPosition = student_array[student_array.length -1];
    $.ajax({
        url : 'server/get.php',
        // url:'http://s-apis.learningfuze.com/sgt/create',
        dataType:'json',
        data:{
            requestType:"add",  
            name:newObjPosition.name,
            course:newObjPosition.course,
            grade:newObjPosition.grade
        },
        // data:{
        //     api_key:'aEY4CgfQHB',
        //     name:newObjPosition.name,
        //     course:newObjPosition.course,
        //     grade:newObjPosition.grade
        // },
        method:'post',
        success:function(response){
            if(response.success){
                updateData();
            }
            else{
                console.log('data did not send via ajax');
            }
        }
    })
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
    console.log("cancel button clicked");
    clearAddStudentForm();
}
function getDataBtnClicked(){
    $.ajax({
        //url:'http://s-apis.learningfuze.com/sgt/get',
        url : 'server/get.php',
        dataType:'json',
        //data:{api_key:'aEY4CgfQHB'},
        data:{requestType : 'read'},
        method:'post',
        success:function(response){
            if(response){//.success
                reset();//clear current student_Array
                var serverDataArray = response;//response.data;
                for(var i = 0;i<serverDataArray.length;i++){
                     var studentObj = serverDataArray[i];
                     student_array.push(studentObj);
                }
                updateData();//updates both table and avg in the dom
                //console.log(response);
            }
            else{
                console.log("unsuccessful");
            }
        }
    });
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
function calculateAverage(){
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
        addStudentToDom(student_array[i],i);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObject,position){
    var tdName = $('<td>').text(studentObject.name);
    var tdCourse = $('<td>').text(studentObject.course);
    var tdGrade = $('<td>').text(studentObject.grade);
    var btnDel = $('<button class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-erase"></span></button>');
    var btnEdit = $('<button class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-edit"></span></button>');
    var tdBtn = $('<td>').append(btnEdit," ",btnDel);
    var tr = $('<tr>').attr({"id" : "tr"+position}).append(tdName,tdCourse,tdGrade,tdBtn).on('click','.btn-danger',function(){
        requestServerDelete($(this));
        removeStudent($(this));
        updateData();
    }).on('click','.btn-primary',function(){
        var trIdVal = $(this).closest($('tr'))[0].id;

        var tdName = $('<td><div class="form-group"><input type="text" class="form-control">');
        var tdCourse = $('<td><div class="form-group"><input type="text" class="form-control">');
        var tdGrade = $('<td><div class="form-group"><input type="text" class="form-control">');
        var updateBtn = $('<button class="btn btn-info">Update</button>');
        var tdUpdate = $('<td>').append(updateBtn);
        var tr = $('<tr>').attr({"id":trIdVal+"form"}).append(tdName,tdCourse,tdGrade,tdUpdate);
        $(tr).insertAfter($('#'+trIdVal));

        $(this).closest($('tr')).remove();
    });
    $('tbody').append(tr);
}



function requestServerDelete(delBtnElement){
    var trIndex = delBtnElement.parents('tr').index();
    var studentId = student_array[trIndex].id;
    console.log("object to delete : ",studentId);
    $.ajax({
        //url:'http://s-apis.learningfuze.com/sgt/delete',
        url: 'server/get.php',
        dataType:'json',
        data:{
            studentId : studentId,
            requestType : 'delete'},
        // data:{
        //     api_key:'aEY4CgfQHB',
        //     student_id : studentId},
        method:'post',
        success:function(response){
            if(response.success){
                console.log(response);
            }
            else{
                console.log('delete failed');
                console.log(response);
            }
        }
    })
}
function removeStudent(delBtn){
    var dataRow = delBtn.parents('tr');
    student_array.splice(dataRow.index(),1);
    dataRow.remove();
    console.log("remaining objects inside student_array : ", student_array);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    student_array = [];
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
    //getDataBtnClicked();
}
