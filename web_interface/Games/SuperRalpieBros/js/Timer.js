export default class Timer{
    // deltaTime is a ratio to make all browsers run ~equally 
    constructor(deltaTime = 1/60){
        let accumulatedTime = 0; // accumulator pattern
        let lastTime = 0;


        this.updateProxy = (time) =>{

            accumulatedTime += (time-lastTime)/1000;
            while(accumulatedTime>deltaTime){
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }

            lastTime = time;
            this.enqueue();
        }
    }
    enqueue(){
        requestAnimationFrame(this.updateProxy);
    }
    start(){
        this.enqueue();
    }
}