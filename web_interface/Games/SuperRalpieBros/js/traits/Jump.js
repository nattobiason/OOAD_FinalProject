import { Trait } from "./Entity.js";

export class Jump extends Trait{
    constructor(){
        super('jump');
        this.duration = 0.3; // max time to hold the button
        this.velocity = 200; // velocity of jump
        this.engageTime = 0;
    }
    start(){
        this.engageTime = this.duration;
    }
    cancel(){
        this.engageTime = 0;
    }
    update(entitiy, deltaTime){
        if(this.engageTime>0){
            entitiy.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}