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
const colorArray = [
    "#ffffff",
    "#ff0000",
    "#0000ff",
    // "#FF6633",
    // "#FFB399",
    // "#FF33FF",
    // "#FFFF99",
    // "#00B3E6",
    // "#E6B333",
    // "#3366E6",
    // "#999966",
    // "#99FF99",
    // "#B34D4D",
    // "#80B300",
    // "#809900",
    // "#E6B3B3",
    // "#6680B3",
    // "#66991A",
    // "#FF99E6",
    // "#CCFF1A",
    // "#FF1A66",
    // "#E6331A",
    // "#33FFCC",
    // "#66994D",
    // "#B366CC",
    // "#4D8000",
    // "#B33300",
    // "#CC80CC",
    // "#66664D",
    // "#991AFF",
    // "#E666FF",
    // "#4DB3FF",
    // "#1AB399",
    // "#E666B3",
    // "#33991A",
    // "#CC9999",
    // "#B3B31A",
    // "#00E680",
    // "#4D8066",
    // "#809980",
    // "#E6FF80",
    // "#1AFF33",
    // "#999933",
    // "#FF3380",
    // "#CCCC00",
    // "#66E64D",
    // "#4D80CC",
    // "#9900B3",
    // "#E64D66",
    // "#4DB380",
    // "#FF4D4D",
    // "#99E6E6",
    // "#6666FF",
];
class Particle {
    constructor(x, y, size, dx, dy) {
        this.x = x || 200;
        this.y = y || 200;
        // this.dx = Math.random() * -2 + 1;
        // this.dy = Math.random() * 2 + 5;
        this.dx = dx || 0;
        this.dy = dy || 0;
        this.size = size || 100;
    }
    draw() {
        // context.save();
        // this.shape = new Path2D();
        context.beginPath();
        context.arc(this.x, this.y, this.size, Math.PI * 2, 0);
        // context.fillStyle =
        //     colorArray[Math.floor(colorArray.length * Math.random())];
        context.fillStyle = "white ";
        context.fill();
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
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

// var a_x;
// var b_x;
// var a_y;
// var b_y;
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
    // if (x < canvas.width / 2) {
    // dx = Math.random() * -2;
    // dx = ((x - canvas.width / 2) / canvas.width) * 10;
    // }
    // if (x >= canvas.width / 2) {
    //     // dx = Math.random() * 2;
    dx = ((x - canvas.width / 2) / canvas.width) * 5;
    // }
    // if (y < canvas.height / 2) {
    // dy = Math.random() * -2;
    // dy = ((y - canvas.height / 2) / canvas.height) * 10;
    // }
    // if (y >= canvas.height / 2) {
    // dy = Math.random() * 2;
    dy = ((y - canvas.height / 2) / canvas.height) * 5;
    // }
    particleArray.push(new Particle(x, y, size, dx, dy));
}

function init() {
    for (let i = 0; i < maxParticles; i++) {
        pushParticle();
    }
}
init();
function animate() {
    // context.save();
    context.fillStyle = "rgba(0,0,0,0.08)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.restore();
    // context.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach((e) => {
        e.update();
        e.draw();
    });
    requestAnimationFrame(animate);
}
animate();
// requestAnimationFrame(animate);
