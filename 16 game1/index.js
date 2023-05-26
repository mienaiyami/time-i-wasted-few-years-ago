const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
const context = canvas.getContext("2d");

const mouse = {
    initX: window.innerWidth / 2,
    initY: window.innerHeight / 2,
    X: window.innerWidth / 2,
    Y: window.innerHeight / 2,
    prevDragX: window.innerWidth / 2,
    prevDragY: window.innerHeight / 2,
    isDown: false,
    drag: null,
    over: null,
};

class Tower {
    constructor(name, x, y, type, size, color, dx, dy, hp, state) {
        this.name = name;
        this.x = x;
        this.y = y;
        this._x = this.x;
        this._y = this.y;
        this.type = type;
        this.size = size;
        this.color = color;
        this.dx = dx || 0;
        this.dy = dy || 0;
        this._dx = this.dx;
        this._dy = this.dy;
        this.hp = hp || 10;
        this.state = state || "pause";
        this.allowShoot = true;
        this.shooting = false;
        this.autoShoot = true;
        this.bullet = [];
    }
    draw() {
        if (this.size > 1) {
            context.save();
            context.beginPath();
            this.shape = new Path2D();
            if (this.type === "circle") {
                this.shape.arc(this._x, this._y, this.size, 0, Math.PI * 2);
            }
            if (this.type === "square") {
                this.shape.rect(this._x, this._y, this.size, this.size);
            }
            context.fillStyle = this.color;
            if (mouse.over === this.name) {
                context.fillStyle = "black";
            }
            context.fill(this.shape);
            context.font = "30px Comic Sans MS";
            context.fillStyle = "#ffffff";
            context.textAlign = "center";
            context.fillText(this.hp, this._x, this._y);
            context.restore();
        }
    }
    update() {
        if (this.state === "play") {
            this._x += this._dx;
            this._y += this._dy;
        }
        if (!mouse.isDown) {
            this.x = this._x;
            this.y = this._y;
        }
        if (mouse.drag === this.name) {
            this._x = this.x + mouse.X - mouse.initX;
            this._y = this.y + mouse.Y - mouse.initY;

            // $(".info .two").html(
            //     `dragX: ${mouse.X - mouse.initX} dragY: ${
            //         mouse.Y - mouse.initY
            //     }`
            // );
        }
        //shoot
        if (this.bullet && this.bullet.shooting) {
            this.bullet.forEach((e, i) => {
                e.drawAndUpdate(i, this.bullet);
                if (e.hitEnemy) {
                    this.bullet.shift();
                }
            });
        }
        enemyArray.forEach((e) => {
            if (
                e &&
                context.isPointInPath(e.shape, this._x, this._y) &&
                e.hp != 0
            ) {
                this.hp -= 1;
            }
        });
        if (this.hp <= 0) {
            youLost("an bug hit you");
        }
    }
    shoot() {
        if (this.allowShoot) {
            // this.allowShoot = false;
            this.bullet.push(new Bullet(this._x, this._y, 10, "red", 5));
            // setTimeout(() => {
            //     this.bullet.push(new Bullet(this.x, this.y, 10, "red", 5));
            // }, 200);
            // setTimeout(() => {
            //     this.bullet.push(new Bullet(this.x, this.y, 10, "red", 5));
            //     this.allowShoot = true;
            // }, 400);
            this.bullet.shooting = true;
        }
    }
    stop() {
        this.state = "pause";
    }
    start() {
        this.state = "play";
    }
}
class Bullet {
    constructor(x, y, size, color = "red", dx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.dx = dx;
        this.hitEnemy = false;
    }
    drawAndUpdate(index, parent) {
        this.x += this.dx;
        if (this.x > canvas.width + this.size) {
            parent.splice(index, 1);
            this.shooting = false;
        }
        // $(".info .three").html(`x: ${this.x} d: ${this.y} dx: ${this.dx} `);
        context.save();
        context.beginPath();
        this.shape = new Path2D();
        this.shape.arc(this.x, this.y, 10, Math.PI * 2, 0);
        context.fill(this.shape);
        context.restore();
        enemyArray.forEach((e) => {
            if (
                e &&
                context.isPointInPath(e.shape, this.x, this.y) &&
                e.hp != 0
            ) {
                e.hp -= 1;

                canvas.enemyKilled += 1;
                this.hitEnemy = true;
            }
        });
    }
}
class Enemy extends Tower {
    update(index, parent) {
        if (this.state === "play") {
            this._x += this._dx;
            this._y += this._dy;
        }
        if (!mouse.isDown) {
            this.x = this._x;
            this.y = this._y;
        }
        if (this.hp <= 0) {
            this.dx = 0;
            this.size -= 5;
            if (this.size < 0) {
                parent.splice(index, 1);
            }
        }
        if (this.x <= 0) {
            youLost("bug crossed");
        }
    }
}
new Enemy(
    "enemy1",
    window.innerWidth / 8 / 2 + (window.innerWidth / 8) * 4,
    window.innerHeight / 8 / 2 + (window.innerHeight / 8) * 2,
    "circle",
    60,
    "red"
);
let objArray = [];
let enemyArray = [];
pushObj();
function pushObj() {
    for (let i = 0; i < 3; i++) {
        objArray.push(
            new Tower(
                "circle" + i,
                window.innerWidth / 8 / 2,
                ((i + i) * window.innerHeight) / 8 + window.innerHeight / 8 / 2,
                "circle",
                60,
                "blue",
                0
            )
        );
    }
}
canvas.Cframenumber = 1;
canvas.enemyKilled = 0;
canvas.canvasPlaying = true;
function stop() {
    canvas.canvasPlaying = false;
}
function start() {
    canvas.canvasPlaying = true;
    animate();
}
function animate() {
    if (canvas.canvasPlaying) {
        canvas.Cframenumber += 1;

        if (canvas.Cframenumber === 2000) {
            objArray.push(
                new Tower(
                    "circle" + objArray.length,
                    window.innerWidth / 8 / 2,
                    (objArray.length * 2 * window.innerHeight) / 8 +
                        window.innerHeight / 8 / 2,
                    "circle",
                    60,
                    "blue",
                    0
                )
            );
        }
        if (canvas.Cframenumber % 150 == 0) {
            let enemyDX = -(Math.log(canvas.Cframenumber) / 10);
            // if (enemyDX <= -1.5) {
            //     enemyDX = -1.5;
            // }
            let type = "circle";
            let hp = 10;
            let x = window.innerWidth / 8 / 2 + (window.innerWidth / 8) * 7;
            let y =
                window.innerHeight / 8 / 2 +
                (window.innerHeight / 8) * Math.floor(Math.random() * 8);
            while (
                enemyArray.length != 0 &&
                y == enemyArray[enemyArray.length - 1].y
            ) {
                y =
                    window.innerHeight / 8 / 2 +
                    (window.innerHeight / 8) * Math.floor(Math.random() * 8);
            }
            if (canvas.Cframenumber % 700 == 0) {
                type = "square";
                hp = 15;
            }
            enemyArray.push(
                new Enemy(
                    "enemy1",
                    x,
                    y,
                    type,
                    30,
                    "red",
                    enemyDX,
                    0,
                    hp,
                    "play"
                )
            );
            canvas.Pframenumber = canvas.Cframenumber;
        }

        mouse.moving = false;
        context.clearRect(0, 0, canvas.width, canvas.height);
        gridMaker();
        // $(".info .one").html(`dx: ${mouse.dx} dy: ${mouse.dy} ${mouse.over} `);
        enemyArray.forEach((e, i) => {
            e.update(i, enemyArray);
            e.draw();
        });
        objArray.forEach((e) => {
            let bulletSpeed = Math.floor(300 / Math.log(canvas.Cframenumber));
            if (canvas.Cframenumber % bulletSpeed == 0) {
                e.shoot();
            }
            e.update();
            e.draw();
        });
        requestAnimationFrame(animate);
    }
}
requestAnimationFrame(animate);

function youLost(msg) {
    stop();
    alert(`you lost.
${msg}
your score is : ${canvas.enemyKilled}.
refresh to restart`);
}

$(document).on("keydown", (e) => {
    if (e.key === "p") start();
    if (e.key === "o") stop();
    if (e.key === "i") {
        objArray.length = 0;
        pushObj();
        // circle1.x = 100;
        // circle1.y = 100;
    }
    // if (e.key === "u" && mouse.over != null) {
    //     objArray[objArray.map((e) => e.name).indexOf(mouse.over)].shoot();
    // }
});
function gridMaker() {
    context.save();
    let gridHeight = window.innerHeight / 8;
    let gridWidth = window.innerWidth / 8;
    for (let i = 0; i < window.innerHeight / gridHeight; i++) {
        context.beginPath();
        context.moveTo(0, gridHeight * i);
        context.lineTo(canvas.width, gridHeight * i);
        context.strokeStyle = "#000000";
        context.stroke();
    }
    for (let i = 0; i < window.innerWidth / gridWidth; i++) {
        context.beginPath();
        context.moveTo(gridWidth * i, 0);
        context.lineTo(gridWidth * i, canvas.height);
        context.strokeStyle = "#000000";
        context.stroke();
    }
    context.restore();
}
canvas.onmousedown = (e) => {
    mouse.initX = e.clientX;
    mouse.initY = e.clientY;
    mouse.isDown = true;

    objArray.forEach((e) => {
        if (context.isPointInPath(e.shape, mouse.X, mouse.Y)) {
            mouse.drag = e.name;
        }
    });
    canvas.onmouseup = () => {
        mouse.isDown = false;
        mouse.drag = null;
    };
};
canvas.onmousemove = (e) => {
    mouse.dx = e.clientX - mouse.X;
    mouse.dy = e.clientY - mouse.Y;
    mouse.moving = true;
    mouse.X = e.clientX;
    mouse.Y = e.clientY;
    objArray.forEach((a) => {
        if (context.isPointInPath(a.shape, mouse.X, mouse.Y)) {
            mouse.over = a.name;
        }
        // else {
        //     mouse.over = null;
        // }
    });
    if (
        mouse.over != null &&
        !context.isPointInPath(
            objArray[objArray.map((e) => e.name).indexOf(mouse.over)].shape,
            mouse.X,
            mouse.Y
        )
    ) {
        mouse.over = null;
    }
};
