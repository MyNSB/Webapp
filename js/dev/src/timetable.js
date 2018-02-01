import Period from "period";
import $ from "jquery";

function stringToColour(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  
  return colour;
}

function getKeys(obj, keys) {
    let new_obj = {};
    keys.forEach(key => new_obj[key] = obj[key]);
    return new_obj;
}

function organiseTimetable(items) {
    const period_names = ["0", "RC", "1", "2", "3", "4", "5", "6"];
    let days = new Array(10).fill(new Array(8).fill(null));
    
    for (let item of items) {
        let period = new Period(item);
        days[period.day][period_names.indexOf(period.period)] = period;
    }
    
    return days;
}

function dayToHtml(day) {
    let day_html = "<div class=\"day\">";
    
    for (let period of day) {
        if (period === null) {
            day_html += "<div class=\"empty-period\"></div>";
        } else {
            day_html += `<div class="period" style="color: ${stringToColour(period.class)}">
                <p>${period.class}</p>
                <p>${period.room}</p>
                <p>${period.teacher}</p>
            </div>`;
        }
    }
    
    day_html += "</div>";
    return day_html;
}

function drawTimetable(content) {
    const days = organiseTimetable(content);
    const days_html = [];
    
    for (let day of days) {
        days_html.push(dayToHtml(day));
    }
    
    console.log(days_html);
    
    // Insert table-drawing stuff here
}

function getTimetable() {
    $.get({
        url: "http://35.189.45.152:8080/api/v1/timetable/Get",
        success: (data) => {
            let content = data["Message"]["Body"][0];
            drawTimetable(content);
        },
        xhrFields: {
            withCredentials: true
        }
    });
}

$(document).ready(() => {
    getTimetable();
});
