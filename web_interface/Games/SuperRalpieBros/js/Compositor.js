export default class Compositer { // put layers together
    constructor(){
        this.layers = [];
    }
    draw(context){
        this.layers.forEach(layer => {
            layer(context);
        });
    }
}