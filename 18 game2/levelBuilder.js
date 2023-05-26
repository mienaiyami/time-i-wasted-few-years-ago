export class Brick {
    width;
    height;
    src;
    path;
    isVisible;
    pos;
    constructor(x, y, width, height, visible, src) {
        this.pos = { x, y };
        this.width = width;
        this.height = height;
        this.isVisible = visible;
        this.src = src;
    }
    draw(context) {
        context.save();
        context.fillStyle = "#566b6c";
        this.path = new Path2D();
        this.path.rect(this.pos.x, this.pos.y, this.width, this.height);
        if (this.isVisible)
            context.fill(this.path);
        context.restore();
    }
}
export class LevelBuilder {
    levelMap;
    rowLength;
    columnLength;
    brickGap;
    brickProp;
    bricks;
    game;
    constructor(game, level) {
        this.game = game;
        this.levelMap = level || Array(50);
        this.rowLength = 10;
        this.columnLength = 5;
        this.brickGap = 5;
        this.brickProp = {
            width: this.game.width / this.rowLength - this.brickGap,
            height: (this.game.height / 3 - this.brickGap) / this.columnLength,
        };
        this.bricks = [];
    }
    update() { }
    draw(context) {
        this.bricks = [];
        context.save();
        let x = 0;
        let y = 0;
        let index = 0;
        for (let j = 0; j < this.columnLength; j++) {
            x = 0;
            for (let i = 0; i < this.rowLength; i++) {
                if (this.levelMap[index] === 1) {
                    this.bricks.push(new Brick(x, y, this.brickProp.width, this.brickProp.height, true));
                }
                if (this.levelMap[index] === 0) {
                    this.bricks.push(new Brick(0, 0, 0, 0, false));
                }
                index++;
                x += this.brickProp.width + this.brickGap;
            }
            y += this.brickProp.height + this.brickGap;
        }
        this.bricks.forEach((e) => e.draw(context));
        context.restore();
    }
}
