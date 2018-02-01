import $ from "jquery";

function getKeys(obj, keys) {
    let new_obj = {};
    keys.forEach(key => new_obj[key] = obj[key]);
    return new_obj;
}

function organiseTimetable(items) {
    const period_names = ["0", "RC", "1", "2", "3", "4", "5", "6"];
    let days = new Array(10).fill(new Array(8));
    
    for (let item of items) {
        let day = item["day"];
        let period = item["period"];
        
        days[day][period_names.findIndex(p => period === p)] = getKeys(item, ["class", "room", "teacher"]);
    }
    
    return days;
}

function drawTimetable() {
}

function getTimetable() {
    $.get({
        url: "http://35.189.45.152:8080/api/v1/timetable/Get",
        success: (data) => {
            let content = data["Message"]["Body"][0];
            content = organiseTimetable(content);
        },
        xhrFields: {
            withCredentials: true
        }
    });
}

$(document).ready(() => {
    getTimetable();
});