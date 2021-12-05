import {loadLevel} from './loaders.js'
import Timer from './classes/Timer.js'
import { createRalphie } from './createRalphie.js'
import { setupKeyboard } from './input.js'
import Camera from './classes/Camera.js'
import { createCameraLayer } from './layers.js'




const canvas = document.getElementById('game-area');
const context = canvas.getContext('2d');



Promise.all([ // load everything in parellel
    createRalphie(),
    loadLevel('1-1')
])
.then(([ ralphie, level ]) => {

    const camera =  new Camera();
    
    ralphie.pos.set(64, 64);

    level.comp.layers.push(createCameraLayer(camera));

    level.entities.add(ralphie);

    const input = setupKeyboard(ralphie);
    input.listenTo(window);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime){
        level.update(deltaTime);
        if(ralphie.pos.x > 100){
            camera.pos.x = ralphie.pos.x - 100;
        }
        level.comp.draw(context, camera) ;
    }

    timer.start();
});

