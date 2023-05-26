const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
context = canvas.getContext("2d");

const mouse = {
    x: 0,
    y: 0,
};
particleNumber = 100;
let particleArray = [];
class Particle {
    constructor(x, y, size, sizerate) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.sizerate = sizerate;
        this.dx = Math.random() * 5;
        this.dy = Math.random() * 5;
    }
    draw() {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = "black";
        context.fill();
        context.restore();
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > canvas.width || this.x < 0) {
            this.dx = -this.dx;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dy = -this.dy;
        }
        // let dist = Math.sqrt((this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2);
        // if (dist <= 180 && dist > 0) {
        //     this.size =
        //         10 + Math.abs(Math.cos(((dist / 2) * Math.PI) / 180) * 30);
        //     if (this.size < 10) {
        //         this.size = 10;
        //     }
        // } else {
        //     this.size = 10;
        // }
        // context.beginPath();
        // context.moveTo(this.x, this.y);
        // context.lineTo(mouse.x, mouse.y);
        // context.stroke();
    }
}

// particle1 = new Particle(100, 100, 10);
init();
function init() {
    let sizerate = 0;
    for (let i = 0; i < particleNumber; i++) {
        let size = Math.random() * 5 + 5;
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        particleArray.push(new Particle(x, y, size, sizerate));
    }
    animate();
    $(canvas).on("mousemove", (e) => {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    });
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particleArray.forEach((e) => {
        e.update();
        e.draw();
    });
    connect();
    // particle1.update();
    // particle1.draw();
    requestAnimationFrame(animate);
}

function connect() {
    let opacity = 0.5;
    for (let i = 0; i < particleArray.length; i++) {
        for (let j = 0; j < particleArray.length; j++) {
            let dist = Math.sqrt(
                (particleArray[i].x - particleArray[j].x) ** 2 +
                    (particleArray[i].y - particleArray[j].y) ** 2
            );
            if (dist < 100) {
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(particleArray[i].x, particleArray[i].y);
                context.lineTo(particleArray[j].x, particleArray[j].y);
                context.stroke();
            }
        }
    }
}
