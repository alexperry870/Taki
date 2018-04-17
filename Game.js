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
    },

        this.init = function () {
            this.logic = new Logic();
            this.deck = new Deck(this.reshuffleDeck.bind(this));
            this.deck.createDec();
            this.player = new Player("Player", this.deck.getHand());
            this.pc = new Player("PC", this.deck.getHand());
            this.used = [];
            this.roundNum = 0;
            this.ui.clickQuit.attach(this.quit.bind(this));
        },

        this.reshuffleDeck = function () {
            let usedWithoutLast = this.used.slice(0, this.used.length - 1);
            let lastCard = this.used[this.used.length - 1];
            this.used = [];
            this.used.push(lastCard);
            this.deck.reshuffle(usedWithoutLast);
        },

        this.playerTurn = function () {
            this.startTurnTime = new Date();
            if (this.player.hand.length > 0) {//hand is not empty
                this.player.incTurn();
                this.ui.updateTurn(this.player.turnCount);
                let lastCard = this.used[this.used.length - 1];
                this.player.checkCards(lastCard, this.logic.check);
                if (this.player.isAvlbl()) {//there is a playble card
                    this.ui.renderHand(this.player.hand);
                    this.ui.clickCard.attach(this.clickOnCard.bind(this));
                }
                else {
                    this.ui.enableDeck(this.clickOnDeck.bind(this));
                }
            }
            else {
                this.taki(this.player);
            }
        },

        this.clickOnCard = function (element) {
            let card = this.player.findByElem(element);
            this.used.push(card);
            this.ui.move(card.element);
            this.player.toseCard(card);
            this.endPlayerTurn();
        }

    this.clickOnDeck = function () {
        let card = this.deck.getCard();
        card.element = this.ui.addCardPlayer(card);
        this.player.addCard(card);
        this.endPlayerTurn();
    }

    this.endPlayerTurn = function () {
        this.endTurnTimeCounter += Date.subtractSeconds(this.startTurnTime); 
        this.ui.clickCard.disattach(this.clickOnCard);
        this.player.disableHand();
        this.ui.renderHand(this.player.hand);
        this.ui.disableDeck(this.clickOnDeck);
        this.playOpp.bind(this)();
    },

        this.playOpp = function () {
            if (this.pc.hand.length == 0) {
                this.taki(this.pc);
            }
            else {
                this.pc.incTurn();
                let lastCard = this.used[this.used.length - 1];
                this.pc.checkCards(lastCard, this.logic.check);
                let chosenCard = null;
                for (let index = 0; index < this.pc.hand.length; index++) {
                    const element = this.pc.hand[index];
                    if (element.usable == true) {
                        chosenCard = element;
                    }
                }
                if (chosenCard == null) {
                    this.pc.addCard(this.deck.getCard());
                    this.ui.addCardOpp1(chosenCard);
                }
                else {
                    this.used.push(chosenCard);
                    this.pc.toseCard(chosenCard);
                    this.ui.tosePcCard(chosenCard);
                }
                this.playerTurn();
            };
        },

        this.openCardFromDec = function () {// puts a card on to 
            this.used.push(this.deck.getCard());
            let lastCard = this.used[this.used.length - 1];
            this.ui.updateUsed(lastCard);
        },
        this.taki = function (player) {
            this.endTime = Date.subtractMinutes(this.startTime);
            var avgTurnTime = Number((this.endTurnTimeCounter / this.player.turnCount).toFixed(1));
            this.ui.endGame(player.name,
                 this.player.turnCount,
                  this.endTime,
                  avgTurnTime,
                    this.player.singleCardCounter);
        },
        this.quit = function(){
            this.taki(this.pc);
        }
}

