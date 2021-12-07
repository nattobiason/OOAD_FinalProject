import {loadLevel} from './loaders.js'
import Timer from './classes/Timer.js'
import { createRalphie, createRam } from './Factory.js'
import { setupKeyboard } from './input.js'
import Camera from './classes/Camera.js'
import { createCameraLayer } from './layers.js'
import Single_User from './classes/Singleton_User.js'





const canvas = document.getElementById('game-area');
const context = canvas.getContext('2d');
const user = new Single_User();



Promise.all([ // load everything in parellel
    createRalphie(),
    createRam(),
    loadLevel(user.current_world)
])
.then(([ ralphie, ram, level ]) => {

    const camera =  new Camera();
    
    ralphie.pos.set(64, 64);
    ram.pos.set(275, 64);

    level.comp.layers.push(createCameraLayer(camera));

    level.entities.add(ralphie);
    level.entities.add(ram);

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

