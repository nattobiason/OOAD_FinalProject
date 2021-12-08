// state pattern

export var SuperBox = function(){
    var state = new Alive(this);
    var states = [new StarPower(), new Coin(), new Life(), new Coin(), new Coin(), new Coin()];

    this.change = function (){
        
        const new_state = states[Math.floor(Math.random() * states.length)];
        state = new Dead();
        new_state.go();
    };
    
    this.start = function(){
        state.go();
    };
}

var Dead = function(box){
    return 'sky';
}

var StarPower = function(box){
    this.power = 'super-star';

    this.go = function(){
        console.log("Star power available");
        return this.power;
    }
}

var Coin = function(box){
    this.power = 'coin';

    this.go = function(){
        console.log("Coin collected");
        return this.power;
    }
}

var Life = function(box){
    this.power = 'life-shroom';

    this.go = function(){
        console.log("Life available");
        return this.power;
    }
}
var Alive = function(box){
    this.box = box;
    this.go = function(){
        return box.change();
    }
}


var TrafficLight = function () {
    var count = 0;
    var currentState = new Red(this);

    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };

    this.start = function () {
        currentState.go();
    };
}

var Red = function (light) {
    this.light = light;

    this.go = function () {
        console.log("Red --> for 1 minute");
        light.change(new Green(light));
    }
};

var Yellow = function (light) {
    this.light = light;

    this.go = function () {
        console.log("Yellow --> for 10 seconds");
        light.change(new Red(light));
    }
};

var Green = function (light) {
    this.light = light;

    this.go = function () {
        console.log("Green --> for 1 minute");
        light.change(new Yellow(light));
    }
};

function run() {

    var light = new TrafficLight();
    light.start();
}