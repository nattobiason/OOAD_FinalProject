import Block from "./classes/Block.js";
import Level from "./classes/Level.js";
import { createBackgroundLayer, createBlockLayer } from "./layers.js";

export  function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () =>{
            resolve(image);
        });
        image.src = url;
    });
}
function loadJSON(url){
    return fetch(url)
    .then(r => r.json());
}

function creatTiles(level, backgrounds){
    // ep. 6 @20:00, made this faster or something idk, i ignored it
    backgrounds.forEach(background => {
        background.ranges.forEach(([xStart, xLen, yStart, yLen]) => {
            const xEnd = xStart + xLen;
            const yEnd = yStart + yLen;
            for (let x = xStart; x < xEnd; x++){
                for (let y = yStart; y < yEnd; y++){
                    level.tiles.set(x, y, {
                        name: background.tile,
                        type: background.type,
                    });
                }
            }
        });
    });
}

export function loadBlockSheet(name){
    return loadJSON(`/web_interface/Games/SuperRalpieBros/blocks/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec, 
        loadImage(sheetSpec.imageURL),
    ]))
    .then(([sheetSpec, image]) => {
        const blocks = new Block(
            image,
            sheetSpec.tileW,
            sheetSpec.tileH);

        if(sheetSpec.tiles){
            sheetSpec.tiles.forEach(tileSpec => {
                blocks.define(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
            });
        }

        if(sheetSpec.frames){
            sheetSpec.frames.forEach( frameSpec => {
                blocks.define(frameSpec.name, ...frameSpec.rect)
            });
        }

        return blocks;
    });
}

export function loadLevel(name){
    return loadJSON(`/web_interface/Games/SuperRalpieBros/levels/${name}.json`)
    .then(levelSpec => Promise.all([
        levelSpec,
        loadBlockSheet(levelSpec.blockSheet),
    ]))
    .then(([levelSpec, backgroundBlock]) =>{
        const level = new Level();

        creatTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgroundLayer(level, backgroundBlock);
        level.comp.layers.push(backgroundLayer);
    
        const blockLayer = createBlockLayer(level.entities);
        level.comp.layers.push(blockLayer);


        return level;
    });
}