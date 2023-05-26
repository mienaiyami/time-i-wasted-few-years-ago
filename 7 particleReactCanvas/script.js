const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
context = canvas.getContext("2d");

const mouse = {
    x: 0,
    y: 0,
};
particleNumber = 10;
let particleArray = [];
class Particle {
    constructor(x, y, size, sizerate) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.sizerate = sizerate;
    }
    draw() {
        // context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = "black";
        context.fill();
    }
    update() {
        let dist = Math.sqrt((this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2);
        if (dist <= 180 && dist > 0) {
            this.size = Math.abs(Math.cos(((dist / 2) * Math.PI) / 180) * 10);
            if (this.size < 1) {
                this.size = 1;
            }
            // this.size += this.sizerate;
            // if (this.size >= 10) {
            //     this.sizerate = -0.5;
            // }
            // if (this.size <= 1) {
            //     this.sizerate = 0.5;
            // }
        } else {
            this.size = 1;
        }
    }
}

// particle1 = new Particle(100, 100, 10);
function init() {
    let size = 1;
    let sizerate = 0;
    let spacing = 15;
    for (let i = 0; i < window.innerWidth / spacing; i++) {
        x = spacing * i;
        for (let j = 0; j < window.innerHeight / spacing; j++) {
            y = spacing * j;
            particleArray.push(new Particle(x, y, size, sizerate));
        }
    }
    animate();
    document.querySelector("canvas").addEventListener("mousemove", (e) => {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    });
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // mouse.x += 0.5;
    // mouse.y += 0.5;
    particleArray.forEach((e) => {
        e.update();
        e.draw();
    });
    // particle1.update();
    // particle1.draw();
    requestAnimationFrame(animate);
}
init();
