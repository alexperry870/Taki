
function start() {
    var ui = new Ui();
    var game = new Game(ui);  
    game.start();
}

Game = function (ui) {
    this.ui = ui;

    this.start = function () {
        this.init();
        this.ui.removeStartBtn();
        this.ui.shuffleCards(this.player.hand, this.pc.hand);
        this.openCardFromDec();
        this.playerTurn();
    },

        this.init = function () {
            this.logic = new Logic();
            this.deck = new Deck(this.reshuffleDeck);
            this.deck.createDec();
            this.player = new Player(this.deck.getHand());
            this.pc = new Player(this.deck.getHand());
            this.used = [];
            this.roundNum = 0;
        },

        this.reshuffleDeck = function () {
            let usedWithoutLast = this.used.slice(0, used.length - 1);
            let lastCard = used[used.length - 1];
            used = [];
            used.push(lastCard);
            this.deck.reshuffle(usedWithoutLast);
        },

        this.playerTurn = function () {
            if (this.player.hand.length > 0) {
                this.ui.enableDeck(this.clickOnDeck);
                let lastCard = this.used[this.used.length - 1];
                this.player.checkCards(lastCard, this.logic.check);
                this.ui.renderHand(this.player.hand);
                this.ui.clickCard.attach(this.clickOnCard);            }
            else {
                this.taki();
            }
        },

        this.clickOnCard = function (element) {
            let card = this.player.findByElem(element);
            this.deck.push(card);
            this.player.toseCard(card);
            this.endPlayerTurn();
        }

    this.clickOnDeck = function () {
        let card = deck.getCard();
        this.player.addCard(card);
        this.ui.addCardPlayer(card);
        this.endPlayerTurn();
    }

    this.endPlayerTurn = function () {
        this.player.clickCard.disattach(this.clickOnCard);
        this.ui.renderHand(this.player.hand);
        this.ui.disableHand(this.clickOnDeck);
        this.playOpp();
    },

        this.playOpp = function () {
            if (this.pc.hand.length == 0) {
                this.taki(pc);
            }
            else {
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
                    this.ui.updateUsed(chosenCard);
                }
            };
        },

        this.openCardFromDec = function () {// puts a card on to 
            this.used.push(this.deck.getCard());
            let lastCard = this.used[this.used.length - 1];
            this.ui.updateUsed(lastCard);
        }
}