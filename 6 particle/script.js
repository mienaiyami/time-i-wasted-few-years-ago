const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

context = canvas.getContext("2d");
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    mouseIn: false,
};
const particleNumber = 200;
let particleArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 10;
        this.dx = 0;
        this.dy = Math.random() * 5 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
        this.color = "#0000006e";
    }
    draw() {
        context.fillStyle = "#0000006e";
        context.save();
        context.translate(this.x, this.y);

        // context.rotate(this.angle * (Math.PI / 360) * this.spin);
        // context.fillRect(
        //     0 - this.size / 2,
        //     0 - this.size / 2,
        //     this.size,
        //     this.size
        // );
        context.beginPath();
        context.arc(
            0 - this.size / 2,
            0 - this.size / 2,
            this.size,
            0,
            Math.PI * 2
        );
        context.fill();
        context.restore();
    }
    update() {
        this.angle++;
        this.y += this.dy;
        this.x += this.dx;
        if (this.y >= canvas.height * 1.3) {
            this.size = Math.random() * 50 + 10;
            this.x = Math.random() * canvas.width;
            this.y = 0 - this.size;
            this.dx = 0;
            this.dy = Math.random() * 5 + 1;
        }
        if (
            mouse.mouseIn &&
            this.x - mouse.x < 150 &&
            this.x - mouse.x > 0 &&
            Math.abs(this.y - mouse.y) < 150
        ) {
            // this.size = 150;
            // setTimeout(() => {
            //     this.size = Math.random() * 50 + 10;
            // }, 300);
            this.dx = +3;
            setTimeout(() => {
                this.dx = 0;
            }, 300);
        }
        if (
            mouse.mouseIn &&
            this.x - mouse.x > -150 &&
            this.x - mouse.x < 0 &&
            Math.abs(this.y - mouse.y) < 150
        ) {
            // this.size = 150;
            // setTimeout(() => {
            //     this.size = Math.random() * 50 + 10;
            // }, 300);
            this.dx = -3;
            setTimeout(() => {
                this.dx = 0;
            }, 300);
        }
    }
}

$(window).on("mousemove", (e) => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    mouse.mouseIn = true;
});
$(canvas).on("mouseleave", (e) => {
    mouse.x = null;
    mouse.y = null;
    mouse.mouseIn = false;
});
const particle1 = new Particle();
for (let i = 0; i < particleNumber; i++) {
    particleArray.push(new Particle());
}
animateParticle();
function animateParticle() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach((e) => {
        e.update();
        e.draw();
    });
    particle1.update();
    particle1.draw();
    requestAnimationFrame(animateParticle);
}
