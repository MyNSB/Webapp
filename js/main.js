var globals = [];
var pages = ['pages/dashboard.html', 'pages/timetable.html', 'pages/calendar.html', 'pages/reminders.html', 'pages/4u.html'];

// Prompt the login session, collects details and sends it straight to the API
function promptLogin() {
    $("#background").addClass("hidden");
    $("#loginBox").addClass("showLogin");
}

function getUserData() {
    // By default, not logged in
    loggedIn = false
    
    // Housekeeping
    var data = ""
    
    // Checks userdata, using saved cookies. If none, will parse an error.
    $.get({
        url: "http://35.189.45.152:8080/api/v1/user/GetDetails",
        async: false,
        xhrFields: {
            // Send the cookies with our request as well
            withCredentials: true
        },
        
        
        // User is already authenticated. Save user data for future use.
        success: function(data) {
            // Insert the user into globals
            data = data.message;
            loggedIn = true;
        },
        
        // Hm... They are either not logged in, or are an admin.
        error: function(data) {

            // Housekeeping
            var admin = false;
            
            // Check now if they are an admin
            $.get({
                url: "http://35.189.45.152:8080/api/v1/admin/GetDetails",
                // Set the global data and set the flag to true
                success: function(data) {
                    data = data.message;
                    loggedIn = true;
                },
                xhrFields: {
                    // Send the cookies with our request as well
                    withCredentials: true
                }
            });

            globals.data = data
            console.log(data)
        }
    });
    // Returns whether or not the user is logged in or not, along with the saved user data.
    return loggedIn
}

function processLogin() {
    // Collect user data from the textviews
    // TODO: After the html has been implmented
    var studentID = $("#studentID").val();
    var password = $("#password").val();

    // Authenticate against the api
    $.post({
        // Get the api to handle the auth
        url: "http://35.189.45.152:8080/api/v1/user/Auth",
        // Attach the basic auth headers
        beforeSend: function(xhr) {
            // Set the header
            xhr.setRequestHeader("Authorization", "Basic " + btoa(studentID + ":" + password));
        },
        error: function(data) {
            // Looks like they aren't a student
            // Prompt a failed login
            $("#errors").html("Looks like that login was incorrect. Please try logging in again.");
            console.log(data);
        },
        xhrFields: {
            // Send the cookies with our request as well
            withCredentials: true
        },
        success: function(data) {
            console.log(data)
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
    $("#loginBox").removeClass("showLogin");
}

function checkLogin() {
    // Load the dashboard into the content holder
    $("#content").load("pages/dashboard.html");
    // Perform the request to determine if there is a user currently signed in
    var loginData = getUserData();
    console.log(loginData)
    // Determine if they are not logged in
    if (loginData == false) {
        promptLogin();
    }
    else {
        endLogin()
    }
    $.getJSON('http://api.chew.pro/trbmb', function(data) {
        $('#loginSub').html(data[0])
    })
}

$(document).ready(checkLogin())

// Determine if the refresh class is clicked
$(".refreshpage").click(function() {
    // Remove all button highlights
    $(".refreshpage").removeClass("selected");
    // Add highlight to the button you just clicked
    $(this).addClass("selected");
    // Identify which button you just clicked
    var index = $('.refreshpage').index(this);
    $("#content").fadeOut(300, function() {
        // Load the page that the index corresponds to
        $("#content").load(pages[index], function() {
            $("#content").fadeIn(300);
        });
    });
});

// Determine if the logout button is clicked
$("#logOut").click(function() {
    // Send a request to the API to log the user out
    $.post({
        url: "http://35.189.45.152:8080/api/v1/user/Logout",
        complete: function() {
            // When the request has been made, prompt to show the login box again, and say that you have logged out.
            $.when(checkLogin()).done(function() {
                $("#errors").html("Successfully logged out!")
            })
        },
        xhrFields: {
            // Send the cookies with our request as well
            withCredentials: true
        }
    })
});
