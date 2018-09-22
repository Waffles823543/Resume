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

    this.toggle = function() {
        this.isOpen = !this.isOpen;
        if(this.type == popupTypes.MENU){
            meaningfulButton.isVisible = !meaningfulButton.isVisible;
            meaninglessButton.isVisible = !meaninglessButton.isVisible;
        }
        for (var i = 0; i < this.textBoxes.length; i++){
            this.textBoxes[i].x = this.x;
            this.textBoxes[i].y = this.y + textHeight*i + 1;
            this.textBoxes[i].w = this.w;
        }
        console.log(menuPopup.textBoxes)
    }

    this.draw = function() {
        this.x = this.cx - this.w/2;
        this.y = this.cy - this.h/2;
        
        stroke(140);
        strokeWeight(5);
        fill(this.col)
        if (this.isOpen) {
            rectMode(CORNER);
            rect(this.x, this.y, this.w, this.h);
        }
    }

    this.drawText = function(){
        stroke(140);
        strokeWeight(5);
        fill(this.col)
        if (this.isOpen) {
            this.textBoxes.forEach((i) => {
                i.draw(this.y, this.cy + this.h/2 - textHeight);
            })
        }
    }

    this.scrollDown = function(amt){
        this.currScroll += amt/2;
        if(this.canScroll && this.currScroll <= 0 && this.currScroll > this.h - this.textBoxes.length * textHeight){
            this.textBoxes.forEach((i) => {
                i.y += amt/2;
            });
        }else{
            this.currScroll -= amt/2;
        }
        console.log(this.type, this.canScroll, this.currScroll, this.h - this.textBoxes.length * textHeight)
    }

    this.checkColl = function(x2, y2){
        if (x2 > this.x && x2 < this.x + this.w && this.isOpen) {
            if (y2 > this.y && y2 < this.y + this.h) {
                return true;
            }
        }
    }
}

function textBox(myText, size){
    this.myText = myText;
    this.size = size;
    this.x;
    this.y;
    this.w;

    //          upper limit, lower limit
    this.draw = function(UL, LL){
        textAlign(CENTER, CENTER);
        strokeWeight(3);
        textSize(this.size)
        if(this.y > UL && this.y < LL){
            text(this.myText, this.x, this.y, this.w, 40);

            // text bounding boxes
            // rectMode(CORNER);
            // fill(255, 255, 0, 100)
            // rect(this.x, this.y, this.w, textHeight)
        }
    }
}