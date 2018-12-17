import $ from 'jquery';
import Event from './Event';

// Function to load events into a specific div
function loadInto(source) {
    var data = getEventsRaw();

    // Iterate over returned rawEventsData
    for (let eventRaw of data) {
        // Create a temporary event class instance
        var event = new Event(
            eventRaw["EventName"], eventRaw["EventStart"], 
            eventRaw["EventEnd"], eventRaw["EventLocation"], 
            eventRaw["EventShortDesc"], eventRaw["EventLongDesc"],
            eventRaw["EventOrganiser"], eventRaw["EventPictureURL"]
        );

        // Get the html data and append to the source view
        source.append(getEventView(event));
    }
}


// Function to get the even view as html
function getEventView(Event) {
    let eventHtml = `<div class="event">
                        <p class="eventName">${Event.name}</p>
                        <p class="event-date">${Event.start} - ${Event.end}</p>
                        <p class="event-organiser">${Event.organiser}</p>
                        <p class="event-location">${Event.location}</p>
                        <p class="event-desc">${Event.shortDesc}</p>
                        <img class="event-image" src="${Event.imageURL}">
                    </div>`

    return eventHtml;
}



// Get the events as a raw json string
function getEventsRaw() {
    // Setuo a http request
    var dataStr = "";

    $.get({
        url: "http://35.189.45.152:8080/api/v1/events/Get",
        succesS: function(data) {
            const body = data["Message"]["Body"][0];
            dataStr = body;
        }
    });

    return dataStr;
}