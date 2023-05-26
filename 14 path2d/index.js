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

class Circle {
    constructor(name, x, y, type, size, color, dx, dy, state) {
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
        this.state = state;
    }
    draw() {
        context.save();
        context.beginPath();
        this.shape = new Path2D();
        if (this.type === "circle") {
            this.shape.arc(this._x, this._y, this.size, 0, Math.PI * 2);
        }
        if (this.type === "square") {
            this.shape.fillRect(this._x, this._y, this.size, this.size);
        }
        context.fillStyle = this.color;
        if (mouse.over === this.name) {
            context.fillStyle = "black";
        }
        context.fill(this.shape);
        context.restore();
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

            $(".info .two").html(
                `dragX: ${mouse.X - mouse.initX} dragY: ${
                    mouse.Y - mouse.initY
                }`
            );
        }
    }
    stop() {
        this.state = "pause";
    }
    start() {
        this.state = "play";
    }
}
let objArray = [];
objArray.push(
    new Circle("circle1", 200, 200, "circle", 50, "red", 1),
    new Circle("circle2", 400, 200, "circle", 90, "blue", 1)
);
// const circle1 = ;
// const circle2 = ;

function animate() {
    mouse.moving = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    gridMaker();
    $(".info .one").html(`dx: ${mouse.dx} dy: ${mouse.dy} ${mouse.moving} `);
    objArray.forEach((e) => {
        e.update();
        e.draw();
    });
    // circle1.update();
    // circle1.draw();
    // circle2.update();
    // circle2.draw();
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

$(document).on("keydown", (e) => {
    if (e.key === "p") circle1.start();
    if (e.key === "o") circle1.stop();
    if (e.key === "i") {
        circle1.x = 100;
        circle1.y = 100;
    }
});
function gridMaker() {
    context.save();
    let gridHeight = window.innerHeight / 5;
    let gridWidth = window.innerWidth / 5;
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
    objArray.forEach((e) => {
        if (context.isPointInPath(e.shape, mouse.X, mouse.Y)) {
            mouse.over = e.name;
        } else {
            mouse.over = null;
        }
    });
};
