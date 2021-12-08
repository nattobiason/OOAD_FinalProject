// singleton pattern
export default class Single_User{
    constructor(canvas, context){
        if(Single_User.instance){
            throw new Error("Singleton classes can't be instantiated more than once");
        }
        this.canvas = canvas;
        this.context = context;
        this.score = 0;
        this.lives = 3;
        this.coins = 0;
        this.current_world = '1-1';
        this.available_worlds = ['1-1'];
        Single_User.instance = this;
    }


    updateWorld(cur_world){
        this.current_world = cur_world;
    }
    add_available_world(world){
        this.available_worlds[this.available_worlds.length] = world;
        console.log("New world unlocked: 1-2")
    }
    update_score(add){
        this.score+=add;
        console.log("Score:", this.score);
    }

    update_coins(add){
        this.coins+=add;
        console.log("Coins:", this.coins);
    }
    update_lives(){
        this.lives--;
        console.log("Lives:", this.lives)
        if(this.lives == 0){
            console.log("Game Over :(")
        }
    }
    getInstance(){
        return this.instance;
    }
    deleteUser(){
        Single_User.instance = null;
    }
    
    // level_reset(){
    //     this.coins = 0;
    //     this.score = 0;
    //     begin_level(this.canvas, this.context, this);
    // }
}