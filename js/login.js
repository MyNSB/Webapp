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
            // Insert the user into globals
            data = data.message;
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
                    // Redirect to admin page
                    window.location.replace("/admin.html");
                },
                error: function(data) {
                    $("#overlay").fadeOut();
                }  
            })
        }
    });
});
$("#submit").click(function(){
    $("#message").html(randomMessage)
    $("#overlay").fadeIn();
    var userID = $("#userID").val();
    var password = $("#password").val();
     $.post({
        // Get the api to handle the auth
        url: "http://35.189.50.185:8080/api/v1/user/Auth",
        // Attach the basic auth headers
        beforeSend: function(xhr) {
            // Set the header
            xhr.setRequestHeader("Authorization", "Basic " + btoa(userID + ":" + password));
        },
        xhrFields: {
            // Send the cookies with our request as well
            withCredentials: true
        },
        success: function(data) {
            window.location.replace("/dashboard.html");
        },
        error: function(data) {
            $.post({
                // Get the api to handle the auth
                url: "http://35.189.50.185:8080/api/v1/admin/Auth",
                // Attach the basic auth headers
                beforeSend: function(xhr) {
                // Set the header
                xhr.setRequestHeader("Authorization", "Basic " + btoa(userID + ":" + password));
                },
                xhrFields: {
                    // Send the cookies with our request as well
                    withCredentials: true
                },
                success: function(data) {
                    window.location.replace("/admin.html");
                },
                error: function(data) {
                    $("#overlay").fadeOut();
                    setTimeout(function() {
                        $("#submit").animate({ backgroundColor: jQuery.Color( "#F00")}, 250 )
                        $("#submit").animate({ backgroundColor: jQuery.Color( "#2196F3")}, 250 );
                        $("#submit").addClass('shake');
                        setTimeout(function(){
                            $("#submit").removeClass('shake');
                            
                        }, 500);
                    }, 400)
                }
            })
        }
     })
    return false
})