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
    constructor(x, y, size) {
        this.x = x || 200;
        this.y = y || 200;
        this.dx = Math.random() * -2 + 1;
        this.dy = Math.random() * 2 + 5;
        this.size = size || 100;
    }
    draw() {
        // context.save();
        this.shape = new Path2D();
        context.beginPath();
        context.arc(this.x, this.y, this.size, Math.PI * 2, 0);
        context.fillStyle = "black";
        context.fill();
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x >= canvas.width) {
            this.x = canvas.width;
        }
        if (this.y > canvas.height) {
            this.x = mouse.x;
            this.y = mouse.y;
            // particleArray.splice(particleArray.indexOf(this), 1);
        }
    }
}

init();
function init() {
    $(canvas).on("mousemove", (e) => {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
        if (particleArray.length > maxParticles) return;
        let size = Math.random() * 30 + 10;
        particleArray.push(new Particle(mouse.x, mouse.y, size));
    });
}
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach((e) => {
        e.update();
        e.draw();
    });
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
