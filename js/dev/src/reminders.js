import $ from "jquery";

function checkReminders() {
    $.get({
        url:"http://35.189.45.152:8080/api/v1/reminders/Get/Today",
        headers: {
            "Authorization": "Basic " + btoa(studentID + ":" + password)
        },
        xhrFields: {
            // Send the cookies with our request as well
            withCredentials: true
        },
        error: function(data) {
            alert("An error occured! Here's some gibberish... \n" + data.responseText);
        },
        success: function(data) {
            let test=data;
            if(data.Message.Body[0]===null) {
                $("#message").html("Good news! You have no upcoming reminders. \n <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>Click me to add one!</a>");
            } else {
                alert("we need varun to fix mynsb");
            }
        }
        
    })
}

$(document).ready(checkReminders())