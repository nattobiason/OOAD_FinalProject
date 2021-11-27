import Keyboard from "./Keyboard.js";

export function setupKeyboard(entitiy){
    const input = new Keyboard();

    input.addMapping('ArrowUp', keyState =>{
        if(keyState){
            entitiy.jump.start();
        }
        else entitiy.jump.cancel();

        console.log(keyState);
    });

    input.addMapping("ArrowRight", keyState =>{ // right
        entitiy.go.direction = keyState;
    });

    input.addMapping("ArrowLeft", keyState =>{ // left
        entitiy.go.direction = -keyState;
    });

    return input;
}