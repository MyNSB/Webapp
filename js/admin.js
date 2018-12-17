global = {}

$(document).ready(function() {
    $.get({
        // Construct request
        url: "http://35.189.50.185:8080/api/v1/user/GetDetails",
        async: false,
        xhrFields: {
            // Send the cookies with our request as well
            withCredentials: true
        },
        
        // Authenticated as a user. Redirect to dashboard.
        success: function(data) {
            window.location.replace("/dashboard.html");
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
                    var username = data.Message.Body[0].AdminName.toLowerCase()
                    $("#username").html(username.charAt(0).toUpperCase() + username.slice(1))
                    $("#overlay").fadeOut();
                },
                error: function(data) {
                    // Not logged in; Redirect to login screen. ### NEED TO FIND IF THIS CAN CAUSE A LOOP
                    window.location.replace("/");
                }  
            })
        }
    });
});