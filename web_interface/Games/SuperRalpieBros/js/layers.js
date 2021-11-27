

export function createBackgroundLayer(level, block){
    const buff = document.createElement('canvas');
    buff.width = 256;
    buff.height = 240;

    const context = buff.getContext('2d');

    level.tiles.forEach((tile, x, y) =>{
        block.drawTile(tile.name, context, x, y);
    });


    return function drawBackgroundLayer(context){
        context.drawImage(buff, 0, 0);
    };
}

export function createBlockLayer(entities){
    return function drawBlockLayer(context){
        entities.forEach(entity => {
            entity.draw(context);
        });
    };
}

export function createCollisonLayer(level){ 
    const resolvedTiles = [];

    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOrginial = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y){
        resolvedTiles.push({x,y});
        return getByIndexOrginial.call(tileResolver, x, y);
    }


    // return function drawCollision(context){
    //     console.log('inside');

    //     context.strokeStyle = 'blue';

    //     resolvedTiles.forEach(({x,y}) => {
    //         context.beginPath();
    //         context.rect(x*tileSize, y*tileSize, tileSize, tileSize);
    //         context.stroke();
    //     });
    //     resolvedTiles.length = 0;
    // };

}