
export function createBackgroundLayer(level, block){
    const tiles = level.tiles;
    const resolver = level.tileCollider.tiles;

    const buff = document.createElement('canvas');
    buff.width = 256 + 16;
    buff.height = 240;

    const context = buff.getContext('2d');

    let startIndex, endIndex;
    function redraw(drawFrom, drawTo){
        if(drawFrom === startIndex && drawTo === endIndex) return;

        startIndex = drawFrom;
        endIndex = drawTo;

        for(let x = startIndex; x <= endIndex; x++){
            const col = tiles.grid[x];
            if(col){
                col.forEach((tile, y) =>{
                    block.drawTile(tile.name, context, x-startIndex, y);
                });
            }
        }
    }


    return function drawBackgroundLayer(context, camera){
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);
        context.drawImage(buff, -camera.pos.x % 16, -camera.pos.y);
    };
}

export function createBlockLayer(entities, width = 64, height = 64){
    const blockBuffer = document.createElement('canvas');
    blockBuffer.width = width;
    blockBuffer.height = height;
    const blockBufferContext  = blockBuffer.getContext('2d');

    return function drawBlockLayer(context, camera){ // responsibility of drawing the block at the right location
        entities.forEach(entity => {
            blockBufferContext.clearRect(0, 0, width, height);
            entity.draw(blockBufferContext);
            context.drawImage(
                blockBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y);
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


}

export function createCameraLayer(cameraToDraw){
    return function drawCameraRect(context, fromCamera){
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y);
        context.stroke();
    };
}