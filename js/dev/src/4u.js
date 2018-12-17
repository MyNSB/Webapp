import $ from "jquery";
import bridget from "bridget";
import Packery from "packery";
import Masonry from "masonry";
import Cell from "cell";

// Bind the Isotope class as a jQuery extension
$.bridget("masonry", Masonry);

// Add functionality from the Isotope library into #articles
// (Isotope is a library similar to shuffle.js)
$("#articles").masonry({
    itemSelector: ".article",
    columnWidth: 300
});

// Generate a HTML version of an instance of Cell class
function cellToHTML(cell) {
    let cell_html = `<div class="article ${cell.is_large ? "article-large" : ""}">
        <img src="${cell.image}">
        <div class="details">
            <div class="title">${cell.title}</div>
            <div class="desc">${cell.desc}</div>
        </div>
    </div>`;
    
    $("#articles").append(cell_html);
}

// GET all available articles from the API, and convert each one
// into a HTML format
function generateCells() {
    $.get("http://35.189.45.152:8080/api/v1/4U/Get", {}, data => {
        const content = data["Message"]["Body"][0];
        for (let item of content) {
            let cell = new Cell(item);
            cellToHTML(cell);
        }
    });
}

// Functions to be launched when $(document) is loaded
$(document).ready(() => {
    generateCells();
});
