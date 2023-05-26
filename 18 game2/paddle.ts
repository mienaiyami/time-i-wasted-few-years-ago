export default class Paddle {
    width: number;
    height: number;
    maxSpeed: number;
    speed: number;
    margin: number;
    pos: { x: number; y: number };
    game: any;
    constructor(game) {
        this.game = game;
        this.width = 150;
        this.height = 20;
        this.maxSpeed = 10;
        this.speed = 0;
        this.margin = 0;
        this.pos = {
            x: this.game.width - this.width - 100,
            y: this.game.height - this.height - this.margin,
        };
    }
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = +this.maxSpeed;
    }
    stop() {
        this.speed = 0;
    }
    update(dt: number) {
        this.pos.x += this.speed;
        if (this.pos.x >= this.game.width - this.width - this.margin)
            this.pos.x = this.game.width - this.width - this.margin;
        if (this.pos.x <= 0 + this.margin) this.pos.x = 0 + this.margin;
        // this.pos.x += 1;
    }
    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.fillStyle = "red";
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        context.restore();
    }
}
