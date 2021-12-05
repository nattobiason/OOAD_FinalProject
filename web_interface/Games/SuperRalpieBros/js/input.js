import Keyboard from "./classes/Keyboard.js";

export function setupKeyboard(entitiy){
    const input = new Keyboard();

    input.addMapping('ArrowUp', keyState =>{
        if(keyState){
            entitiy.jump.start();
        }
        else entitiy.jump.cancel();

    });

    input.addMapping("ArrowRight", keyState =>{ 
        entitiy.go.direction += keyState ? 1 : -1;
    });

    input.addMapping("ArrowLeft", keyState =>{
        entitiy.go.direction += keyState ? -1 : 1;
    });

    // input.addMapping("ArrowDown", keyState =>{
        
    // });

    return input;
}