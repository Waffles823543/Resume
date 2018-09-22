//task bar variables
var taskBarHeight = 40;

//menu button variables
var menuButtonWidth = 100;
var menuButtonPopupWidth = 250;
var menuButtonPopupHeight = 350;

//icon variables
var buffer = 10;
var defIconWidth = 50;
var defIconHeight = 50;

// clickable variables
var clickables = [];
var clickableTypes = {
    MENU: "MENU",
    TRASH: "TRASH",
    BULLET_BOUNCE: "BULLET_BOUNCE",
    GITHUB: "GITHUB",
    MEANINGFUL: "MEANINGFUL",
    MEANINGLESS: "MEANINGLESS"
}

// images
var bg;
var trashI;
var githubI;
var bulletBounceI;
var menuI;
var menuItemI;

//popup varibles
var textHeight = 30;
var popups = []
var popupTypes = {
    MENU: "MENU",
    TRASH: "TRASH",
    MEANINGFUL: "MEANINGFUL",
    MEANINGLESS: "MEANINGLESS"
}

//menu item variables
var menuItems = [];

//dragging variables
var startX;
var startY;
var dragBox = [0, 0, 0, 0];
var draggingPopup;
var popupDragStartX;
var popupDragStartY;
var canDrag = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    // load images
    bg = loadImage("./images/background.png");
    trashI = loadImage("./images/trash.png");
    githubI = loadImage("./images/github.png");
    bulletBounceI = loadImage("./images/BBLogo.png");
    menuI = loadImage("./images/menu.png");
    menuItemI = loadImage("./images/menuItemBackground.png");

    //desktop icons
    var trashIcon = new Clickable(clickableTypes.TRASH, buffer, buffer, defIconWidth, defIconHeight, color(0, 0, 0, 0), trashI);
    var githubIcon = new Clickable(clickableTypes.GITHUB, buffer, defIconHeight + buffer * 2, defIconWidth, defIconHeight, color(50, 250, 80, 0), githubI);
    var bulletBounceIcon = new Clickable(clickableTypes.BULLET_BOUNCE, buffer, defIconHeight * 2 + buffer * 3, defIconWidth, defIconHeight, color(0, 0, 0, 0), bulletBounceI);
    clickables.push(trashIcon);
    clickables.push(githubIcon);
    clickables.push(bulletBounceIcon);

    //menu button
    menuButton = new Clickable(clickableTypes.MENU, 0, height - taskBarHeight, menuButtonWidth, taskBarHeight, color(0, 0, 0, 0), menuI);
    clickables.push(menuButton);

    //menu items
    meaningfulButton = new Clickable(clickableTypes.MEANINGFUL, 5, height-taskBarHeight-menuButtonPopupHeight + 5, menuButtonPopupWidth-10, 30, color(0, 0, 0), menuItemI)
    meaninglessButton = new Clickable(clickableTypes.MEANINGLESS, 5, height-taskBarHeight-menuButtonPopupHeight + 35, menuButtonPopupWidth-10, 30, color(0, 0, 0), menuItemI)
    meaningfulButton.isVisible = false;
    meaninglessButton.isVisible = false;
    menuItems.push(meaningfulButton);
    menuItems.push(meaninglessButton);

    //trash popup
    trashPopup = new Popup(popupTypes.TRASH, width/2, height/2, 300, 500, color(225, 225, 225));
    trashPopup.textBoxes.push(new textBox("Trash", 24));
    trashPopup.movable = true;
    popups.push(trashPopup);

    //menu popup
    menuPopup = new Popup(popupTypes.MENU, menuButtonPopupWidth/2, height-taskBarHeight-(menuButtonPopupHeight/2), menuButtonPopupWidth, menuButtonPopupHeight, color(225, 225, 225));
    menuPopup.canScroll = false;
    menuPopup.textBoxes.push(new textBox("Meaningful things I've done", 15));
    menuPopup.textBoxes.push(new textBox("Meaningless things I've done", 15));
    popups.push(menuPopup);
    console.log(menuPopup.textBoxes)

    //menu item popups
    meaningfulPopup = new Popup(popupTypes.MEANINGFUL, menuButtonPopupWidth+150+10, height/2, 300, 500, color(225, 225, 225));
    meaningfulPopup.textBoxes.push(new textBox("Meaningful things", 24));
    meaningfulPopup.textBoxes.push(new textBox("I got top 1% for the digital technologies ICAS", 12));
    popups.push(meaningfulPopup);

    meaninglessPopup = new Popup(popupTypes.MEANINGLESS, menuButtonPopupWidth+150+10, height/2 + 30, 300, 500, color(225, 225, 225));
    meaninglessPopup.textBoxes.push(new textBox("Meaningless things", 24));
    meaninglessPopup.textBoxes.push(new textBox("I can move my eyebrows independently of each other", 12));
    meaninglessPopup.textBoxes.push(new textBox("I can wiggle my ears", 12));
    popups.push(meaninglessPopup);
}

function draw() {
    //background
    background(bg);

    fill(18, 90, 183, 100);
    stroke(51, 51, 255, 150);
    strokeWeight(1)
    rectMode(CORNERS);
    rect(dragBox[0], dragBox[1], dragBox[2], dragBox[3])

    //taskbar
    noStroke();
    fill(40, 65, 90);
    rectMode(CORNER);
    rect(0, height - taskBarHeight, width, taskBarHeight);

    //draw clickables
    clickables.forEach((i) => {
        i.draw();
    });

    //try to draw popups
    popups.forEach((i) => {
        i.draw();
    });

    //try to draw menuItems
    menuItems.forEach((i) => {
        i.draw();
    });

    //draw all the popup text
    popups.forEach((i) => {
        i.drawText();
    })

}

function Clickable(type, x, y, w, h, col, icon) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.type = type;
    this.icon = icon;

    this.isVisible = true;

    this.imgH = this.icon.height/(this.icon.height/this.h);
    this.imgW = this.icon.width/(this.icon.width/this.w);

    this.draw = function() {
        noStroke();
        fill(this.col);
        if(this.isVisible){
            rectMode(CORNER);
            rect(this.x, this.y, this.w, this.h)
            image(this.icon, this.x, this.y, this.imgW, this.imgH);
        }
    }

    this.checkColl = function(x2, y2) {
        if (x2 > this.x && x2 < this.x + this.w && this.isVisible) {
            if (y2 > this.y && y2 < this.y + this.h) {
                if(this.type == "GITHUB"){
                    window.open("http://github.com/Waffles823543");
                }else if(this.type == "BULLET_BOUNCE"){
                    window.open("https://www.code4fun.com.au/programming/code4fun-student-released-android-app");
                }else if(this.type == "MENU"){
                    if(meaningfulPopup.isOpen){
                        meaningfulPopup.toggle();
                    }
                    if(meaninglessPopup.isOpen){
                        meaninglessPopup.toggle();
                    }
                }else if(this.type == "MEANINGFUL" && meaninglessPopup.isOpen){
                    meaninglessPopup.toggle();
                }else if(this.type == "MEANINGLESS" && meaningfulPopup.isOpen){
                    meaningfulPopup.toggle();
                }
                popups.forEach((i) => {
                    if(i.type == this.type){
                        i.toggle();
                    }
                })
                console.log("clicked " + this.type);
                return true;
            }
        }
    }
}

//check clicks
function mousePressed() {
    clickables.forEach((i) => {
        if(!i.checkColl(mouseX, mouseY)){
            startX = mouseX;
            startY = mouseY;
            console.log("started dragging", dragBox);
        }
    });
    menuItems.forEach((i) => {
        if(!i.checkColl(mouseX, mouseY)){
            startX = mouseX;
            startY = mouseY;
            console.log("started dragging", dragBox);
        }
    });
    popups.forEach((i) => {
        if(i.checkColl(mouseX, mouseY)){
            draggingPopup = i.type;
            console.log("click popup " + i.type);
            popupDragStartX = i.cx;
            popupDragStartY = i.cy;
        }else{
            startX = mouseX;
            startY = mouseY;
        }
    });
}

//scroll down
function mouseWheel(event) {
    popups.forEach((i) => {
        i.scrollDown(-event.delta);
    })
}

function mouseDragged(){
    if(!draggingPopup){
        dragBox = [startX, startY, mouseX, mouseY];
        console.log("dragging", dragBox);
    }else{
        popups.forEach((i) => {
            if(i.type == draggingPopup && i.movable){
                i.cx = (mouseX - startX) + popupDragStartX;
                i.cy = (mouseY - startY) + popupDragStartY;
                for (var j = 0; j < i.textBoxes.length; j++){
                    i.textBoxes[j].x = i.x;
                    i.textBoxes[j].y = i.y + 30*j + 1;
                }
            }
        });
    }
}

function mouseReleased(){
    dragBox = [0, 0, 0, 0];
}