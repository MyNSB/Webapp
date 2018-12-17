var globals = [];
var pages = ['pages/dashboard.html', 'pages/timetable.html', 'pages/calendar.html', 'pages/reminders.html', 'pages/4u.html'];
var http = new HTTP()


// File requires http.js to be included


$(document).ready(function() {
    
    $.get({
        // Construct request
        url: "http://35.189.50.185:8080/api/v1/user/GetDetails",
        async: false,
        xhrFields: {
            // Send the cookies with our request as well
            withCredentials: true
        },
        
        // User is already authenticated. Save user data for future use.
        success: function(data) {
            return
        },

        // Either not logged in or an admin
        error: function(data) {
            $.get({
                // Check if admin
                url: "http://35.189.50.185:8080/api/v1/admin/GetDetails",
                async: false,
                xhrFields: {
                    // Send the cookies with our request as well
                    withCredentials: true
                },
                success: function(data) {
                    return
                },
                error: function(data) {
                   
                }  
            })
        }
    });
});

// Determine if a button in the side nav is clicked
$(".refreshpage").click(function() {
    // Remove all button highlights
    $(".refreshpage").removeClass("selected");
    // Add highlight to the button you just clicked
    $(this).addClass("selected");
    // Identify which button you just clicked
    var index = $('.refreshpage').index(this);
    $("#content").fadeOut(300, function() {
        // Set up the loader animation
        $(".wrapper").show();
        
        // Load the page that the index corresponds to
        $("#content").load(pages[index], function() {
            $("#content").fadeIn(300);
        });
    });
});

// Determine if the logout button is clicked ######## NEED TO REWRITE
$("#logOut").click(function() {
    // Send a request to the API to log the user out
    $.post({
        url: "http://35.189.50.185:8080/api/v1/user/Logout",
        complete: function() {
            // When the request has been made, prompt to show the login box again, and say that you have logged out.
            $.when(checkLogin()).done(function() {
                $("#errors").html("Successfully logged out!");
            });
        },
        xhrFields: {
            // Send the cookies with our request as well
            withCredentials: true
        }
    });
});
    