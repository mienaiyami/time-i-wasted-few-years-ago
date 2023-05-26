import Paddle from "./paddle.js";
import InputHandler from "./inputHandler.js";
import { LevelBuilder, Brick } from "./levelBuilder.js";
import Ball from "./ball.js";
const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

class Game {
    width: number;
    height: number;
    gameObject: any[];
    bgImg: HTMLImageElement;
    score: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        // this.bgImg = document.createElement("img");
        // this.bgImg.src = "./bg.jpg";
        // this.bgImg.width = width;
        // this.bgImg.height = height;
        this.score = 0;
        console.log(this.bgImg);
    }
    update(dt: number) {
        if (!dt) return;
        ball.checkPaddle(paddle);
        ball.checkCollision(
            context,
            levelBuilder.bricks,
            levelBuilder.levelMap,
            this
        );
        this.gameObject.forEach((e) => e.update(dt));
    }
    draw(context: CanvasRenderingContext2D) {
        document.querySelector(".score > span").innerHTML =
            this.score.toString();
        context.clearRect(0, 0, this.width, this.height);
        if (this.bgImg) context.drawImage(this.bgImg, -100, -100);
        this.gameObject.forEach((e) => e.draw(context));
    }
}

const game = new Game(GAME_WIDTH, GAME_HEIGHT);
// prettier-ignore
const level1 = [
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    0,0,1,1,1,1,1,1,0,0,
]
const ball = new Ball(game, 20, GAME_WIDTH, GAME_HEIGHT);
const levelBuilder = new LevelBuilder(game, level1);
const paddle = new Paddle(game);
new InputHandler(paddle, ball);
game.gameObject = [levelBuilder, ball, paddle];
let lastTime = 0;
const gameLoop = (timestamp) => {
    let dt = timestamp - lastTime;
    lastTime = timestamp;
    game.update(dt);
    game.draw(context);
    requestAnimationFrame(gameLoop);
};
gameLoop(0);
// requestAnimationFrame(gameLoop);
