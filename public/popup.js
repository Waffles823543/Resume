function Popup(type, cx, cy, w, h, col) {
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.h = h;
    this.col = col;
    this.type = type;
    this.movable = false;

    this.isOpen = false;
    this.canScroll = true;

    this.currScroll = 0;

    this.textBoxes = [];
    this.games = [];

    this.x = this.cx - this.w / 2;
    this.y = this.cy - this.h / 2

    this.toggle = function() {
        this.isOpen = !this.isOpen;
        if (this.type == popupTypes.MENU) {
            meaningfulButton.isVisible = !meaningfulButton.isVisible;
            meaninglessButton.isVisible = !meaninglessButton.isVisible;
        }
        for (var i = 0; i < this.textBoxes.length; i++) {
            this.textBoxes[i].w = this.w;
            this.textBoxes[i].y = this.y + textHeight * i + 10;
            if (!this.textBoxes[i].isImage) {
                this.textBoxes[i].x = this.x;
            } else {
                this.textBoxes[i].x = this.x + 20;
            }
        }
        if (this.isOpen) {
            this.games.forEach(i => {
                i.init();
                console.log(i);

            });
        }
    }

    this.draw = function() {
        stroke(140);
        strokeWeight(5);
        fill(this.col)
        if (this.isOpen) {
            rectMode(CORNER);
            rect(this.x, this.y, this.w, this.h);
        }
    }

    this.drawText = function() {
        stroke(140);
        strokeWeight(5);
        fill(this.col)
        if (this.isOpen) {
            this.textBoxes.forEach((i) => {
                i.draw(this.y, this.y + this.h - textHeight);
            })
            this.games.forEach((i) => {
                i.draw();
            })
        }
    }

    this.scrollDown = function(amt) {
        this.currScroll += amt / 2;
        if (this.canScroll && this.currScroll <= 0 && this.currScroll > this.h - this.textBoxes.length * textHeight) {
            this.textBoxes.forEach((i) => {
                i.y += amt / 2;
            });
        } else {
            this.currScroll -= amt / 2;
        }
    }

    this.checkColl = function(x2, y2) {
        if (x2 > this.x && x2 < this.x + this.w && this.isOpen) {
            if (y2 > this.y && y2 < this.y + this.h) {
                return true;
            }
        }
    }

    this.clicked = function() {
        this.games.forEach((i) => {
            i.clicked();
        })
    }
}

function textBox(myText, size) {
    this.myText = myText;
    this.size = size;
    this.x;
    this.y;
    this.w;

    this.isImage = false;

    //          upper limit, lower limit
    this.draw = function(UL, LL) {
        strokeWeight(3);
        textSize(this.size)
        if (this.y > UL && this.y < LL) {
            textAlign(CENTER, TOP);
            text(this.myText, this.x, this.y, this.w, 40);


            // text bounding boxes
            // rectMode(CORNER);
            // fill(255, 255, 0, 100)
            // rect(this.x, this.y, this.w, textHeight)
        }
    }
}

function imageBox(img, size) {
    this.img = img;
    this.x;
    this.y;
    this.w;

    this.isImage = true;

    //          upper limit, lower limit
    this.draw = function(UL, LL) {
        if (this.y > UL && this.y < LL) {
            image(img, this.x, this.y);

            // text bounding boxes
            // rectMode(CORNER);
            // fill(255, 255, 0, 100)
            // rect(this.x, this.y, this.w, textHeight)
        }
    }
}

function game(sketch) {
    this.sketch = sketch;
    this.x;
    this.y

    this.isImage = false;

    this.init = function(UL, LL) {
        startMinesweeper();
    }

    this.draw = function() {
        newFrame();
    }

    this.clicked = function(left) {
        clicked(left);
    }
}