const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const maxParticles = 400;
let particleArray = [];
const mouse = {
    x: 0,
    y: 0,
};
class Particle {
    constructor(x, y, size, dx, dy) {
        this.x = x || 200;
        this.y = y || 200;
        this.dx = dx || 0;
        this.dy = dy || 0;
        this._dx = this.dx;
        this._dy = this.dy;
        this.size = size || 100;
    }
    draw() {
        context.save();
        this.shape = new Path2D();
        context.beginPath();
        context.arc(this.x, this.y, this.size, Math.PI * 2, 0);
        context.fillStyle = "white";
        context.fill();
        context.restore();
    }
    update() {
        this.x += this._dx;
        this.y += this._dy;
        if (this.x >= canvas.width || this.x <= 0) {
            // this.x = canvas.width;
            particleArray.splice(particleArray.indexOf(this), 1);
            pushParticle();
        }
        if (this.y > canvas.height || this.y <= 0) {
            // this.x = mouse.x;
            // this.y = mouse.y;
            particleArray.splice(particleArray.indexOf(this), 1);
            pushParticle();
        }
    }
}
class GravityParticle {
    constructor(x, y, size, gravity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gravity = gravity;
    }
    draw() {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, Math.PI * 2, 0);
        context.fillStyle = "rgb(54, 46, 46)";
        context.filter = "blur(5px)";
        context.fill();
        context.restore();
    }
}
let gravity1;
init();
function init() {
    gravity1 = new GravityParticle(300, 300, 50, 1);
    for (let i = 0; i < maxParticles; i++) {
        pushParticle();
    }
}
function pushParticle() {
    let size = 1;
    const centerminusPercent = 30;
    let x, y, dx, dy;
    let a_x = (canvas.width - (canvas.width * centerminusPercent) / 100) / 2;
    let b_x =
        (canvas.width - (canvas.width * centerminusPercent) / 100) / 2 +
        (canvas.width * centerminusPercent) / 100;
    let a_y = (canvas.height - (canvas.height * centerminusPercent) / 100) / 2;
    let b_y =
        (canvas.height - (canvas.height * centerminusPercent) / 100) / 2 +
        (canvas.height * centerminusPercent) / 100;
    do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
    } while (x >= a_x && x <= b_x && y >= a_y && y <= b_y);
    dx = ((x - canvas.width / 2) / canvas.width) * 5;
    dy = ((y - canvas.height / 2) / canvas.height) * 5;
    // }
    particleArray.push(new Particle(x, y, size, dx, dy));
}
function animate() {
    context.save();
    context.fillStyle = "rgba(0,0,0,0.08)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
    // context.clearRect(0, 0, canvas.width, canvas.height);
    gravity1.draw();
    pullParticles();
    particleArray.forEach((e) => {
        e.update();
        e.draw();
    });
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function pullParticles() {
    particleArray.forEach((e) => {
        let x = e.x;
        let y = e.y;
        let distance = Math.sqrt((gravity1.x - x) ** 2 + (gravity1.y - y) ** 2);
        if (distance <= 300 && x < gravity1.x && y < gravity1.y) {
            e._dx += gravity1.gravity;
            e._dy += gravity1.gravity;
        }
        if (distance <= 300 && x < gravity1.x && y > gravity1.y) {
            e._dx += gravity1.gravity;
            e._dy -= gravity1.gravity;
        }
        if (distance <= 300 && x > gravity1.x && y < gravity1.y) {
            e._dx -= gravity1.gravity;
            e._dy += gravity1.gravity;
        }
        if (distance <= 300 && x > gravity1.x && y > gravity1.y) {
            e._dx -= gravity1.gravity;
            e._dy -= gravity1.gravity;
        } else {
            e._dx = e.dx;
            e._dy = e.dy;
        }
    });
}
