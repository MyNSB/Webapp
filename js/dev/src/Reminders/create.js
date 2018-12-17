import $ from "jquery"
import Reminder from './Reminder'

// Function to create a reminder from a specific reminder object
function createReminder(Reminder) {
    var rawdata = "";
    // Set up an ajax post request
    $.post({
        url: "http://35.189.45.152:8080/api/v1/reminders/Create",
        data: {
            Body: Reminder.body,
            Subject: Reminder.subject,
            Reminder_Date_Time: Reminder.time,
            Tags: '["general"]'
        },
        xhrFields: {
            withCredentials: true;
        },
        success: function(data) {
            const response = data["Message"]["Body"][0]
            rawdata = response
        }
    });


    return rawdata;
}