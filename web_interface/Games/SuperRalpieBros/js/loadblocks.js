import {loadImage} from './loaders.js'
import Block from './Block.js';


export function loadRalphieBlock(){
    return loadImage('/web_interface/Games/SuperRalpieBros/img/pixil-frame-0.png')
    .then(image => {
        // const block = new Block(image, 16, 16);
        const ralphie_block = new Block(image, 32, 25);
        // const g_mushroom_block = new Block(image, 18, 16);

        ralphie_block.define('ralphie', 0, 0);

        // block.define('ground', 4, 3);
        // block.define('platform-1', 4, 0);
        // block.define('platform-2', 4, 1);
        // block.define('platform-3', 4, 2);

        // block.define('super-box', 2, 0);
        // block.define('super-star', 3, 0);
        // block.define('coin', 2, 1);
        // block.define('life-shroom', 3, 1);

        // g_mushroom_block.define('green-mushroom', 0, 1.55);
        return ralphie_block;
    });
}

export function loadBackgroundBlocks(){
    return loadImage('/web_interface/Games/SuperRalpieBros/img/pixil-frame-0.png')
    .then(image => {
        const block = new Block(image, 16, 16);

        block.define('sky', 3, 2);

        block.define('ground', 4, 3);
        block.define('platform-1', 4, 0);
        block.define('platform-2', 4, 1);
        block.define('platform-3', 4, 2);

        block.define('super-box', 2, 0);
        block.define('super-star', 3, 0);
        block.define('coin', 2, 1);
        block.define('life-shroom', 3, 1);

        return block;
    });
}