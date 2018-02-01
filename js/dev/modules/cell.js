// Cell counter, determines if the cell should be of a predetermined
// size (small when cell_counter <= 5, large when cell_counter >= 8)
// or random
let cell_counter = 0;

// Pseudo-randomly generates the size of a cell, either small or large
function generateSize() {
    cell_counter += 1;
    
    if (cell_counter <= 5) {
        return false;
    } else if (cell_counter >= 8) {
        cell_counter = 0;
        return true;
    } else {
        let size = Math.floor(Math.random() * 2) === 0;
        if (size) cell_counter = 0;
        
        return size;
    }
}

// A class for an article's "cell" - essentially a data structure,
// converts JSON into parameters for an article cell
class Cell {
    constructor(json) {
        this.image = json["ArticleImageUrl"];
        this.title = json["ArticleName"];
        this.desc = json["ArticleDesc"];
        this.is_large = generateSize();
    }
}

// Export the Cell class to be used in ../main.js
module.exports = Cell;