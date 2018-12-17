var globals = [];
var pages = ['pages/dashboard.html', 'pages/timetable.html', 'pages/calendar.html', 'pages/reminders.html', 'pages/4u.html'];
var http = new HTTP()


// File requires http.js to be included


$(document).ready(function() {
    //// Send a request to the getDetails endpoint to retrieve the user's details
    http.get("/user/GetDetails", {}, {
        "success": function() {
            return
        },
        // Looks like they are not
        "failure": function(data) {
            // Check if they are an admin
            http.get("/admin/GetDetails", {}, {
                // Redirect them to the admin page
                "success": function() {
                    return
                },
                "failure": function(data) {
                    // Not logged in; Redirect to login screen. ### NEED TO FIND IF THIS CAN CAUSE A LOOP
                    window.location.replace("/");
                }
            })   
        }
    })
})


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
