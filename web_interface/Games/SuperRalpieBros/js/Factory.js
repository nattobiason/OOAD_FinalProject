import Entity from './traits/Entity.js';
import { Go } from './traits/Go.js';
import { Jump } from './traits/Jump.js';
import { loadBlockSheet } from './loaders.js';

export function createRalphie(){
    return loadBlockSheet('ralphie')
    .then(block =>{
        const ralphie = new Entity();
        ralphie.size.set(32, 25);

        ralphie.addTrait(new Go(6000, 1, 0));
        ralphie.addTrait(new Jump());

        function routeFrame(ralphie){
            return 'ralphie';
        }

        ralphie.draw = function drawRalphie(context){
            block.draw(routeFrame(this), context, 0, 0, ralphie.go.heading < 0);
        }
        

        return ralphie;
    });

}

export function createRam(){
    return loadBlockSheet('ram')
    .then(block =>{
        const ram = new Entity();
        ram.size.set(18, 16);

        ram.addTrait(new Go(-1500, 1, 1));

        function routeFrame(ram){
            return 'ram';
        }

        ram.draw = function drawRam(context){
            block.draw(routeFrame(this), context, 0, 0, ram.go.heading < 0);
        }
        

        return ram;
    });
}
