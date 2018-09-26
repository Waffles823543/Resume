//task bar variables
const taskBarHeight = 40;

//menu button variables
const menuButtonWidth = 100;
const menuButtonPopupWidth = 250;
const menuButtonPopupHeight = 350;

//icon variables
const buffer = 10;
const defIconWidth = 50;
const defIconHeight = 50;

// clickable variables
var clickables = [];
const clickableTypes = {
    MENU: "MENU",
    TRASH: "TRASH",
    BULLET_BOUNCE: "BULLET_BOUNCE",
    GITHUB: "GITHUB",
    MEANINGFUL: "MEANINGFUL",
    MEANINGLESS: "MEANINGLESS",
    EXP: "EXPERIENCE",
    SKILLS: "SKILLS"
}

// images
var bg;
var trashI;
var githubI;
var bulletBounceI;
var menuI;
var menuItemI;
var xpI;
var skillsI;
var skillsG;

//popup varibles
const textHeight = 30;
var popups = []
const popupTypes = {
    MENU: "MENU",
    TRASH: "TRASH",
    MEANINGFUL: "MEANINGFUL",
    MEANINGLESS: "MEANINGLESS",
    EXP: "EXPERIENCE",
    SKILLS: "SKILLS"
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
    xpI = loadImage("./images/xp.png");
    skillsI = loadImage("./images/Skills.png");
    skillsG = loadImage("./images/SkillsGraph.png");

    //desktop icons
    var trashIcon = new Clickable(clickableTypes.TRASH, buffer, buffer, defIconWidth, defIconHeight, color(0, 0, 0, 0), trashI);
    clickables.push(trashIcon);
    var githubIcon = new Clickable(clickableTypes.GITHUB, buffer, defIconHeight + buffer * 2, defIconWidth, defIconHeight, color(50, 250, 80, 0), githubI);
    clickables.push(githubIcon);
    var bulletBounceIcon = new Clickable(clickableTypes.BULLET_BOUNCE, buffer, defIconHeight * 2 + buffer * 3, defIconWidth, defIconHeight, color(0, 0, 0, 0), bulletBounceI);
    clickables.push(bulletBounceIcon);
    var ExpIcon = new Clickable(clickableTypes.EXP, buffer, defIconHeight * 3 + buffer * 4, defIconWidth, defIconHeight, color(50, 250, 80, 0), xpI);
    clickables.push(ExpIcon);
    var SkillsIcon = new Clickable(clickableTypes.SKILLS, buffer, defIconHeight * 4 + buffer * 5, defIconWidth, defIconHeight, color(50, 250, 80, 0), skillsI);
    clickables.push(SkillsIcon);

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
    trashPopup.textBoxes.push(new textBox("My hopes and dreams", 12));
    trashPopup.movable = true;
    popups.push(trashPopup);

    //expeirence popup
    experiencePopup = new Popup(popupTypes.EXP, width/2, height/2, 300, 500, color(225, 225, 225));
    experiencePopup.textBoxes.push(new textBox("My Previous Work Experience", 24));
    experiencePopup.textBoxes.push(new textBox("2-3 years of self taught programming", 12));
    experiencePopup.textBoxes.push(new textBox("3-4 years of going to programming classes and a bit of self taught", 12));
    experiencePopup.movable = true;
    popups.push(experiencePopup);

    //skills popup
    skillsPopup = new Popup(popupTypes.SKILLS, width/2, height/2, 300, 500, color(225, 225, 225));
    skillsPopup.textBoxes.push(new textBox("My Skills", 24));
    skillsPopup.textBoxes.push(new imageBox(skillsG));
    skillsPopup.movable = true;
    popups.push(skillsPopup);

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
    meaningfulPopup.textBoxes.push(new textBox("I got top 1% for the 2018 digital technologies ICAS", 12));
    meaningfulPopup.textBoxes.push(new textBox("I am in the selective stream (top 60) for my year", 12));
    meaningfulPopup.textBoxes.push(new textBox("I am in the top 10 for mathematics in my year", 12));
    meaningfulPopup.textBoxes.push(new textBox("I understand the basics of how a Generative Adverserial Neural Network works and have succesfully written one", 8));
    meaningfulPopup.textBoxes.push(new textBox("As you may have noticed I also made a webiste using the p5.js framework", 12));
    meaningfulPopup.textBoxes.push(new textBox("I made a website at rafsgames.azurewebsites.net", 12));
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
                }
                popups.forEach((i) => {
                    if(i.type == this.type){
                        popups.forEach((i) => {
                            if(i.isOpen && i.canScroll && i.type != this.type){
                                i.toggle();
                            }   
                        });
                        i.toggle();
                    }
                })
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
        }
    });
    menuItems.forEach((i) => {
        if(!i.checkColl(mouseX, mouseY)){
            startX = mouseX;
            startY = mouseY;
        }
    });
    popups.forEach((i) => {
        if(i.checkColl(mouseX, mouseY)){
            draggingPopup = i.type;
            popupDragStartX = i.x;
            popupDragStartY = i.y;
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
    }else{
        popups.forEach((i) => {
            if(i.type == draggingPopup && i.movable){
                i.currScroll = 0;
                i.x = (mouseX - startX) + popupDragStartX;
                i.y = (mouseY - startY) + popupDragStartY + 10;
                for (var j = 0; j < i.textBoxes.length; j++){
                    if(i.textBoxes[j].isImage == false){
                        i.textBoxes[j].x = i.x;
                    }else{
                        i.textBoxes[j].x = i.x + 20;
                    }
                    i.textBoxes[j].y = i.y + 30*j + 1;
                }
            }
            i.draw();
        });
    }
}

function mouseReleased(){
    dragBox = [0, 0, 0, 0];
}