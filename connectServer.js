/**
 * Created by Gina on 8/29/2016.
 */
//addClicked();
//cancelClicked();
//getDataBtnClicked();
//gather query information from the div when corresponding buttons are clicked.



function receiveAction(crud){
    $.ajax({
        method:'post',
        dataType:'json',
        url:'index_select.php',
        data:{
            name:$('#studentName').val(),
            course:$('#course').val(),
            grade:$('#studentGrade').val()
        },
        success: function(response){
            console.log(response);
        }
    })
    
}



$.ajax({
    url:'http://s-apis.learningfuze.com/sgt/create',
    dataType:'json',
    data:{
        api_key:'aEY4CgfQHB',
        name:newObjPosition.name,
        course:newObjPosition.course,
        grade:newObjPosition.grade
    },
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