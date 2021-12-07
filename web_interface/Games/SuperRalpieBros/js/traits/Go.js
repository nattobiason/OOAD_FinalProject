import { Trait } from './Entity.js';

export class Go extends Trait{
    constructor(speed, heading, dir){
        super('go');
        this.direction = dir; 
        this.speed = speed;
        this.heading = heading; // 1 for heading right, 0 for heading left
    }

    update(entitiy, deltaTime){
        entitiy.vel.x = this.speed * this.direction * deltaTime;
        if(this.direction){
            this.heading = this.direction;
        }
        else this.distance = 0;
    }
}