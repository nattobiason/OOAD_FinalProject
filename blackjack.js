
var htmlApp = {};

// Store important elements in variables for later manipulation
htmlApp.pcards = document.getElementById('pcards');
htmlApp.dcards = document.getElementById('dcards');

htmlApp.hitButton = document.getElementById('hit');
htmlApp.stayButton = document.getElementById('stay');
htmlApp.doubleButton = document.getElementById('double-down');
htmlApp.splitButton = document.getElementById('split');
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
htmlApp.gameStatus = 0; // flag that game has not yet been won
htmlApp.wins = 0; // flag that game has not yet been won
htmlApp.draws = 0; // flag that game has not yet been won
htmlApp.losses = 0; // flag that game has not yet been won
htmlApp.games = 0; // flag that game has not yet been won

// Object Constructor for a card. !!! ALWAYS USE NEW WHEN MAKING A NEW CARD!!!
function card(suit, value, name,c_value) {
    this.suit = suit; // string of c/d/h/s
    this.value = value; // number 1 - 10
    this.name = name; // string of the full card name
    this.c_value=c_value; //card counting value
};


var newGame = function () {
    // remove newgame button and show hit/stay buttons
    htmlApp.newgame.classList.add("hidden");

    // reset text and variables for newgame
    htmlApp.dcards.innerHTML = "";
    htmlApp.dcards.innerHTML = "";
    htmlApp.playerHand = [];
    htmlApp.dealerHand = [];
    htmlApp.gameStatus = 0;

    // Create the new deck
    htmlApp.deck = createDeck();

    // Deal two cards to the player and two cards to the dealer
    htmlApp.playerHand.push(htmlApp.deck.pop());
    htmlApp.playerHand.push(htmlApp.deck.pop());

    // check for player victory
    if (handTotal(htmlApp.playerHand) === 21)
    {
        htmlApp.wins += 1;
        htmlApp.games += 1;
        htmlApp.gameStatus = 1; // to cause the dealer's hand to be drawn face up
        drawHands();
        htmlApp.textUpdates.innerHTML = "Blackjack!";
        track();
        htmlApp.gameStatus = 2; // game is won
        return;
    }

    htmlApp.dealerHand.push(htmlApp.deck.pop());
    htmlApp.dealerHand.push(htmlApp.deck.pop());

    // check for dealer victory
    if (handTotal(htmlApp.dealerHand) === 21)
    {
        htmlApp.games += 1;
        htmlApp.losses += 1;
        htmlApp.gameStatus = 1; // to cause the dealer's hand to be drawn face up
        drawHands();
        htmlApp.textUpdates.innerHTML = "You lost! The dealer had Blackjack.";
        track();
        htmlApp.gameStatus = 2; // game is won
        return;
    }

    // draw the hands if neither won on the initial deal
    drawHands();
    advise();
    htmlApp.buttonBox.classList.remove("hidden"); // show hit/stay buttons
    htmlApp.textUpdates.innerHTML = "The initial hands are dealt!";

};

var createDeck = function () {
    var deck = [];
    // loop through suits and values, building cards and adding them to the deck as you go
    for (var a = 0; a < htmlApp.suits.length; a++) {
        for (var b = 0; b < htmlApp.values.length; b++) {
            var cardValue = b + 1;
            var cardTitle = "";
            var c_value=0;
            if (cardValue > 10){
                cardValue = 10;
                c_value=-1;
            }
            if(cardValue<6 && cardValue>1){
              c_value=1;
            }
            if (cardValue != 1) {
                cardTitle += (htmlApp.values[b] + " of " + htmlApp.suits[a] + " (" + cardValue + ")");
                c_value=1
            }
            else
            {
                cardTitle += (htmlApp.values[b] + " of " + htmlApp.suits[a] + " (" + cardValue + " or 11)");
                c_value=0


            }
            var newCard = new card(htmlApp.suits[a], cardValue, cardTitle,c_value);

            deck.push(newCard);


        }
    }
    //console.log("Deck created! Deck size: " + deck.length)
    deck = shuffle(deck);
    return deck;
};

// Update the screen with the contents of the player and dealer hands
var drawHands = function () {
    var htmlswap = "";
    var ptotal = handTotal(htmlApp.playerHand);
    var dtotal = handTotal(htmlApp.dealerHand);
    htmlswap += "<ul>";
    for (var i = 0; i < htmlApp.playerHand.length; i++)
    {
        htmlswap += "<li>" + htmlApp.playerHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    htmlApp.pcards.innerHTML = htmlswap;
    htmlApp.phandtext.innerHTML = "Your Hand (" + ptotal + ")"; 
    if (htmlApp.dealerHand.length == 0)
    {
        return;
    }

    // clear the html string, re-do for the dealer, depending on if stay has been pressed or not
    htmlswap = "";
    if (htmlApp.gameStatus === 0)
    {
        htmlswap += "<ul><li>[Hidden Card]</li>";
        htmlApp.dhandtext.innerHTML = "Dealer's Hand (" + htmlApp.dealerHand[1].value + " + hidden card)"; // hide value while a card is face down
    }
    else
    {
        htmlApp.dhandtext.innerHTML = "Dealer's Hand (" + dtotal + ")"; // update dealer hand total
    }

    for (var i = 0; i < htmlApp.dealerHand.length; i++) {

        if (htmlApp.gameStatus === 0)
        {
            i += 1;
        }
        htmlswap += "<li>" + htmlApp.dealerHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    htmlApp.dcards.innerHTML = htmlswap;

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

// Shuffle the new deck
var shuffle = function (deck) {

    var shuffledDeck = [];
    var deckL = deck.length;
    for (var a = 0; a < deckL; a++)
    {
        var randomCard = getRandomInt(0, (deck.length));
        shuffledDeck.push(deck[randomCard]);
        deck.splice(randomCard, 1);
    }
    return shuffledDeck;
}

var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    // code based on sample from MDN
}

// // print the deck to the console
// // only for for debugging purposes
// var deckPrinter = function (deck) {
//     for (var i = 0; i < deck.length; i++)
//     {
//         console.log(deck[i].name);
//     }
//     return
// }

// Game loop begins when the play button is pressed
htmlApp.playButton.addEventListener("click", newGame);

// Hit button pressed:
htmlApp.hitButton.addEventListener("click", function () {

    // deal a card to the player and draw the hands
    htmlApp.playerHand.push(htmlApp.deck.pop());
    drawHands();


    var handVal = handTotal(htmlApp.playerHand);
    if (handVal > 21)
    {
        bust();
        advise();
        return;
    }
    advise();
    htmlApp.textUpdates.innerHTML = "Hit or stay?</p>";
    return;
});

// Stay button pressed:
htmlApp.stayButton.addEventListener("click", function stayLoop() {
    //console.log("(1)Inside stayLoop now");
    stay();

});

htmlApp.doubleButton.addEventListener("click", function () {

    // deal a card to the player and draw the hands
    htmlApp.playerHand.push(htmlApp.deck.pop());
    drawHands();


    var handVal = handTotal(htmlApp.playerHand);
    if (handVal > 21)
    {
        bust();
        advise();
        return;
    }
    stay();
    return;
});

htmlApp.surrenderButton.addEventListener("click", function () {
    // disable if the game has already been won
    if (htmlApp.gameStatus === 2)
    {
        console.log("Hit Surrender when game was over or already clicked.");
        return;
    }

    // deal a card to the player and draw the hands
    htmlApp.textUpdates.innerHTML = "You Surrendered and got back 1/2 of your money";

    return;
});

var stay = function stayLoop() {
  if (htmlApp.gameStatus === 2)
  {
      console.log("Stay clicked when game was over or already clicked.");
      return;
  }
  else if (htmlApp.gameStatus === 0) // i.e. stay was just pressed
  {

      htmlApp.buttonBox.classList.add("hidden"); // take away the hit and stay buttons
      var handVal = handTotal(htmlApp.dealerHand);
      htmlApp.gameStatus = 1; // enter the 'stay' loop
      advise(); // clear advise
      htmlApp.textUpdates.innerHTML = "The dealer reveals their hidden card";
      drawHands();
      setTimeout(stayLoop, 750); // return to the stay loop
  }
  else if (htmlApp.gameStatus === 1) {

  // If dealer has less than 17, hit
  var handVal = handTotal(htmlApp.dealerHand);
  if (handVal > 16 && handVal <= 21) // dealer stays and game resolves
  {
      drawHands();
      //console.log("----------Dealer stays, checking hands");
      var playerVal = handTotal(htmlApp.playerHand);
      if (playerVal > handVal)
      {
          victory();
          return;
      }
      else if (playerVal < handVal)
      {
          bust();
          return;
      }
      else
      {
          tie();
          return;
      }
  }
  if (handVal > 21)
  {
      victory();
      return;
  }
  else // hit
  {
      htmlApp.textUpdates.innerHTML = "Dealer hits!";
      htmlApp.dealerHand.push(htmlApp.deck.pop());
      drawHands();
      setTimeout(stayLoop, 750);
      return;
  }
  }
}

var victory = function () {
    htmlApp.wins += 1;
    htmlApp.games += 1;
    var explanation = "";
    htmlApp.gameStatus = 2; // flag that the game is over
    var playerTotal = handTotal(htmlApp.playerHand);
    var dealerTotal = handTotal(htmlApp.dealerHand);
    if (dealerTotal > 21)
    {
        explanation = "Dealer busted with " + dealerTotal + "!";
    }
    else
    {
        explanation = "You had " + playerTotal + " and the dealer had " + dealerTotal + ".";
    }
    htmlApp.textUpdates.innerHTML = "You won!<br>" + explanation + "<br>Press 'New Game' to play again.";
    track();
}

var bust = function () {
    htmlApp.games += 1;
    htmlApp.losses += 1;
    var explanation = "";
    htmlApp.gameStatus = 2; // flag that the game is over
    var playerTotal = handTotal(htmlApp.playerHand);
    var dealerTotal = handTotal(htmlApp.dealerHand);
    if (playerTotal > 21)
    {
        explanation = "You busted with " + playerTotal + ".";
    }
    htmlApp.textUpdates.innerHTML = "You lost.<br>" + explanation + "<br>Press 'New Game' to play again.";
    track();
}

var tie = function () {
    htmlApp.games += 1;
    htmlApp.draws += 1;
    var explanation = "";
    htmlApp.gameStatus = 2; // flag that the game is over
    var playerTotal = handTotal(htmlApp.playerHand);
    htmlApp.textUpdates.innerHTML = "It's a push at " + playerTotal + " points each.<br>Press 'New Game' to play again.";
    track();
}

// update the win/loss counter
var track = function () {
    htmlApp.tracker.innerHTML = "<p>Wins: " + htmlApp.wins + " Draws: " + htmlApp.draws + " Losses: " + htmlApp.losses + "</p>";
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

var advise = function () {
    // no advise if player has no choices
    if (htmlApp.gameStatus > 0)
    {
        htmlApp.choice.innerHTML = "";
        return;
    }
    var playerTotal = handTotal(htmlApp.playerHand);
    var soft = softCheck(htmlApp.playerHand);
    console.log("Soft: " + soft);
    var dealerUp = htmlApp.dealerHand[1].value;
    // count dealer's ace as 11 to simplify logic
    if (dealerUp === 1)
    {
        dealerUp = 11;
    }

    // provide advice based on HIGHLY simplified blackjack basic strategy
    if (playerTotal <= 11 && !soft)
    {
        htmlApp.choice.innerHTML = "[Hit!]";
    }
    else if (playerTotal >= 12 && playerTotal <= 16 && dealerUp <= 6 && !soft)
    {
        htmlApp.choice.innerHTML = "[Stay]";
    }
    else if (playerTotal >= 12 && playerTotal <= 16 && dealerUp >= 7 && !soft)
    {
        htmlApp.choice.innerHTML = "[Hit!]";
    }
    else if (playerTotal >= 17 && playerTotal <= 21 && !soft)
    {
        htmlApp.choice.innerHTML = "[Stay]";
    }
    else if (playerTotal >= 12 && playerTotal <= 18 && soft)
    {
        htmlApp.choice.innerHTML = "[Hit!]";
    }
    else if (playerTotal >= 19 && playerTotal <= 21 && soft)
    {
        htmlApp.choice.innerHTML = "[Stay]";
    }
    else
    {
        htmlApp.choice.innerHTML = "unexpected scenario";
        console.log("Error: Player's hand was " + playerTotal + " and dealer's faceup was " + dealerUp + ".");
    }
    return;
}
