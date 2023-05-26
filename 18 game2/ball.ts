import { Brick } from "./levelBuilder";
import Paddle from "./paddle";

export default class Ball {
    size: number;
    pos: { x: number; y: number };
    screenwidth: number;
    screenheight: number;
    dx: number;
    dy: number;
    speed: number;
    game: any;
    constructor(game, size, screenwidth, screenheight) {
        this.size = size;
        this.game = game;
        this.pos = { x: screenwidth / 2, y: screenheight / 2 };
        this.screenwidth = screenwidth;
        this.screenheight = screenheight;
        this.speed = 5;
        this.dx = this.speed;
        this.dy = this.speed;
    }
    toggleSpeed() {
        if (this.speed === 5) {
            console.log("f");
            this.speed = 10;
            this.dx *= 20;
            this.dy *= 20;
            return;
        }
        if (this.speed === 10) {
            this.speed = 5;
            this.dx /= 20;
            this.dy /= 20;
            return;
        }
    }
    checkCollision(
        context: CanvasRenderingContext2D,
        brickArr: Brick[],
        levelMap: number[],
        game
    ) {
        brickArr.forEach((e, i) => {
            // if (context.isPointInPath(e.path, this.pos.x, this.pos.y)) {
            //     console.log("dd");
            //     levelMap[i] = 0;
            // }
            let left = e.pos.x;
            let right = e.pos.x + e.width;
            let top = e.pos.y;
            let bottom = e.pos.y + e.height;

            let Xn = Math.max(left, Math.min(this.pos.x, right));
            let Yn = Math.max(top, Math.min(this.pos.y, bottom));

            let Dx = Xn - this.pos.x;
            let Dy = Yn - this.pos.y;
            let isIntersecting = Dx * Dx + Dy * Dy <= this.size * this.size;
            if (isIntersecting) {
                // console.log(Xn, Yn, Dx, Dy);
                if (Dy === 0) this.dx = -this.dx;
                if (Dx === 0) this.dy = -this.dy;
                game.score += 1;
                levelMap[i] = 0;
            }
        });
    }
    checkPaddle(paddle: Paddle) {
        if (
            this.pos.y + this.size > this.screenheight ||
            this.pos.y + this.size >= paddle.pos.y
        ) {
            if (
                this.pos.y <= paddle.pos.y &&
                Math.sign(this.dy) === -1 &&
                this.pos.y + this.size > paddle.pos.y &&
                this.pos.x + this.size >= paddle.pos.x &&
                this.pos.x - this.size <= paddle.pos.x + paddle.width
            ) {
                console.log("f");
                this.dx = -this.dx;
                this.dy = -this.dy;
                return;
            }
            if (
                this.pos.y + this.size >= paddle.pos.y &&
                this.pos.y <= paddle.pos.y &&
                this.pos.x + this.size >= paddle.pos.x &&
                this.pos.x - this.size <= paddle.pos.x + paddle.width
            ) {
                this.dy = -this.dy;
                return;
            }
        }
    }
    update(dt: number) {
        this.pos.x += this.dx;
        this.pos.y += this.dy;
        if (
            this.pos.x + this.size >= this.screenwidth ||
            this.pos.x <= this.size
        )
            this.dx = -this.dx;
        if (this.pos.y + this.size >= this.screenheight) {
            this.pos = { x: this.screenwidth / 2, y: this.screenheight / 2 };
            console.log("game over");
        }
        if (
            // this.pos.y >= this.screenheight - this.size ||
            this.pos.y <= this.size
        )
            this.dy = -this.dy;
    }
    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.fillStyle = "blue";
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.restore();
    }
}
