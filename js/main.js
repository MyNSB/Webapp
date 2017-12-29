var globals = [];
var pages = ['dashboard.html', 'timetable.html', 'calendar.html', 'reminders.html', '4u.html'];





// Prompt the login session, collects details and sends it straight to the API
function promptLogin() {
    $("#background").addClass("hidden");
    $("#loginOverlay").addClass("showLogin");
}




function getUserData() {
    var loggedIn = false
    var data = ""
    
    $.get({
        url:"http://35.189.45.152:8080/api/v1/user/GetDetails",
        // Update the 
        success: function(data){
            // Instert the user into globals
            data = data.message;
            loggedIn = true;
        },
        // They don't seem to be a user
        error: function() {
            // Admin flag
            var admin = false;
            // Determine if they could be an admin
            $.get({
                url: "http://35.189.45.152:8080/api/v1/admin/GetDetails",
                // Set the global data and set the flag to true
                success: function(data){
                    data = data.message;
                    loggedIn = true;
                }
            });
        }
    });
    
    return [loggedIn, data]
}






function processLogin() {
    // Collect user data from the textviews
    // TODO: After the html has been implmented
    var studentID = $("#idInput").val();
    var password = $("#pwInput").val();

    

    // Authenticate against the api
    $.post({
        // Get the api to handle the auth
        url: "http://35.189.45.152:8080/api/v1/user/Auth",
        // Attach the basic auth headers
        beforeSend: function (xhr) {
            // Set the header
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(studentID + ":" + password));
        },
        error: function() {
            // Looks like they aren't a student
            // Prompt a failed login
        },
        success: function(data) {
            // Get the user data
            var loginData = getUserData();
            globals.userData = loginData[1];
            endLogin();
        }
    });
    
    
}




// End the login session
function endLogin() {
    $("#background").removeClass("hidden");
    $("#loginOverlay").removeClass("showLogin");
}
    





$(document).ready(function() {
    // Load the dashboard into the content holder
    $("#content").load("dashboard.html");
    // Perform the request to determine if there is a user currently signed in
    var loginData = getUserData();
    // Determine if they are not logged in
    if(!loginData[0]) {
        promptLogin();
        processLogin();
    } else {
        endLogin();
    }
    
    globals.userData = loginData[1];
})





// Determine if the refresh class is clicked
$(".refreshpage").click(function(){
    // Remove all button highlights
    $(".refreshpage").removeClass("selected");
    // Add highlight to the button you just clicked
    $(this).addClass("selected");
    // Identify which button you just clicked
    var index = $('.refreshpage').index(this);
    $( "#content" ).fadeOut(300, function(){
        // Load the page that the index corresponds to
        $( "#content" ).load(pages[index], function(){
            $( "#content" ).fadeIn(300);
        });
    });
});





// Determine if the logout button is clicked
$("#logOut").click(function() {
    // Send a request to the API to log the user out
    $.post("http://35.189.45.152:8080/api/v1/user/Logout", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});