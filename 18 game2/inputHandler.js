export default class InputHandler {
    constructor(paddle, ball) {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    paddle?.moveLeft();
                    break;
                case "ArrowRight":
                    paddle?.moveRight();
                    break;
                case "w":
                    ball.toggleSpeed();
                    break;
                default:
                    break;
            }
        });
        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    if (paddle?.speed < 0)
                        paddle?.stop();
                    break;
                case "ArrowRight":
                    if (paddle?.speed > 0)
                        paddle?.stop();
                    break;
                default:
                    break;
            }
        });
    }
}
