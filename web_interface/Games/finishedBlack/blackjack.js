
var htmlApp = {};

// Store important elements in variables for later manipulation
htmlApp.pcards = document.getElementById('pcards');
htmlApp.dcards = document.getElementById('dcards');

htmlApp.hitButton = document.getElementById('hit');
htmlApp.stayButton = document.getElementById('stay');
htmlApp.doubleButton = document.getElementById('double-down');
htmlApp.surrenderButton = document.getElementById('surrender');
htmlApp.insuranceButton = document.getElementById('insurance');


htmlApp.playButton = document.getElementById('play');
htmlApp.textUpdates = document.getElementById('textUpdates');
htmlApp.buttonBox = document.getElementById('buttonBox');
htmlApp.phandtext = document.getElementById('phand');
htmlApp.dhandtext = document.getElementById('dhand');
htmlApp.tracker = document.getElementById('tracker');
htmlApp.newgame = document.getElementById('newgame');
htmlApp.choice = document.getElementById('choice');

// initialize variables to track hands/cards/etc.
htmlApp.playerHand = [];
htmlApp.dealerHand = [];
htmlApp.deck = [];
htmlApp.suits = ['clubs <span class="bold">&#9827</span>', 'diamonds <span class="redcard">&#9830</span>', 'hearts <span class="redcard">&#9829</span>', 'spades <span class="bold">&#9824</span>'];
htmlApp.values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
htmlApp.gameStatus = 0;
htmlApp.wins = 0;
htmlApp.draws = 0;
htmlApp.losses = 0;
htmlApp.games = 0;
htmlApp.count=0;



//card class
class card1 {
  constructor(suit, value, name,c_value) {
      this.suit = suit; // string of suite
      this.value = value; // number 1 - 10
      this.name = name; // string of the full card name
      this.c_value=c_value; //card counting value
    }
  value() {
    return this.value
  }
}

class deck {
  deck1=[];
  constructor(num) {
      this.num = num; // number of decks
      this.deck1 = []; // the decks
    }
  build(){
    var deck = [];
    //creates a deck
    for (var i = 0; i < this.num; i++){
      for (var a = 0; a < htmlApp.suits.length; a++) {
          for (var b = 0; b < htmlApp.values.length; b++) {
              var cardValue = b + 1;
              var cardTitle = "";
              var c_value=0;
              if (cardValue >= 10){
                  cardValue = 10;
                  c_value=-1;
              }
              if (cardValue != 1) {
                  cardTitle += (htmlApp.values[b] + " of " + htmlApp.suits[a] + " (" + cardValue + ")");
                  if(cardValue<6 && cardValue>1){
                    c_value=1;
                  }
                  if(cardValue>=6&&cardValue<10){
                    c_value=0
                  }
              }
              else
              {
                  cardTitle += (htmlApp.values[b] + " of " + htmlApp.suits[a] + " (" + cardValue + " or 11)");
                  c_value=-1
              }
              var newCard = new card1(htmlApp.suits[a], cardValue, cardTitle,c_value);

              deck.push(newCard);
          }
      }
    }
    //shuffles the deck
    var shuffledDeck = [];
    var deckL = deck.length;
    for (var a = 0; a < deckL; a++)
    {
        var randomCard = this.getRandomInt(0, (deck.length));
        shuffledDeck.push(deck[randomCard]);
        deck.splice(randomCard, 1);
    }
    console.log("Deck shuffled!");

    this.deck1=shuffledDeck;
    console.log("Deck created!");
  }
  //used for the deck shuffeling
  getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
      // code based on sample from MDN
  }
  //facade keeps the traversal of the deck behide a function
  deal_card(){
    if(this.deck1.length==1){
      let card=this.deck1.pop()
      htmlApp.count=0
      this.build()
      return;
    }
    let card=this.deck1.pop()
    return card
  }
}
//how to store the player info
class player {
  constructor(money, cards) {
      this.money = money; // money
      this.cards = cards; // nan array of cards
    }
  money() {
    return this.money
  }
  cards() {
    return this.cards
  }
  //how to add a card to your hand
  Build_hand(card){
    this.cards.push(card);
  }
  clear(){
    this.cards=[]
  }
}

class dealer{
    constructor(cards){
        if(dealer.instance){
            throw new Error("Singleton classes can't be instantiated more than once");
        }
        this.cards=cards
        dealer.instance = this;
        }
        buildhand(card){
          this.cards.push(card);
        }
        clearhand(){
          this.cards=[];
        }
}


class game {
  //this checks to see if the player has stood yet. if not the second dealer card is kept hidden
  num=0
  flag=0
  constructor(numplayers,deck,turn_num,players,dealer) {
      this.numplayers = numplayers;
      this.deck = deck;
      this.turn_num=turn_num;
      this.players=players;
      this.dealer=dealer;
    }
    //this changes the html to update the game
  updateHtml(){
    var htmlswap = "";
    var ptotal = handTotal(this.players.cards);
    var dtotal = handTotal(this.dealer.cards);
    htmlswap += "<ul>";
    for (var i = 0; i < this.players.cards.length; i++)
    {
        htmlswap += "<li>" + this.players.cards[i].name + "</li>";
    }
    htmlswap += "</ul>"
    htmlApp.pcards.innerHTML = htmlswap;
    htmlApp.phandtext.innerHTML = "Your Hand (" + ptotal + ")";
    if (this.dealer.cards.length == 0)
    {
        return;
    }

    // clear the html string, re-do for the dealer, depending on if stay has been pressed or not
    htmlswap = "";
    if (this.num === 0)
    {
        htmlswap += "<ul><li>[Hidden Card]</li>";
        htmlApp.dhandtext.innerHTML = "Dealer's Hand (" + this.dealer.cards[1].value + " + hidden card)"; // hide value while a card is face down
    }
    else
    {
        htmlApp.dhandtext.innerHTML = "Dealer's Hand (" + dtotal + ")"; // update dealer hand total
    }

    for (var i = 0; i < this.dealer.cards.length; i++) {

        if (this.num === 0)
        {
            i += 1;
        }
        htmlswap += "<li>" + this.dealer.cards[i].name + "</li>";
    }
    htmlswap += "</ul>"
    htmlApp.dcards.innerHTML = htmlswap;
  }
  Start_game(){
    htmlApp.newgame.classList.add("hidden");

    // reset text and variables for newgame
    htmlApp.dcards.innerHTML = "";
    //build the new deck and save it
    let table_deck = new deck(6);
    table_deck.build();
    this.deck=table_deck

    //build the player and save it to game
    let player1=new player(100,[this.deck.deal_card(),this.deck.deal_card()]);
    this.players=player1
    console.log(player1.cards);
//build the dealer and save it to game
    if(this.flag===0){
      let dealer1=new dealer([this.deck.deal_card(),this.deck.deal_card()]);
      this.dealer=dealer1
      this.flag=1
    }
    else{
      this.dealer.clearhand();
      this.dealer.buildhand(this.deck.deal_card());
      this.dealer.buildhand(this.deck.deal_card());

    }
    this.updateHtml();

    if(this.Blackjack()){
      return;
    }
    //update the cards delt
    this.updateHtml();
    htmlApp.buttonBox.classList.remove("hidden"); // show hit/stay buttons
    htmlApp.textUpdates.innerHTML = "The initial hands are dealt!";

  }
  Blackjack(){
    if(handTotal(this.players.cards)===21&&handTotal(this.dealer.cards)===21){
      htmlApp.buttonBox.classList.add("hidden"); // take away the hit and stay buttons
      var handVal = handTotal(this.players.cards);
      htmlApp.textUpdates.innerHTML = "You got Blackjack! but so did the dealer :( its a push";

      htmlApp.games += 1;
      htmlApp.draws += 1;
      var explanation = "";
      htmlApp.gameStatus = 2; // flag that the game is over
      this.num=0
      track();
      return true
    }
    else if (handTotal(this.players.cards)===21){
      htmlApp.wins += 1;
      htmlApp.games += 1;
      this.num = 1; // to cause the dealer's hand to be drawn face up
      this.updateHtml();

      htmlApp.textUpdates.innerHTML = "You won! You got Blackjack!";
      track();
      this.num = 2; // game is won
      return true;
    }
    return false
  }
  stay(){
    if (this.num === 0) // i.e. stay was just pressed
    {

        htmlApp.buttonBox.classList.add("hidden"); // take away the hit and stay buttons
        var handVal = handTotal(this.players.cards);
        this.num = 1; // enter the 'stay' loop
        htmlApp.textUpdates.innerHTML = "The dealer reveals their hidden card";
        this.updateHtml();
        this.stay() // return to the stay loop
    }
    else if (this.num === 1) {

    // If dealer has less than 17, hit
    var handVal = handTotal(this.dealer.cards)
    if (handVal > 16 && handVal <= 21) // dealer stays and game resolves
    {
        this.updateHtml();
        //console.log("----------Dealer stays, checking hands");
        let playerVal=handTotal(this.players.cards)
        if (playerVal > handVal)
        {
            this.victory();
            return;
        }
        else if (playerVal < handVal)
        {
            this.bust();
            return;
        }
        else
        {
            this.tie();
            return;
        }
    }
    if (handVal > 21)
    {
        this.victory();
        return;
    }
    else // hit
    {
        htmlApp.textUpdates.innerHTML = "Dealer hits!";
        this.dealer.buildhand(this.deck.deal_card());
        this.updateHtml()
        this.stay();
        return;
    }
    }
  }
  bust(){
    for (let i = 0; i < this.players.cards.length; i++) {
      htmlApp.count=htmlApp.count+this.players.cards[i].c_value
    }
    for (let i = 0; i < this.dealer.cards.length; i++) {
      htmlApp.count=htmlApp.count+this.dealer.cards[i].c_value
    }
    htmlApp.games += 1;
    htmlApp.losses += 1;
    var explanation = "";
    htmlApp.gameStatus = 2; // flag that the game is over
    var playerTotal = handTotal(this.players.cards);
    var dealerTotal = handTotal(this.dealer.cards);
    if (playerTotal > 21)
    {
        explanation = "You busted with " + playerTotal + ".";
    }
    htmlApp.textUpdates.innerHTML = "You lost.<br>" + explanation + "<br>Press 'New Game' to play again.";
    this.updateHtml();
    this.num=0
    track();
  }
  tie() {
      for (let i = 0; i < this.players.cards.length; i++) {
        htmlApp.count=htmlApp.count+this.players.cards[i].c_value
      }
      for (let i = 0; i < this.dealer.cards.length; i++) {
        htmlApp.count=htmlApp.count+this.dealer.cards[i].c_value
      }
      htmlApp.games += 1;
      htmlApp.draws += 1;
      var explanation = "";
      htmlApp.gameStatus = 2; // flag that the game is over
      var playerTotal = handTotal(this.players.cards);
      htmlApp.textUpdates.innerHTML = "It's a push at " + playerTotal + " points each.<br>Press 'New Game' to play again.";
      this.updateHtml();
      this.num=0
      track();
  }
  victory() {
      for (let i = 0; i < this.players.cards.length; i++) {
        htmlApp.count=htmlApp.count+this.players.cards[i].c_value
      }
      for (let i = 0; i < this.dealer.cards.length; i++) {
        htmlApp.count=htmlApp.count+this.dealer.cards[i].c_value
      }
      htmlApp.wins += 1;
      htmlApp.games += 1;
      var explanation = "";
      htmlApp.gameStatus = 2; // flag that the game is over
      var playerTotal = handTotal(this.players.cards);
      var dealerTotal = handTotal(this.dealer.cards);
      if (dealerTotal > 21)
      {
          explanation = "Dealer busted with " + dealerTotal + "!";
      }
      else
      {
          explanation = "You had " + playerTotal + " and the dealer had " + dealerTotal + ".";
      }
      htmlApp.textUpdates.innerHTML = "You won!<br>" + explanation + "<br>Press 'New Game' to play again.";
      this.num=0
      track();
  }

  hit(){

    this.players.Build_hand(this.deck.deal_card());
    // drawHands();
    var handVal = handTotal(this.players.cards);
    if (handVal > 21)
    {
        this.bust();
        return;
    }
    htmlApp.textUpdates.innerHTML = "Hit or stay?</p>";
    this.updateHtml();
    return;
  }
  doubleDown(){
    if(this.players.cards.length>2){
      htmlApp.textUpdates.innerHTML = "You can't double down after taking a hit.";
      this.updateHtml();
      return;
    }
    this.players.Build_hand(this.deck.deal_card());
    // drawHands();
    var handVal = handTotal(this.players.cards);
    if (handVal > 21)
    {
        this.bust();
        return;
    }
    htmlApp.textUpdates.innerHTML = "Hit or stay?</p>";
    this.updateHtml();
    this.stay();
    return;
  }
  surrender(){
    htmlApp.textUpdates.innerHTML = "You Surrendered and got back 1/2 of your money";
    htmlApp.games += 1;
    htmlApp.draws += 1;
    htmlApp.gameStatus = 2; // flag that the game is over

    this.updateHtml();
    this.num=0
    track();
    return;
  }
  insurance(){
    if(this.dealer.cards[1].cardValue===11){
      htmlApp.textUpdates.innerHTML = "You got insurance and got back 1/2 of your money";
      htmlApp.games += 1;
      htmlApp.draws += 1;
      htmlApp.gameStatus = 2; // flag that the game is over

      this.updateHtml();
      this.num=0
      track();
      return;
    }

    htmlApp.textUpdates.innerHTML = "You cant get insurance unless a ace is showing";
    return;
  }


}



let G=new game();



var newGame = function () {
  G.Start_game();

};


// return the total value of the hand
var handTotal = function (hand) {
    //console.log("Checking hand value");
    var total = 0;
    var aces = 0;
    for (var i = 0; i < hand.length; i++) {
        //console.log("Card: " + hand[i].name);
        total += hand[i].value;
        if (hand[i].value == 1)
        {
            aces += 1;
        }
    }
    // For each ace in the hand, add 10 if doing so won't cause a bust

    for (var j = 0; j < aces; j++)
    {
        if (total + 10 <= 21)
        {
            total +=10;
        }
    }

    return total;
}

// Game loop begins when the play button is pressed
htmlApp.playButton.addEventListener("click", newGame);

// Hit button pressed:
htmlApp.hitButton.addEventListener("click", function () {
    // deal a card to the player
    G.hit();
});
// Stay button pressed:
htmlApp.stayButton.addEventListener("click", function () {
    G.stay();
});
//double down
htmlApp.doubleButton.addEventListener("click", function () {
  G.doubleDown();
});
//surrender
htmlApp.surrenderButton.addEventListener("click", function () {
    G.surrender();
});
//insurance
htmlApp.insuranceButton.addEventListener("click", function () {
    G.insurance();
});



// update the win/loss counter
var track = function () {
    htmlApp.tracker.innerHTML = "<p>Wins: " + htmlApp.wins + " Draws: " + htmlApp.draws + " Losses: " + htmlApp.losses + " Count: " + htmlApp.count + "</p>";
    htmlApp.newgame.classList.remove("hidden");
    htmlApp.buttonBox.classList.add("hidden");
}

// check the player hand for an ace
var softCheck = function (hand) {
    var total = 0;
    var aceFlag = 0;
    for (var i = 0; i < hand.length; i++) {


        total += hand[i].value;
        if (hand[i].value == 1) {
            aceFlag += 1;
        }
    }
    // For each ace in the hand, add 10 if doing so won't cause a bust
    // To show best-possible hand value
    for (var j = 0; j < aceFlag; j++) {
        if (total + 10 <= 21) {
            return true;
        }
    }
    return false;
}
