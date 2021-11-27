import {loadLevel} from './loaders.js'
import Timer from './Timer.js'
import {loadBackgroundBlocks} from './loadblocks.js'
import Compositer from './Compositor.js'
import {createBackgroundLayer, createBlockLayer} from './layers.js'
import { createRalphie } from './createRalphie.js'
import Entity from './Entity.js'
import Keyboard from './Keyboard.js'
import { createCollisonLayer } from './layers.js'
import { setupKeyboard } from './input.js'




const canvas = document.getElementById('game-area');
const context = canvas.getContext('2d');



Promise.all([ // load everything in parellel
    createRalphie(),
    loadLevel('1-1')
])
.then(([ ralphie, level ]) => {

    ralphie.pos.set(64, 64);

    level.entities.add(ralphie);

    const input = setupKeyboard(ralphie);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime){
        level.update(deltaTime);
        level.comp.draw(context);
    }

    timer.start();
});

// trait is an instance of a class that can opperate on an entitiy

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
