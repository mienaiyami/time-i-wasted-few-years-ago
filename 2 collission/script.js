$(document).ready(function () {
    myGamePiece1 = new component(10, 120, "red", 40, 40, "player");
    myObstacle1 = new component(200, 100, "blue", 40, 300, "obstacle");
    myGameArea.start();
    infoP = document.createElement("p");
    infoP.className = "infoP";
    document.body.appendChild(infoP);
});
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        $(window).keydown(function (e) {
            myGameArea.keys = myGameArea.keys || [];
            myGameArea.keys[e.keyCode] = e.type == "keydown";
        });
        $(window).keyup(function (e) {
            myGameArea.keys[e.keyCode] = e.type == "keydown";
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    },
};
function component(x, y, color, w, h, type) {
    this.w = w;
    this.h = h;
    this.color = color;
    this.x = x;
    this.y = y;
    this.type = type;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        context = myGameArea.context;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        // console.log(mousePos.x)
    };
    this.newPos = function (obj) {
        //obstacle
        if (obj[0]) {
            if (obj[1] == "left" && myGamePiece1.speedX == speedConst) {
                myGamePiece1.speedX = 0;
            }
            if (obj[1] == "top" && myGamePiece1.speedY == speedConst) {
                myGamePiece1.speedY = 0;
            }
            if (obj[1] == "right" && myGamePiece1.speedX == -speedConst) {
                myGamePiece1.speedX = 0;
            }
            if (obj[1] == "bottom" && myGamePiece1.speedY == -speedConst) {
                myGamePiece1.speedY = 0;
            }
        }
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x >= myGameArea.canvas.width - this.w) {
            this.x = myGameArea.canvas.width - this.w;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y >= myGameArea.canvas.height - this.h) {
            this.y = myGameArea.canvas.height - this.h;
        }
        if (this.y <= 0) {
            this.y = 0;
        }

        infoP.innerHTML = "player location x: " + this.x + " y : " + this.y;
    };
    this.crashed = function (obj) {
        var top = this.y;
        var bottom = this.y + this.h;
        var left = this.x;
        var right = this.x + this.w;
        var objTop = obj.y;
        var objBottom = obj.y + obj.h;
        var objLeft = obj.x;
        var objRight = obj.x + obj.w;
        crash = [];
        crash[0] = false;
        if (
            right >= objLeft &&
            left <= objLeft &&
            bottom >= objTop &&
            top <= objBottom
        ) {
            crash = [true, "left", objLeft];
        }
        if (
            left <= objRight &&
            right >= objRight &&
            bottom >= objTop &&
            top <= objBottom
        ) {
            crash = [true, "right", objLeft];
        }
        if (
            right > objLeft &&
            left < objRight &&
            bottom >= objTop &&
            top <= objTop
        ) {
            crash = [true, "top", objTop];
        }
        if (
            right > objLeft &&
            left < objRight &&
            top <= objBottom &&
            bottom >= objBottom
        ) {
            crash = [true, "bottom", objTop];
        }
        // if(right > objLeft && left < objLeft && bottom > objTop && top < objBottom){
        //     crash = [true,'right'];
        // }
        // if(right > objLeft && left < objLeft && bottom > objTop && top < objBottom){
        //     crash = [true,'bottom'];
        // }
        return crash;
    };
    console.log(this.crashed);
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece1.speedX = 0;
    myGamePiece1.speedY = 0;
    speedConst = 5;
    if (myGameArea.keys && myGameArea.keys[65]) {
        myGamePiece1.speedX = -speedConst;
    }
    if (myGameArea.keys && myGameArea.keys[68]) {
        myGamePiece1.speedX = speedConst;
    }
    if (myGameArea.keys && myGameArea.keys[87]) {
        myGamePiece1.speedY = -speedConst;
    }
    if (myGameArea.keys && myGameArea.keys[83]) {
        myGamePiece1.speedY = speedConst;
    }
    myObstacle1.update();
    myGamePiece1.newPos(myGamePiece1.crashed(myObstacle1));
    infoP.append(myGamePiece1.crashed(myObstacle1)[1]);
    myGamePiece1.update(myGamePiece1.crashed(myObstacle1).toString());
}
