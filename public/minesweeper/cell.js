function Cell(i, j, w) {
    this.offsetX = (width / 2) - ((cols / 2) * w);
    this.offsetY = (height / 2) - ((rows / 2) * w);
    this.i = i;
    this.j = j;
    this.x = i * w + this.offsetX;
    this.y = j * w + this.offsetY;
    this.w = w;
    this.neighborCount = 0;

    this.mine = false;
    this.revealed = false;
    this.flagged = false;
}

Cell.prototype.show = function() {
    stroke(0);
    strokeWeight(2);
    fill(225);
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.mine) {
            fill(127);
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        }else { 
            fill(127);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER, TOP);
                textSize(this.w);
                fill(0);
                text(this.neighborCount, this.x + this.w * 0.5, this.y);
            }
        }
    }else  if (this.flagged){
        fill(127);
        stroke(0);
        textSize(20)
        text('P', this.x + w/2, this.y);
    }
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
    if(!this.flagged){
        this.revealed = true;
        if (this.neighborCount == 0) {
            //flood fill time
            this.floodfill();
        }
        return this.mine;
    }else{
        return false;
    }
}

Cell.prototype.flag = function(flags, mineCount) {
    console.log(flags)
    if (this.flagged){
        this.flagged = false
        return flags - 1;
    }else if(flags < mineCount && !this.revealed){
        this.flagged = true;
        return flags + 1;
    }else{
        return flags
    }
}

Cell.prototype.countmines = function() {
    if (this.mine) {
        this.neighborCount = -1;
        return;
    }
    var total = 0;

    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (neighbor.mine) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.floodfill = function() {
    for (var xoff = -1; xoff <= 1; xoff++) {
        for (var yoff = -1; yoff <= 1; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (!neighbor.mine && !neighbor.revealed) {
                    neighbor.reveal();
                }
            }
        }
    }
}