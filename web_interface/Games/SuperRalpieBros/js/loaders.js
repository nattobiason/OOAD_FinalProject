import Level from "./level.js";
import { createBackgroundLayer, createBlockLayer } from "./layers.js";
import { loadBackgroundBlocks } from "./loadblocks.js";

export  function loadImage(url){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () =>{
            resolve(image);
        });
        image.src = url;
    });
}

function creatTiles(level, backgrounds){
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; x++){
                for (let y = y1; y < y2; y++){
                    level.tiles.set(x, y, {
                        name: background.tile,
                    });
                }
            }
        });
    });
}

export function loadLevel(name){
    return Promise.all([
        fetch(`/web_interface/Games/SuperRalpieBros/levels/${name}.json`)
        .then(r => r.json()),
        loadBackgroundBlocks(),
    ])
    .then(([levelSpec, backgroundBlock]) =>{
        const level = new Level();

        creatTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgroundLayer(level, backgroundBlock);
        level.comp.layers.push(backgroundLayer);
    
        const blockLayer = createBlockLayer(level.entities);
        level.comp.layers.push(blockLayer);

        // console.log(level);

        return level;
    });
}