/**

 */
var student_array = [];
var studentName = null;
var course = null;
var studentGrade = null;
function addClicked(){
    addStudentToArray(); //create an object based on form info and push it to the student_array
    calculateAverageAndUpdate();
    updateStudentListInDom();
    clearAddStudentForm();//clear form                                                                                  
    sendServerRequestToAdd();                                                                                           
}   
function cancelClicked(){
    clearAddStudentForm();                                                                                              
}
function getDataBtnClicked(){
    sendSeverRequestToRead();                                                                                           
}
function addStudentToArray(){
    var student = {};
    student.name = studentName.val();
    student.course = course.val();
    student.grade = studentGrade.val();
    console.log("student object created", student);
    student_array.push(student);
}
function clearAddStudentForm(){
    studentName.val('');
    course.val('');
    studentGrade.val('');
    console.log("data in the form removed");
}
function calculateAverageAndUpdate(){
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
function clearStudentArray(){
    student_array = [];
}
function removeStudentObjFromArr(IndexToDel){
    student_array.splice(IndexToDel,1)
}
function removeStudentFromDom(domElementToDel){
    domElementToDel.remove();
}
function updateStudentListInDom(){
    removeStudentFromDom($('tbody > tr'));
    for(var i = 0; i < student_array.length; i++){
        var tr = createStudentDomTr(student_array[i],i);
        $('tbody').append(tr);
    }
}
function createStudentDomTr(studentObject,position){
    var tdName = $('<td>').addClass('tdName').text(studentObject.name);
    var tdCourse = $('<td>').addClass('tdCourse').text(studentObject.course);
    var tdGrade = $('<td>').addClass('tdGrade').text(studentObject.grade);
    var btnDel = $('<button class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-erase"></span></button>');
    var btnEdit = $('<button class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-edit"></span></button>');
    var tdBtn = $('<td>').append(btnEdit," ",btnDel);
    var tr = $('<tr>').attr({"id" : "tr"+position}).append(tdName,tdCourse,tdGrade,tdBtn).on('click','.btn-danger',function(){ //click handler to delete a clicked row
        requestServerDelete($(this));
        removeStudentObjFromArr($(this).parents('tr').index());
        removeStudentFromDom($(this).parents('tr'));
        calculateAverageAndUpdate();
        updateStudentListInDom();
    }).on('click','.btn-primary',function(){
        //need to disable other inputs to avoid any error
        createFormInputRow($(this));
    });
    return tr;
}
function createFormInputRow(clickedEditBtn){
    var tdObj = createDefaultInputValObj(clickedEditBtn);
    var tr = $(clickedEditBtn).closest($('tr'));
    var trIdVal = tr[0].id;
    var tdName = $('<td>').append($('<div class="form-group">').append($('<input type="text" class="form-control">').attr({"value" : tdObj["tdName"],"id" : "editName"})));
    var tdCourse = $('<td>').append($('<div class="form-group">').append($('<input type="text" class="form-control">').attr({"value" : tdObj["tdCourse"],"id" : "editCourse"})));
    var tdGrade = $('<td>').append($('<div class="form-group">').append($('<input type="text" class="form-control">').attr({"value" : tdObj["tdGrade"],"id" : "editGrade"})));
    var tdUpdate = $('<td>').append($('<button class="btn btn-info">Update</button>'));
    var trOutput = $('<tr>').attr({"id":trIdVal+"form"}).append(tdName,tdCourse,tdGrade,tdUpdate);
    trOutput.on('click','.btn-info',function(){
        var studentArrayIndex = $("tbody > tr").index($('#'+trIdVal+"form"));
        var studentId = student_array[studentArrayIndex].id;
        requestServerToEdit($('#editName').val(),$('#editCourse').val(),$('#editGrade').val(),studentId);
        //need to remove the input,
        //update the chart with current data
        //enable all buttons/input again
    });
    $(trOutput).insertAfter($('#'+trIdVal));
    removeStudentFromDom(tr)
}
function createDefaultInputValObj(clickedEditBtn){ //looks for the parent tr and creates an object of name, course, grade based on the input value
    var tr = $(clickedEditBtn).closest($('tr'));
    var trData = tr.find("td");
    var tdObj = {};
    for(var i =0 ; i<3;i++){
        var className = $(trData[i]).attr("class");
        tdObj[className] = $(trData[i]).text();
    }
    return tdObj;
}
function sendSeverRequestToRead(){//read
    $.ajax({
        url : 'server/get.php',
        dataType:'json',
        data:{requestType : 'read'},
        method:'post',
        success:function(response){
            clearStudentArray();//clear current student_Array
            var serverDataArray = response;//response.data;
            for(var i = 0;i<serverDataArray.length;i++){
                var studentObj = serverDataArray[i];
                student_array.push(studentObj);
            }
            calculateAverageAndUpdate();
            updateStudentListInDom();
            console.log(response);
        },
        error : function(){
            console.log('error');
        }
    });
}
function sendServerRequestToAdd(){
    console.log("sendServerRequestToAdd");
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
        method:'post',
        success:function(response){
            if(response.success){
                calculateAverageAndUpdate();
                updateStudentListInDom();
            }
            else{
                console.log('data did not send via ajax');
            }
        }
    })
}
function requestServerToEdit(editedName,editedCourse,editedGrade,studentId){
    $.ajax({
        url:'server/get.php',
        dataType: 'json',
        data :{
            requestType : "edit",
            studentId : studentId,
            editedName : editedName,
            editedCourse : editedCourse,
            editedGrade : editedGrade
        },
        method:'post',
        success:function(response){
            if(response){
                console.log(response);
            }else{
                console.log('updateFailed');
            }
        }
    })
}
function requestServerDelete(delBtnElement){
    var trIndex = delBtnElement.parents('tr').index();
    var studentId = student_array[trIndex].id;
    console.log("object to delete : ",studentId);
    $.ajax({
        url: 'server/get.php',
        dataType:'json',
        data:{
            studentId : studentId,
            requestType : 'delete'},
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
function initialize(){
    clearStudentArray();
    studentName = $('#studentName');
    course = $('#course');
    studentGrade = $('#studentGrade');
}

$(document).ready(function(){
        initialize();
});
