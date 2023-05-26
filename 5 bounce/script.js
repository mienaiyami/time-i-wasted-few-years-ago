$(document).ready(function () {
    pieceBall = new component(100, 100, 40, 40, "red", "main", 0.1, 0.7);
    pieceBall.speedX = 4;
    pieceBall.speedY = 3;
    pieceObstacle = new component(0, 0, 200, 40, "blue", "obst", 0, 0);
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
        this.frameN = 1;
        this.interval = setInterval(updateGameArea, 1000 / 60);
        $(window).keydown(function (e) {
            myGameArea.Keys = myGameArea.Keys || [];
            myGameArea.Keys[e.keyCode] = e.type == "keydown";
        });
        $(window).keyup(function (e) {
            myGameArea.Keys[e.keyCode] = e.type == "keydown";
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    },
};
function component(x, y, w, h, color, type, gravity, bounce) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    this.gravity = gravity;
    this.type = type;
    this.bounce = bounce;
    this.speedX = 0;
    this.speedY = 0;
    this.gravitySpeed = 0;
    this.update = function () {
        context = myGameArea.context;
        if (this.type == "main") {
            context.save();
            context.beginPath();
            context.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
            context.fillStyle = this.color;
            context.fill();
            context.restore();
        }
        if (this.type == "obst") {
            context.save();
            context.fillStyle = this.color;
            console.log(this.x);
            context.fillRect(this.x, this.y, this.width, this.height);
            context.restore();
        }
    };
    this.onCollison = function (obj) {
        var left = this.x - this.width;
        var top = this.y - this.height;
        var right = this.x + this.width;
        var bottom = this.y + this.height;
        var objLeft = obj.x;
        var objTop = obj.y;
        var objRight = obj.x + obj.width;
        var objBottom = obj.y + obj.height;
        //when hit top
        if (
            bottom >= objTop &&
            right >= objLeft &&
            left <= objRight &&
            top <= objTop
        ) {
            this.y = parseFloat(objTop - this.width);
            this.gravitySpeed = -(this.gravitySpeed * this.bounce).toFixed(3);
            this.speedY = -(this.speedY * this.bounce).toFixed(3);
        }
        //when hit left
        if (
            right >= objLeft &&
            left <= objLeft &&
            bottom >= objTop &&
            top <= objBottom &&
            Math.sign(this.speedX) == 1
        ) {
            this.x = parseFloat(objLeft - this.width);
            this.speedX = -(this.speedX * this.bounce).toFixed(3);
        }
        //when hit right
        // if(left <= objRight && right >= objRight && bottom >= objTop && top <=objBottom && Math.sign(this.speedX) == 1){
        //     this.x = parseFloat(objLeft - this.width);
        //     this.speedX = -(this.speedX * this.bounce).toFixed(3)
        // }
        // if(bottom >= objTop && right >= objLeft && left <= objRight && top <= objTop){
        //     this.y = parseFloat(objTop - this.width);
        //     this.gravitySpeed = -(this.gravitySpeed * this.bounce).toFixed(3)
        //     this.speedY = -(this.speedY * this.bounce).toFixed(3)
        // }
        // if(bottom >= objTop && right >= objLeft && left <= objRight && top <= objTop){
        //     this.y = parseFloat(objTop - this.width);
        //     this.gravitySpeed = -(this.gravitySpeed * this.bounce).toFixed(3)
        //     this.speedY = -(this.speedY * this.bounce).toFixed(3)
        // }
    };
    this.newPos = function () {
        let abc = this.gravitySpeed;
        abc += this.gravity;
        this.gravitySpeed = parseFloat(abc.toFixed(1));
        this.x += parseFloat(this.speedX.toFixed(1));
        this.y += parseFloat((this.speedY + this.gravitySpeed).toFixed(1));
        this.wallTouch();
        infoP.innerHTML =
            " location x: " +
            pieceBall.x +
            " y : " +
            pieceBall.y +
            "<br> speed x: " +
            pieceBall.speedX +
            "<br> speed y: " +
            pieceBall.speedY +
            "<br> gravity speed: " +
            pieceBall.gravitySpeed +
            "<br>frame number : <span class='lolp'></span>";
    };
    this.wallTouch = function () {
        var left = this.width;
        var top = this.height;
        var right = myGameArea.canvas.width - this.width;
        var bottom = myGameArea.canvas.height - this.height;
        if (this.x <= left) {
            this.x = left;
            for (let i = 0; i < 5; i++) {
                if (this.speedX == "-0." + i) {
                    this.speedX = 0;
                }
            }
            this.speedX = -(this.speedX * this.bounce).toFixed(1);
        }
        if (this.y <= top) {
            this.y = top;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce).toFixed(1);
            this.speedY = -(this.speedY * this.bounce).toFixed(1);
        }
        if (this.x >= right) {
            this.x = right;
            for (let i = 0; i < 5; i++) {
                if (this.speedX == "0." + i) {
                    this.speedX = 0;
                }
            }
            this.speedX = -(this.speedX * this.bounce).toFixed(1);
        }
        if (this.y >= bottom) {
            this.y = bottom;
            for (let i = 0; i < 9; i++) {
                if (this.speedY == "0." + i && this.gravitySpeed == "0." + i) {
                    this.speedY = 0;
                    this.gravitySpeed = 0;
                }
            }
            this.gravitySpeed = -(this.gravitySpeed * this.bounce).toFixed(1);
            this.speedY = -(this.speedY * this.bounce).toFixed(1);
        }
    };
}
function updateGameArea() {
    myGameArea.clear();
    pieceBall.onCollison(pieceObstacle);
    keyCtrl();
    function keyCtrl() {
        if (myGameArea.Keys && myGameArea.Keys[80]) {
            myGameArea.stop();
            console.log("lol");
        } //p
        if (myGameArea.Keys && myGameArea.Keys[79]) {
            myGameArea.start();
        } //o doesnt work prop
    }
    pieceBall.newPos();
    pieceObstacle.newPos();
    $(".lolp").html(myGameArea.frameN);
    pieceBall.update();
    pieceObstacle.update();
    myGameArea.frameN++;
}
