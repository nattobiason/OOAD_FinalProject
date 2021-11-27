import { Trait } from '../Entity.js';

export class Velocity extends Trait{
    constructor(){
        super('velocity');
    }
    update(entitiy, deltaTime){
        entitiy.pos.x += entitiy.vel.x * deltaTime;
        entitiy.pos.y += entitiy.vel.y * deltaTime;
    }
}