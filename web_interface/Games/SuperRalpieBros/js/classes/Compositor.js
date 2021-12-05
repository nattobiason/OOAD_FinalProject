export default class Compositer { // put layers together
    constructor(){
        this.layers = [];
    }
    draw(context, camera){
        this.layers.forEach(layer => {
            layer(context, camera);
        });
    }
}