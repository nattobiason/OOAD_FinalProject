import TileResolver from "./TileResolver.js";
import { SuperBox } from "./State.js";
import Block from "./Block.js";
import { loadJSON } from "../loaders.js";
// has been edited: but og code came from https://www.youtube.com/watch?v=YLMP5jmtpYc&ab_channel=MethMethMethod



export default class TileCollider{
    constructor(tileMatrix){
        this.tiles = new TileResolver(tileMatrix);
    }
    checkX(entity, user){
        let x;
        if(entity.vel.x > 0){
            x = entity.pos.x + entity.size.x;
        } else if(entity.vel.x < 0){
            x = entity.pos.x;
        } else return;
        const matches = this.tiles.searchByRange(
            x, x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match =>{

            if(match.tile.type !== 'static'){
                if(match.tile.type === 'death'){
                    console.log("die");
                    user.update_lives();
                    // user.level_reset();
                }
                if(match.tile.type === 'flag'){
                    console.log("You passed level 1-1!")
                }
                return;
            }
            if(entity.vel.x > 0){ // if idle is falling
                if(entity.pos.x + entity.size.x > match.x1){  // inside the tile
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            }
            else if(entity.vel.x < 0){ // if idle is falling
                if(entity.pos.x < match.x2){  // inside the tile
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        });
    }
    checkY(entity, user){
        let y;
        if(entity.vel.y > 0){
            y = entity.pos.y + entity.size.y;
        } else if(entity.vel.y < 0){
            y = entity.pos.y;
        } else return;
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            y, y);

        matches.forEach(match =>{

            if(match.tile.type !== 'static' && match.tile.type !== 'death'){

                return;
            }
            
            if(entity.vel.y > 0){ // if idle is falling
                if(match.tile.type === 'death'){
                    match.tile.name = 'sky';
                    match.tile.type = "";
                    console.log("stomp");
                    user.update_score(200);
                }
                if(entity.pos.y + entity.size.y > match.y1){  // inside the tile
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            }
            else if(entity.vel.y < 0){
                if(entity.pos.y < match.y2){  // inside the tile
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
                if(match.tile.name == 'super-box'){
                    match.tile.name = 'platform-3';
                    user.update_score(200);


                    var box = new SuperBox();
                    const power = box.start(); // state patern

                }
            }
        });
    }    

}

