/**
 * Created by Gina on 8/29/2016.
 */
//addClicked();
//cancelClicked();
//getDataBtnClicked();
//gather query information from the div when corresponding buttons are clicked.



function receiveAction(crud,id){
    $.ajax({
        method:'post',
        dataType:'json',
        url:"index_select.php",
        data:{
            //id:id,
            name:$('#studentName').val(),
            course:$('#course').val(),
            grade:$('#studentGrade').val(),
            action:crud
        },
        success: function(response){
            console.log(response);
        }
    })

}

