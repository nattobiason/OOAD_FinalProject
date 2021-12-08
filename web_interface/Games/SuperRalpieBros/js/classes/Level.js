import Compositer from "./Compositor.js";
import { Matrix } from "./Math.js";
import TileCollider from "./TileCollider.js";

export default class Level{
    constructor(){
        this.gravity = 2000;
        this.comp = new Compositer();
        this.entities = new Set(); // only want there to be one instance of every entity in the level
        this.tiles = new Matrix(); // how tiles are set up on screen

        this.tileCollider = new TileCollider(this.tiles);
    }
    update(deltaTime, user){
        this.entities.forEach(entity =>{
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity, user);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity, user);
            entity.vel.y += this.gravity * deltaTime;
        });
    }
}