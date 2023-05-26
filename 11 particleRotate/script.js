const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const maxParticles = 10000;
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
        this.size = size || 100;
        this.rotation = 0;
    }
    draw() {
        context.save();
        // this.shape = new Path2D();
        context.beginPath();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((this.rotation * Math.PI) / 180);
        // context.fillStyle = "red";
        // context.fillRect(0, 0, canvas.width, canvas.height);
        context.arc(this.x, this.y, this.size, Math.PI * 2, 0);
        context.fillStyle = "white";
        context.fill();
        context.restore();
    }
    update() {
        // this.x += this.dx;
        // this.y += this.dy;
        this.rotation += 0.5;
        // if (this.x >= canvas.width || this.x <= 0) {
        //     // this.x = canvas.width;
        //     particleArray.splice(particleArray.indexOf(this), 1);
        //     pushParticle();
        // }
        // if (this.y > canvas.height || this.y <= 0) {
        //     // this.x = mouse.x;
        //     // this.y = mouse.y;
        //     particleArray.splice(particleArray.indexOf(this), 1);
        //     pushParticle();
        // }
    }
}

init();
function init() {
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
    let a_y = (canvas.width - (canvas.width * centerminusPercent) / 100) / 2;
    let b_y =
        (canvas.width - (canvas.width * centerminusPercent) / 100) / 2 +
        (canvas.width * centerminusPercent) / 100;
    do {
        x = Math.random() * -canvas.width + canvas.width / 2;
        y = Math.random() * -canvas.width + canvas.width / 2;
    } while (x >= a_x && x <= b_x && y >= a_y && y <= b_y);
    dx = ((x - canvas.width / 2) / canvas.width) * 5;
    dy = ((y - canvas.width / 2) / canvas.width) * 5;
    particleArray.push(new Particle(x, y, size, 2, 2));
}
function animate() {
    context.save();
    context.fillStyle = "rgba(0,0,0,0.08)";
    context.fillRect(0, 0, canvas.width, canvas.width);
    context.restore();
    // context.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach((e) => {
        e.update();
        e.draw();
    });
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
