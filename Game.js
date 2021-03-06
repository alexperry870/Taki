var ui;
var game;


function start() {
    ui = new Ui();
    game = new Game(ui);
    game.start();
}

function Game(ui) {
    this.startTime = new Date();
    this.ui = ui;
    this.startTurnTime;
    this.endTurnTimeCounter = 0;
    this.start = function () {
        this.init();
        this.ui.init();
        this.ui.shuffleCards(this.player.hand, this.pc.hand);
        this.openCardFromDec();
        this.playerTurn();
    };

    this.init = function () {
        this.logic = new Logic();
        this.deck = new Deck(this.reshuffleDeck.bind(this));
        this.deck.createDec();
        this.player = new Player("Player", this.deck.getHand());
        this.pc = new Player("PC", this.deck.getHand());
        this.used = [];
        this.roundNum = 0;
        this.ui.clickQuit.attach(this.quit.bind(this));
    };

    this.reshuffleDeck = function () {
        var usedWithoutLast = this.used.slice(0, this.used.length - 1);
        var lastCard = this.used[this.used.length - 1];
        this.used = [];
        this.used.push(lastCard);
        this.deck.reshuffle(usedWithoutLast);
    };

    this.playerTurn = function () {
        this.startTurnTime = new Date();
        this.player.incTurn();
        this.ui.updateStateBox(this.player.turnCount, this.deck.cards.length);
        var lastCard = this.used[this.used.length - 1];
        this.player.checkCards(lastCard, this.logic.check, this.plusTwoState);
        if (this.player.isAvlbl()) {//there is a playble card
            this.ui.renderHand(this.player.hand);
            this.ui.clickCard.attach(this.clickOnCard.bind(this));
        }
        else {
            this.ui.enableDeck(this.clickOnDeck.bind(this));
        }
    };
    this.plusTwoState = false;
    this.plusTwoCounter = 0;
    this.plus2Inc = function () {
        this.plusTwoState = true;
        this.plusTwoCounter += 2;
    };
    this.plus2Disable = function () {
        this.plusTwoState = false;
        this.plusTwoCounter = 0;
    };
    this.plus2Dec = function () {
        if (this.plusTwoCounter > 0) {
            this.plusTwoCounter -= 1;
        }

        if (this.plusTwoCounter == 0) {
            this.plusTwoState = false;
        }
    };
    this.clickOnCard = function (element) {
        var lastCard = this.used[this.used.length - 1];
        var card = this.player.findByElem(element);
        this.toseCard(card);
        if (this.player.hand.length == 0) {
            this.taki(this.player);
        }
        else {
            if (card.symbol == "2plus") {
                this.plus2Inc();
            }
            if (card.symbol == "plus" || card.symbol == "stop") {//ex3 will get different
                this.lockPlayer();
                this.playerTurn();
            }
            else if (card.symbol == "change") {
                this.ui.colorMenu(this.clickOnColor.bind(this));
                this.lockPlayer();
            }
            else {
                if (card.symbol == "taki") {
                    color = card.color;
                    if (card.color == "colorful") {
                        color = lastCard.color;
                    }

                    var cardsToTose = this.player.getCardsSameColor(color);
                    for (var cardIndex in cardsToTose) {
                        var cardToTose = cardsToTose[cardIndex];
                        this.toseCard(cardToTose);
                    }
                }

                this.endPlayerTurn();
            }
        }
    };
    this.toseCard = function (card) {
        this.used.push(card);
        this.ui.movePlayerCard(card.element);
        this.player.toseCard(card);
    };
    this.clickOnColor = function (color) {
        this.used[this.used.length - 1].color = color;
        this.endPlayerTurn();
    };
    this.clickOnDeck = function () {
        var card = this.deck.getCard();
        card.element = this.ui.addCardPlayer(card);
        this.player.addCard(card);
        if (this.plusTwoState == true) {
            this.plus2Dec();
            if(this.plusTwoState == false){
                this.endPlayerTurn();
            }
        }
        else {
            this.endPlayerTurn();
        }
    };

    this.lockPlayer = function () {
        this.endTurnTimeCounter += Date.subtractSeconds(this.startTurnTime);
        this.ui.clickCard.disattach(this.clickOnCard);
        this.player.disableHand();
        this.ui.renderHand(this.player.hand);
        this.ui.disableDeck(this.clickOnDeck);
    };
    this.endPlayerTurn = function () {
        this.lockPlayer();
        this.playOpp();
    };
    this.tosePcCard = function (chosenCard) {
        this.used.push(chosenCard);
        this.pc.toseCard(chosenCard);
        this.ui.tosePcCard(chosenCard);
    };
    this.playOpp = function () {
        this.pc.incTurn();
        var lastCard = this.used[this.used.length - 1];
        var chosenCard = this.pc.getCardToUse(lastCard, this.plusTwoState);

        if (chosenCard == null) {
            var cardsToTake = 1;
            while (this.plusTwoState == true || cardsToTake > 0) {
                this.plus2Dec();
                chosenCard = this.deck.getCard();
                this.pc.addCard(chosenCard);
                this.ui.addCardOpp1(chosenCard);
                cardsToTake -=1;
            }
            this.plus2Disable();
            this.playerTurn();
        }
        else {
            this.tosePcCard(chosenCard);
            if (this.pc.hand.length == 0) {
                this.taki(this.pc);
            }
            else {
                if (chosenCard.symbol == "stop" || chosenCard.symbol == "plus") {
                    this.playOpp();
                }
                else {
                    if (chosenCard.symbol == "taki") {
                        var color = chosenCard.color;
                        if(color == "colorful"){
                            color = used[used.length - 2].color;
                        }
                        var cardsToTose = this.pc.getCardsSameColor(color);
                        for (var cardIndex in cardsToTose) {
                            var card = cardsToTose[cardIndex];
                            this.tosePcCard(card);
                        }
                    }
                    else if (chosenCard.symbol == "2plus") {
                        this.plus2Inc();
                    }
                    this.playerTurn();
                }
            }
        }
    };

    this.openCardFromDec = function () {// puts a card on to 
        this.used.push(this.deck.getCard());
        var lastCard = this.used[this.used.length - 1];
        this.ui.updateUsed(lastCard);
    };
    this.taki = function (player) {
        this.endTime = Date.subtractMinutes(this.startTime);
        var avgTurnTime = Number((this.endTurnTimeCounter / this.player.turnCount).toFixed(1));
        this.ui.endGame(player.name,
            this.player.turnCount,
            this.endTime,
            avgTurnTime,
            this.player.singleCardCounter);
    };
    this.quit = function () {
        this.taki(this.pc);
    }

}
