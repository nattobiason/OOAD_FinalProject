import { Trait } from '../Entity.js';

export class Go extends Trait{
    constructor(){
        super('go');
        this.direction = 0; // max time to hold the button
        this.speed = 6000;
    }

    update(entitiy, deltaTime){
        entitiy.vel.x = this.speed * this.direction * deltaTime;
        if(this.engageTime>0){
            entitiy.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}