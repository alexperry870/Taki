function Ui() {
    this.ending = ".png";
    this.cardBack = "card_back.png";
    this.dir = "Cards/";
    this.btn_st = null;
    this.clickDeck = new EventDispatcher(this); //event of click on deck
    this.clickCard = new EventDispatcher(this);
    this.clickQuit = new EventDispatcher(this);
    this.init = function(){
        this.removeStartBtn();
        this.addScoreBox();
        this.addQuitBtn();
    },
    this.addQuitBtn = function(){
        var quit = document.createElement("img")
        quit.src = "button_quit.png";
        quit.id = "btnQuit";
        quit.alt = "Quit";
        quit.title = "Quit";
        quit.onclick = this.onClickQuit.bind(this);
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(quit);
    }
    this.addScoreBox = function () {
        var box = document.createElement("div");
        var board = document.getElementById("board");
        box.id = "counter";
        board.appendChild(box);
    },
        // event of click on avlbl card
        this.removeStartBtn = function () {
            var btn_st_temp = document.getElementById("stbtn");
            this.btn_st = btn_st_temp.cloneNode();
            btn_st_temp.remove();
        },
        this.updateTurn = function (newTurn) {
            var box = document.getElementById("counter");
            box.innerHTML = "Turn " + newTurn;
        },
        this.shuffleCards = function (player, opp) {
            this.initDeck();
            this.initPlayer(player);
            this.initOpp1(opp);
        },
        this.initDeck = function () {
            var deck = document.getElementById("deck");
            var deckCard = document.createElement("img");
            deckCard.setAttribute("src", this.dir + this.cardBack);
            deckCard.setAttribute("alt", this.cardBack);
            deckCard.setAttribute("class", "card");
            deckCard.setAttribute("id", "deckCard");
            deck.appendChild(deckCard);
        },
        this.initPlayer = function (player) {
            var cards = player;
            for (var card in cards) {
                cards[card].element = this.addCardPlayer(cards[card]);
            }
        },
        this.addCardPlayer = function (card) {
            var player = document.getElementById("player");
            var cardImg = document.createElement("img");
            cardImg.src = this.dir + card.img + this.ending;
            cardImg.alt = "card";
            cardImg.className = "card";
            player.appendChild(cardImg);
            return cardImg;

        },
        this.initOpp1 = function (pc) {
            var cards = pc;
            for (var card in cards) {
                cards[card].element = this.addCardOpp1(cards[card]);
            }
        },
        this.addCardOpp1 = function (card) {
            var opp1 = document.getElementById("opp1");
            var cardImg = document.createElement("img");
            cardImg.src = this.dir + this.cardBack;
            cardImg.alt = "card";
            cardImg.className = "card";
            opp1.appendChild(cardImg);
            return cardImg;
        },
        this.renderHand = function (hand) {
            hand.forEach(card => {
                if (card.usable == true) {
                    card.element.classList.add("usable");
                    card.element.onclick = this.onClickCard.bind(this);
                }
                else {
                    if (card.element.classList != null) {
                        card.element.classList.remove("usable");
                        card.element.onclick = null;
                    }
                }
            });
        },
        this.enableDeck = function (func) {
            var decTop = document.getElementById("deckCard");
            decTop.onclick = this.onClickDeck.bind(this);
            decTop.classList.add("usable");
            this.clickDeck.attach(func);
        },
        this.disableDeck = function (fun) {
            var decTop = document.getElementById("deckCard");
            decTop.onclick = null;
            decTop.classList.remove("usable");
            this.clickDeck.disattach(fun);
        },
        this.onClickDeck = function (elem) {
            this.clickDeck.notify(elem.toElement);
        },

        this.onClickCard = function (elem) {
            this.clickCard.notify(elem.toElement);
        },
        this.updateUsed = function (card) {
            var cardImg = document.createElement("img");
            cardImg.src = this.dir + card.img + this.ending;
            cardImg.alt = "card";
            cardImg.className = "card";
            this.move(cardImg);
        },
        this.move = function (element) {
            var dec = document.getElementById("used");
            if (dec.childElementCount > 0) {
                dec.removeChild(dec.children[0]);
            }
            var elem = element;
            dec.appendChild(elem);
        },

        this.tosePcCard = function (card) {
            var oppHand = document.getElementById("opp1");
            var firstCard = oppHand.children[0];
            oppHand.removeChild(firstCard);
            this.updateUsed.bind(card);
        },
        this.endGame = function (name, score, minutes, avg, oneCardCounter) {
            this.clearGame();
            var scoreBox = document.createElement("div");
            var body = document.getElementsByTagName("body")[0];
            scoreBox.innerHTML =
                name + " Won! <br>It took " +
                score + " turns" +
                "<br> minutes " + minutes +
                "<br> avg turn time: <br>" + avg + " Sec" +
                "<br> single card count: " + oneCardCounter;
            var retryImg = document.createElement("img");
            scoreBox.id = "score";
            retryImg.id = "btnRestart";
            retryImg.src = "button_restart.png";
            retryImg.alt = "retry";
            retryImg.title = "Retry";
            retryImg.onclick = this.restart.bind(this);
            scoreBox.appendChild(retryImg);
            body.appendChild(scoreBox);
        },
        this.restart = function () {
            var start = document.getElementById("start");
            var scoreBox = document.getElementById("score");
            scoreBox.remove();
            start.appendChild(this.btn_st);
        },
        this.clearGame = function () {
            var oppHand = document.getElementById("opp1");
            var used = document.getElementById("used");
            var deck = document.getElementById("deck");
            var player = document.getElementById("player");
            var score = document.getElementById("counter");
            var quit = document.getElementById("btnQuit");
            score.remove();
            quit.remove();
            oppHand.removeChildren();
            used.removeChildren();
            deck.removeChildren();
            player.removeChildren();
        },
        this.onClickQuit = function(){
            this.clickQuit.notify();
        }

}

HTMLElement.prototype.removeChildren = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }

};