
export default class Block{
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }
    define(name, x, y){
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement('canvas');
            buffer.width = this.width;
            buffer.height = this.height;
    
    
            const context = buffer.getContext('2d');

            if(flip){
                context.scale(-1, 1);
                context.translate(-this.width, 0);
            }
            
            context.drawImage(
                this.image,
                x * this.width, // (x, y) coords of block on .png
                y * this.height,
                this.width, // width and height of block from .png
                this.height,
                0, // how the image is displaced ???
                0,
                this.width, // (x, y) coords of block on canvas
                this.height);
            
            return buffer;
        });



        
        this.tiles.set(name, buffers);
    }
    draw(name, context, x, y, flip = false){
        const buffer = this.tiles.get(name)[flip ? 1 : 0];
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y){
        this.draw(name, context, x*this.width, y*this.height);

    }
}

