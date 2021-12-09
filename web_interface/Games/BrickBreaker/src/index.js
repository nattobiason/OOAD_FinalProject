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

class Paddle {
    constructor(game) {
        
        this.width = 150;

        this.height= 30;

        this.maxSpeed = 10;

        this.speed = 0;
        
        this.position = {
            x: game.GAME_WIDTH/2 - this.width/2,
            y: game.GAME_HEIGHT - this.height - 10,
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


class Ball {
    constructor(game){
        this.image = document.getElementById("img_ball")
        this.speed = {x: 3, y: 4}
        this.position = {x: 10, y:10}
        this.size = 50
        this.gameWidth = game.GAME_WIDTH;
        this.gameHeight = game.GAME_HEIGHT;
        this.game = game;
    }
    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(this.position.x+this.size > this.gameWidth || this.position.x < 0) this.speed.x = -this.speed.x;
        if(this.position.y+this.size > this.gameHeight || this.position.y < 0) this.speed.y = -this.speed.y;
        if(this.position.y + this.size >= this.game.paddle.position.y && this.position.x >= this.game.paddle.position.x
            && this.position.x + this.size <= this.game.paddle.position.x + this.game.paddle.width) {
            this.speed.y = -this.speed.y
            this.position.y = this.game.paddle.position.y - this.size;
        }

    }
}

class Game {
    constructor(gameWidth, gameHeight){
        this.GAME_WIDTH = gameWidth
        this.GAME_HEIGHT = gameHeight
    }
    start(){
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        new InputHandler(this.paddle);
    }
    update(deltaTime) {
        this.paddle.update(deltaTime); 
        this.ball.update(deltaTime);

    }
    draw(context){
        this.paddle.draw(context);
        this.ball.draw(context);
    }
}

let canvas = document.getElementById("gameScreen");
let context =  canvas.getContext("2d");

const GAME_WIDTH = 200;
const GAME_HEIGHT = 180;

let game = new Game(GAME_WIDTH, GAME_HEIGHT)
game.start();

context.clearRect(0, 0, 200, 180);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(context);
    requestAnimationFrame(gameLoop);
}

gameLoop();