class Paddle {
    constructor(gameWidth, gameHeight) {
        
        this.width = 150;

        this.height= 30;

        this.maxSpeed = 10;

        this.speed = 0;
        
        this.position = {
            x: gameWidth/2 - this.width/2,
            y: gameHeight - this.height - 10,
        };
    }
    draw(context) {
        context.fillStyle = "#00f";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(deltaTime) {
        if (!deltaTime) return;
        this.position.x += this.speed;

        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > 1200) this.position.x = 1200 - this.width;
    }
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }
    stop() {
        this.speed = 0;
    }
}

class InputHandler {
    constructor(paddle){
        document.addEventListener("keydown", (event) => {
            switch(event.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;
                case 39:
                    paddle.moveRight();
                    break;
            }
        });
        document.addEventListener("keyup", (event) => {
            switch(event.keyCode) {
                case 37:
                    if(paddle.speed < 0) paddle.stop();
                    break;
                case 39:
                    if(paddle.speed > 0) paddle.stop();
                    break;
            }
        });
    }
}

let canvas = document.getElementById("gameScreen");
let context =  canvas.getContext("2d");

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 600;

context.clearRect(0, 0, 1200, 600);

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
paddle.draw(context);

new InputHandler(paddle);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    context.clearRect(0, 0, 1200, 600);
    paddle.update(deltaTime);    
    paddle.draw(context);

    requestAnimationFrame(gameLoop);
}

gameLoop();