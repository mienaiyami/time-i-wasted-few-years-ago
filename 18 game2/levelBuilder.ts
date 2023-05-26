export class Brick {
    width: number;
    height: number;
    src: string;
    path: Path2D;
    isVisible: boolean;
    pos: { x: number; y: number };
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        visible: boolean,
        src?: string
    ) {
        this.pos = { x, y };
        this.width = width;
        this.height = height;
        this.isVisible = visible;
        this.src = src;
    }
    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.fillStyle = "#566b6c";

        this.path = new Path2D();
        this.path.rect(this.pos.x, this.pos.y, this.width, this.height);
        if (this.isVisible) context.fill(this.path);
        context.restore();
    }
}

export class LevelBuilder {
    levelMap: any;
    rowLength: number;
    columnLength: number;
    brickGap: number;
    brickProp: { width: number; height: number };
    bricks: any[];
    game: any;
    constructor(game, level: any[]) {
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
    update() {}
    draw(context: CanvasRenderingContext2D) {
        this.bricks = [];
        context.save();
        let x = 0;
        let y = 0;
        let index = 0;
        for (let j = 0; j < this.columnLength; j++) {
            x = 0;
            for (let i = 0; i < this.rowLength; i++) {
                if (this.levelMap[index] === 1) {
                    this.bricks.push(
                        new Brick(
                            x,
                            y,
                            this.brickProp.width,
                            this.brickProp.height,
                            true
                        )
                    );
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
