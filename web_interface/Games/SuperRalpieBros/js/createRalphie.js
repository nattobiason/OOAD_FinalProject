import Entity from './Entity.js';
import { Velocity } from './traits/Velocity.js';
import { Go } from './traits/Go.js';
import { loadRalphieBlock } from './loadblocks.js';
import { Jump } from './traits/Jump.js';

export function createRalphie(){
    return loadRalphieBlock()
    .then(block =>{
        const ralphie = new Entity();
        ralphie.size.set(32, 25);

        ralphie.addTrait(new Go());
        ralphie.addTrait(new Jump());
        // ralphie.addTrait(new Velocity());

        ralphie.draw = function drawRalphie(context){
            block.draw('ralphie', context, this.pos.x , this.pos.y );
        }
        

        return ralphie;
    });

}
