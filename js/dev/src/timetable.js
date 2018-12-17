import Period from "period";
import moment from "moment";
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

function setContrast(rgb) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb).slice(1).map(parseInt);
  return (result[0] * 299 + result[1] * 587 + result[2] * 114) / 1000 > 125 ? "black" : "white";
}

function getKeys(obj, keys) {
  let new_obj = {};
  keys.forEach(key => new_obj[key] = obj[key]);
  return new_obj;
}

function organiseTimetable(items) {
  const period_names = ["0", "RC", "1", "2", "3", "4", "5", "6"];
  let days = [];

  for (let _ = 0; _ < 10; _++) {
    days.push([]);
  }

  for (let item of items) {
    let period = new Period(item);
    days[period.day - 1][period_names.indexOf(period.period)] = period;
  }

  return days;
}

function periodsToHTML(periods, cur_period) {
  let period_row = "<tr>";
  let cur_day = cur_period === undefined ? undefined : cur_period[0];

  for (let i = 0; i < periods.length; i++) {
    let period = periods[i];

    if (period === undefined) {
      period_row += "<td></td>";
    }
    else {
      const colour = stringToColour(period.class);
      const contrast = setContrast(colour);

      period_row += `<td style="background-color: ${colour}" ${cur_day === i ? "class=\"current\"" : ""}>
                <span class="class" style="color: ${contrast}">${period.class}</span>
                <span class="room" style="color: ${contrast}">${period.room}</span>
                <span class="teacher" style="color: ${contrast}">${period.teacher}</span>
            </td>`;
    }
  }

  return period_row;
}

function drawTimetable(content, cur_period) {
  console.log(cur_period);
  const days = organiseTimetable(content);
  let days_html = "";
  let day_names = [
    "Monday A", "Tuesday A", "Wednesday A", "Thursday A", "Friday A",
    "Monday B", "Tuesday B", "Wednesday B", "Thursday B", "Friday B"
  ];


  for (let a = 0; a < 10; a += 5) {
    days_html += "<table><tr>";
    let week_headers = day_names.slice(a, a + 5).map(name => `<th>${name}</th>`);

    days_html += week_headers.join("");

    for (let b = 0; b < 8; b++) {
      let periods = days.slice(a, a + 5).map(day => day[b]);
      
      if (cur_period === undefined) {
        days_html += periodsToHTML(periods, undefined);
      } else {
        let check = (Math.floor(cur_period[0] / 5) * 5 === a) && (cur_period[1] === b);
        days_html += periodsToHTML(periods, check ? [cur_period[0] % 5, cur_period[1]] : undefined);
      }
    }

    days_html += "</table>";
  }

  $("#timetable").html(days_html);
}

function parseTimes(string) {
  let times = string.split(" - ");
  return times.map(time => {
    let today = moment().format("Y M D ");
    return moment(today + time, "YYYY MM DD hh:mm a");
  });
}

// Turns the string representation of times to moment() objects,
// which can be compared
function parseBellTimes(data) {
  let times = [];
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let periods = ["1", "2", "3", "4", "5", "6"];

  for (let day in data) {
    let day_index = days.indexOf(day);
    let day_times = [];

    for (let _ = 0; _ < 5; _++) {
      day_times.push([]);
    }

    for (let period in data[day]) {
      if (periods.indexOf(period) !== -1) {
        day_times[periods.indexOf(period)] = parseTimes(data[day][period]);
      }
    }

    times[day_index] = day_times;
  }

  return times;
}

// Fetch bell times from API, dynamic (i.e. changes based on factors such as
// whether assembly's on or not)
function getBellTimes(completion) {
  $.get({
    url: "http://35.189.50.185:8080/api/v1/belltimes/Get",
    success: (data) => {
      const content = data["Message"]["Body"][0];
      completion(parseBellTimes(content));
    },
    xhrFields: {
      withCredentials: true
    }
  });
}

// Fetch the current week ("A" or "B")
function getCurrentWeek(completion) {
  $.get({
    url: "http://35.189.50.185:8080/api/v1/week/Get",
    success: (data) => {
      const content = data["Message"]["Body"];
      completion(content);
    },
    xhrFields: {
      withCredentials: true
    }
  });
}

function currentPeriod(times, week) {
  const current_time = moment();
  let current_day = current_time.day() - 1;

  if (current_day == -1 || current_day == 5) current_day = 0;

  const day = (week === "A" ? 0 : 5) + current_day;
  let period = undefined;

  console.log(current_day);
  console.log(times);

  // Currently period 0 and roll call are not included in the API,
  // change line 159 to `period = a;` once these are included
  for (let a = 0; a < times[current_day].length; a++) {
    const period_times = times[current_day][a];
    console.log(`${period_times}, ${a}`);

    if (period_times[0].isBefore(current_time) && current_time.isBefore(period_times[1])) {
      console.log("Right time");
      period = a + 2;
    }
  }

  // Return completion handler - if period is undefined (i.e. it does
  // correspond to any period), return undefined, else return the current
  // day and period
  return period === undefined ? undefined : [day, period];
}

// Fetches the current period, based on the bell times and current week
function getCurrentPeriod(completion) {
  getBellTimes(times => {
    getCurrentWeek(week => {
      completion(currentPeriod(times, week));
    });
  });
}

// Get the current timetable, given the current period
function getTimetable(cur_period) {
  $.get({
    url: "http://35.189.50.185:8080/api/v1/timetable/Get",
    success: (data) => {
      const content = data["Message"]["Body"][0];
      drawTimetable(content, cur_period);
    },
    xhrFields: {
      withCredentials: true
    }
  });
}

$(document).ready(function(){
  getCurrentPeriod(period => getTimetable(period));
  // Load away the loader
  $(".wrapper").fadeOut(300);
  $('.wrapper').hide();
});
