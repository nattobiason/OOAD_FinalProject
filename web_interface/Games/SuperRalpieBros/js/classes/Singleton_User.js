

export default class Single_User{
    constructor(){
        if(Single_User.instance){
            throw new Error("Singleton classes can't be instantiated more than once");
        }
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
}