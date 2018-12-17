import $ from 'jquery';
import Event from './Event';


// Function to create an event given a event class 
function createEvent(event) {
    var dataString = ""
    // Set up a post request
    $.post({
        url: "http://35.189.45.152:8080/api/v1/events/Create",
        data: {
            Event_Name: event.name,
            Event_Start: event.start,
            Event_End: event.end,
            Event_Location: event.location,
            Event_Short_Desc: event.start,
            Event_Long_Desc: event.longDesc
        },
        success: function(data) {
            // Parse the data
            const data = data["Message"]["Body"][0];
            dataString = data;
        }
    });
}