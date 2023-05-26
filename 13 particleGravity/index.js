const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    over: null,
};

class Gravity {
    constructor(x, y, size, gravity, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gravity = gravity;
        this.color = color || "#010101";
        this._color = "#fff";
    }
    draw() {
        context.save();
        context.beginPath();
        this.center = new Path2D();
        this.center.arc(this.x, this.y, this.size, Math.PI * 2, 0);
        context.fillStyle = this.color;
        if (mouse.over === "gravity1") {
            context.fillStyle = this._color;
        }
        context.filter = "blur(2px)";
        context.fill(this.center);
        context.arc(this.x, this.y, 2, Math.PI * 2, 0);
        context.fillStyle = "#fff";
        context.fill();

        context.beginPath();
        this.orbit = new Path2D();
        this.orbit.arc(this.x, this.y, 300, Math.PI * 2, 0);
        context.strokeStyle = "#fff";
        context.filter = "none";
        context.lineWidth = 0.1;
        context.stroke(this.orbit);
        context.restore();
    }
}
class Particle {
    constructor(x, y, size, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this._dx = this.dx;
        this._dy = this.dy;
        this.state = "play";
    }
    draw() {
        context.save();
        context.beginPath();
        this.shape = new Path2D();
        this.shape.arc(this.x, this.y, this.size, Math.PI * 2, 0);
        context.fillStyle = this.color;
        context.fill(this.shape);
        context.restore();
    }
    update() {
        if (this.state === "play") {
            this.x += this._dx;
            this.y += this._dy;
            if (this.x > canvas.width - this.size || this.x <= 0) {
                this._dx = -this._dx;
            }
            if (this.y >= canvas.height - this.size || this.y <= 0) {
                this._dy = -this._dy;
            }
        }
    }
}
const particle1 = new Particle(610, 300, 10, -4, 0, "#fff");
let particleArray = [];
for (let i = 0; i < 20; i++) {
    pushParticle(i);
}
function pushParticle(i) {
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;
    let size = 2;
    //     let dx = Math.random() * -4 + 2;
    //     let dy = Math.random() * -4 + 2;
    let x = 100;
    let y = 20 * i + 200;
    let dx = 1;
    let dy = 0;
    particleArray.push(new Particle(x, y, size, dx, dy, "#fff"));
}
const gravity1 = new Gravity(canvas.width / 2, canvas.height / 2, 30, 10);
function animate() {
    context.save();
    let grd = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        10,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
    );
    // grd.addColorStop(0, "rgba(0, 0, 0, 0.01)");
    // grd.addColorStop(0.6, "rgba(30, 60, 60, 0.01)");
    grd.addColorStop(0, "rgba(0, 0, 0, 0.1)");
    grd.addColorStop(0.6, "rgba(30, 60, 60, 0.1)");

    context.fillStyle = grd;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();
    context.restore();
    // context.clearRect(0, 0, canvas.width, canvas.height);

    gravity1.draw();
    particleArray.forEach((e) => {
        // console.log(e);
        pull(e);
        e.update();
        e.draw();
    });
    // particle1.update();
    // particle1.draw();

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function stop() {
    particle1.state = "stopped";
}
function pull(e) {
    let distance = Math.sqrt((gravity1.x - e.x) ** 2 + (gravity1.y - e.y) ** 2);
    let q = {
        x: Math.sign(gravity1.x - e.x),
        y: Math.sign(gravity1.y - e.y),
    };
    if (e.state === "play") {
        if (distance <= 32) {
            // particleArray.splice(particleArray.indexOf(e), 1);
            // pushParticle();
            return;
        }
        if (distance < 300) {
            // console.clear();
            e.color = "red";
            let g = (gravity1.gravity / distance ** 2) * 50;
            e._dx += q.x * g;
            e._dy += q.y * g;
            e._dx = e._dx >= 3 ? 3 : e._dx;
            e._dy = e._dy >= 3 ? 3 : e._dy;
            e._dx = e._dx <= -3 ? -3 : e._dx;
            e._dy = e._dy <= -3 ? -3 : e._dy;
        } else {
            e.color = "#FFF";
            // particle1._dx = particle1.dx;
            // particle1._dy = particle1.dy;
        }
    }
}

$(canvas).on("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.over = null;
    if (context.isPointInPath(gravity1.center, mouse.x, mouse.y)) {
        mouse.over = "gravity1";
    }
});
