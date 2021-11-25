import Block from './Block.js';
import {loadImage, loadLevel} from './loaders.js'

function drawBackground(background, context, block){
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++){
            for (let y = y1; y < y2; y++){
                block.drawTile(background.tile, context, x, y);
            }
        }
    });
}
// function drawBackground(background, context, block){
//     background.ranges.forEach([element] => {
        
//     });
// }

const canvas = document.getElementById('game-area');
const context = canvas.getContext('2d');
const my_gradient = context.createLinearGradient(0, 0, 0, 170);
my_gradient.addColorStop(0, "LightSkyBlue");
my_gradient.addColorStop(1, "white");
context.fillStyle = my_gradient;
context.fillRect(0, 0, canvas.width, canvas.height);
console.log(canvas.width);
console.log(canvas.height);



loadImage('/web_interface/Games/SuperRalpieBros/img/pixil-frame-0.png')
.then(image => {
    const block = new Block(image, 16, 16);
    const ralphie_block = new Block(image, 32, 25);
    const g_mushroom_block = new Block(image, 18, 16);

    ralphie_block.define('ralphie', 0, 0);

    block.define('ground', 4, 3);
    block.define('platform-1', 4, 0);
    block.define('platform-2', 4, 1);
    block.define('platform-3', 4, 2);

    block.define('super-box', 2, 0);
    block.define('super-star', 3, 0);
    block.define('coin', 2, 1);
    block.define('life-shroom', 3, 1);

    g_mushroom_block.define('green-mushroom', 0, 1.55);

    loadLevel('1-1')
    .then(level => {
        level.backgrounds.forEach(background => {
            drawBackground(background, context, block);
        });
    });
    // ralphie_block.drawTile('ralphie', context, 0.5, 4.5);
    // block.drawTile('platform-1', context, 6, 5);
    // block.drawTile('platform-2', context, 7, 5);
    // block.drawTile('platform-3', context, 8, 5);
    // block.drawTile('coin', context, 6, 4);
    // block.drawTile('super-box', context, 9, 5);
    // block.drawTile('life-shroom', context, 9, 4);
    // block.drawTile('super-star', context, 4, 6);
    // g_mushroom_block.drawTile('green-mushroom', context, 6, 7.5);

    // context.drawImage(image, 
    //     0,0,33,30, // tile (location on image)
    //     10,0,33,30); // location on page
});