import $ from "jquery";
import bridget from "bridget";
import Isotope from "isotope";
import Cell from "cell";

// Bind the Isotope class as a jQuery extension
$.bridget("isotope", Isotope);

// Add functionality from the Isotope library into #articles
// (Isotope is a library similar to shuffle.js)
function isotopeArticles() {
    $("#articles").isotope({
        itemSelector: ".article",
        layoutMode: "fitRows"
    });
}

// Generate a HTML version of an instance of Cell class
function newCell(cell) {
    let cell_html = `<div class="article ${cell.is_large ? "grid-large" : "grid-small"}">
        <img src="${cell.image}">
        <div class="title">${cell.title}</div>
        <div class="desc">${cell.desc}</div>
    </div>`;
    
    console.log(cell_html);
    $("#articles").append(cell_html);
}

// GET all available articles from the API, and convert each one
// into a HTML format
function generateCells() {
    $.getJSON("js/backend/backend.php", {}, content => {
        for (let item of content) {
            let cell = new Cell(item);
            newCell(cell);
        }
    });
}

// Functions to be launched when $(document) is loaded
$(document).ready(() => {
    isotopeArticles();
    generateCells();
});
