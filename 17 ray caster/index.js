const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
document.body.appendChild(canvas);
const context = canvas.getContext("2d");

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};
document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
class Ray {
    constructor(x, y, angle) {
        this.a = { x, y };
        this.dir = { x: Math.cos(angle), y: Math.sin(angle) };
    }
    show() {
        // context.save();
        this.pathFrame = new Path2D();
        this.pathFrame.moveTo(this.a.x, this.a.y);
        this.pathFrame.lineTo(
            this.a.x + this.dir.x * 10,
            this.a.y + this.dir.y * 10
        );
        context.stroke(this.pathFrame);
    }
    extend(wall) {
        let onFront;
        let record = Infinity;
        for (let i = 0; i < wall.length; i++) {
            let x1 = wall[i].a.x;
            let y1 = wall[i].a.y;
            let x2 = wall[i].b.x;
            let y2 = wall[i].b.y;
            let x3 = this.a.x;
            let y3 = this.a.y;
            let x4 = this.a.x + this.dir.x;
            let y4 = this.a.y + this.dir.y;
            let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den === 0) return;
            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            let u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / den;

            if (t >= 0 && t <= 1 && u >= 0) {
                let pt = { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
                let dist = Math.sqrt(
                    (this.a.x - pt.x) ** 2 + (this.a.x - pt.x) ** 2
                );
                if (dist < record) {
                    record = dist;
                    onFront = pt;
                }
            }
        }
        if (onFront) {
            this.pathRay = new Path2D();
            this.pathRay.moveTo(this.a.x, this.a.y);
            this.pathRay.lineTo(onFront.x, onFront.y);
            context.strokeStyle = "rgba(255, 255, 255, 0.1)";
            context.stroke(this.pathRay);
        }
    }
}
class RayCaster {
    constructor({
        density = 10,
        type = "point",
        x = canvas.width / 2,
        y = canvas.height / 2,
        color = "white",
    } = {}) {
        this.density = density;
        this.type = type;
        this.x = x;
        this.y = y;
        this.color = color;
    }
    castRay() {
        this.rays = [];
        // context.save();
        context.strokeStyle = this.color;
        for (let i = 0; i < 360; i += 0.1) {
            this.rays.push(new Ray(this.x, this.y, (i * Math.PI) / 180));
        }
        this.rays.forEach((e) => {
            e.show();
            e.extend(obstacle1);
        });
        // context.restore();
    }
}
class Obstacle {
    constructor(x1 = 300, y1 = 100, x2 = 300, y2 = 300, color = "white") {
        this.a = { x: x1, y: y1 };
        this.b = { x: x2, y: y2 };
        this.color = color;
    }
    draw() {
        // context.save();
        context.strokeStyle = this.color;
        this.path = new Path2D();
        this.path.moveTo(this.a.x, this.a.y);
        this.path.lineTo(this.b.x, this.b.y);
        context.stroke(this.path);
        // context.restore();
    }
}
const rayCaster1 = new RayCaster();
const obstacle1 = [
    new Obstacle(0, 0, 0, canvas.height),
    new Obstacle(0, 0, canvas.width, 0),
    new Obstacle(0, canvas.height, canvas.width, canvas.height),
    new Obstacle(canvas.width, 0, canvas.width, canvas.height),
];
for (let i = 0; i < 4; i++) {
    let x1 = Math.random() * canvas.width;
    let y1 = Math.random() * canvas.height;
    let x2 = Math.random() * canvas.width;
    let y2 = Math.random() * canvas.height;
    obstacle1.push(new Obstacle(x1, y1, x2, y2));
}
let x = canvas.width / 2,
    y = canvas.height / 2;
const update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    rayCaster1.x = mouse.x;
    rayCaster1.y = mouse.y;
    obstacle1.forEach((e) => {
        e.draw();
    });
    rayCaster1.castRay();
    requestAnimationFrame(update);
};
update();
