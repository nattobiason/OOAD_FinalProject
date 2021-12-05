import Entity from './classes/Entity.js';
import { Go } from './traits/Go.js';
import { Jump } from './traits/Jump.js';
import { loadBlockSheet } from './loaders.js';

export function createRalphie(){
    return loadBlockSheet('ralphie')
    .then(block =>{
        const ralphie = new Entity();
        ralphie.size.set(32, 25);

        ralphie.addTrait(new Go());
        ralphie.addTrait(new Jump());

        function routeFrame(ralphie){
            return 'ralphie';
            // if want to animate running, go to ep.7 10:15
        }

        ralphie.draw = function drawRalphie(context){
            block.draw(routeFrame(this), context, 0, 0, ralphie.go.heading < 0);
        }
        

        return ralphie;
    });

}
