//minesweeper

function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

var grid;
var cols;
var rows;
var w = 18;

var totalmines = 10;
var flags = 0;
var minesRevealed = 0;

var won = false;
var lost = false;

function startMinesweeper() {
    won = false
    lost = false
    flags = 0;
    minesRevealed = 0;

    cols = 15;
    rows = 15;
    if(!grid){
        grid = make2DArray(cols, rows);
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j] = new Cell(i, j, w, flags);
            }
        }
    }

    //remove all mines
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].mine = false;
            grid[i][j].revealed = false;
            grid[i][j].flagged = false;
        }
    }

    //pick totalmines spots
    var options = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for (var n = 0; n < totalmines; n++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        //deletes that spot so it's no longer an option
        options.splice(index, 1);
        grid[i][j].mine = true;
    }


    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].countmines();
        }
    }
}

function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
            lost = true
        }
    }
}

function win() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if(!grid[i][j].mine){
                grid[i][j].revealed = true;
            }
        }
    }
    won = true;
}

function clicked(left) {
    if(won || lost){
        startMinesweeper();
        console.log("win")
    }else{
        minesRevealed = 0;
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY)) {
                    if (left) {
                        if (grid[i][j].reveal()) {
                            gameOver();
                        }
                    } else if (!left) {
                        flags = grid[i][j].flag(flags, totalmines);
                    }
                }
                if(grid[i][j].revealed){
                    minesRevealed++;
                }
            }
        }
    }

    if(flags == totalmines && minesRevealed >= rows * cols - totalmines){
        win();
    }
}

function newFrame() {
    if(!won){
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j].show();
            }
        }
    }else{
        fill(127);
        textSize(50);
        text("YOU WIN!", width/2, height/2);
        textSize(20);
        text("Click to Restart", width/2, height/2 + 50);
    }
}