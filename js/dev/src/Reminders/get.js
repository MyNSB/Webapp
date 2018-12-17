import $ from "jquery"
import Reminder from "./Reminder"

// Function to load reminders into a specific div
function loadInto(source) {
    var data = getRemindersRaw()

    // Iterate over reminders
    for (let reminderRaw of data) {
        // Create a new reminder
        reminder = new Reminder(reminderRaw["Headers"]["Subject"], reminderRaw["Body"], reminderRaw["ReminderDateTime"])
        
        source.append(newReminderView(reminder))
    }
}

function newReminderView(reminder) {
    let reminderHtml = `<div class="reminder">
                            <p class="reminderName">${eminder.subject}</p>
                            <p class="body">${reminder.body}</p>
                            <p class="dateTime">$r{eminder.time}</p>
                        </div>`
                        
    return reminderHtml                    
}


// Function to get the raw reminders string
function getRemindersRaw() {
    var dataStr = ""
    // Setup an ajax request
    $.get({
        url: "http://35.189.45.152:8080/api/v1/reminders/Get/Today",
        success: function(data) {
            const content = data["Message"]["Body"][0]
            dataStr = content
        },
        xhrFields: {
            withCredentials: true
        }
    });
}