function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () =>{
            resolve(image);
        });
        image.src = url;
    });
}

class SpriteSheet{
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }
    define(name, x, y){
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        buffer.getContext('2d')
        .drawImage(
            this.image,
            x * this.width,
            y * this.height.Image,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height);
        this.tiles.set(name, buffer);
    }
    draw(name, context, x, y){
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }
}


const canvas = document.getElementById('game-area');
const context = canvas.getContext('2d');
context.fillStyle = 'white';
context.fillRect(0,0,canvas.width, canvas.height);

loadImage('img/pixil-frame-0.png')
.then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.draw('ground', context, 45, 62);

    context.drawImage(image, 
        0,0,33,30, // tile
        10,0,33,30); // location
});