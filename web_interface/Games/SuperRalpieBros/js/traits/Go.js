import { Trait } from '../classes/Entity.js';

export class Go extends Trait{
    constructor(){
        super('go');
        this.direction = 0; 
        this.speed = 6000;
        this.heading = 1; // 1 for heading right, 0 for heading left
    }

    update(entitiy, deltaTime){
        entitiy.vel.x = this.speed * this.direction * deltaTime;
        if(this.direction){
            this.heading = this.direction;
        }
        else this.distance = 0;
    }
}