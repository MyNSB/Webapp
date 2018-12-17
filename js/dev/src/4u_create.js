import $ from "jquery";

function createArticle(name, desc, link, image) {
    $.post({
        url: "http://35.189.45.152:8080/4U/Create",
        data: {
            "Post_Name": name,
            "Post_Desc": desc,
            "Link": link,
            "Post_Type": "Issue",
            "Caption_Image": image
        },
        success: (data) => {
            console.log("Success!");
        },
        xhrFields: {
            withCredentials: true
        }
    });
}

$(document).ready(() => {
});