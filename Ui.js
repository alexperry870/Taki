function Ui() {
    this.ending = ".png";
    this.cardBack = "card_back.png";
    this.dir = "Cards/";
    this.btn_st = null;
    this.clickDeck = new EventDispatcher(this); //event of click on deck
    this.clickCard = new EventDispatcher(this);

    // event of click on avlbl card
    this.removeStartBtn = function () {
        let btn_st_temp = document.getElementById("stbtn");
        this.btn_st = btn_st_temp.cloneNode();
        btn_st_temp.remove();
    },

        this.shuffleCards = function (player, opp) {
            this.initDeck();
            this.initPlayer(player);
            this.initOpp1(opp);
        },
        this.initDeck = function () {
            let deck = document.getElementById("deck");
            let deckCard = document.createElement("img");
            deckCard.setAttribute("src", this.dir + this.cardBack);
            deckCard.setAttribute("alt", this.cardBack);
            deckCard.setAttribute("class", "card");
            deckCard.setAttribute("id", "deckCard");
            deck.appendChild(deckCard);
        },
        this.initPlayer = function (player) {
            let cards = player;
            for (let card in cards) {
                cards[card].element = this.addCardPlayer(cards[card]);
            }
        },
        this.addCardPlayer = function (card) {
            let player = document.getElementById("player");
            let cardImg = document.createElement("img");
            cardImg.src = this.dir + card.img + this.ending;
            cardImg.alt = "card";
            cardImg.className = "card";
            player.appendChild(cardImg);
            return cardImg;

        },
        this.initOpp1 = function (pc) {
            let cards = pc;
            for (let card in cards) {
                cards[card].element = this.addCardOpp1(cards[card]);
            }
        },
        this.addCardOpp1 = function (card) {
            let opp1 = document.getElementById("opp1");
            let cardImg = document.createElement("img");
            cardImg.src = this.dir + this.cardBack;
            cardImg.alt = "card";
            cardImg.className = "card";
            opp1.appendChild(cardImg);
            return cardImg;
        },
        this.updateUsed = function (card) {
            let usedCard = document.getElementById("used");
            let cardImg = document.createElement("img");
            cardImg.src = this.dir + card.img + this.ending;
            cardImg.alt = "card";
            cardImg.className = "card";
            usedCard.appendChild(cardImg);
        },
        this.renderHand = function (hand) {
            hand.forEach(card => {
                if (card.usable == true) {
                    card.element.classList.add("usable");
                    card.element.onclick = this.onClickCard;
                }
                else {
                    card.element.classList.remove("usable");
                    card.element.onclick = null;
                }
            });
        },
        this.enableDeck = function (func) {
            let decTop = document.getElementById("deckCard");
            decTop.onclick = this.onClickDeck;
            decTop.classList.add("usable");
            this.clickDeck.attach(func);
        },
        this.disableHand = function (func) {
            let decTop = document.getElementById("deckCard");
            decTop.onclick = null;
            dec.classList.remove("usable");
            this.clickDeck.disattach(func);
        },

        this.onClickDeck = function () {
            this.clickDeck.notify();
        },

        this.onClickCard = function (elem) {
            this.clickCard.notify(elem);
        },

        this.move = function (element) {
            let dec = document.getElementById("used");
            if (dec.childElementCount > 0) {
                dec.removeChild(dec.children[0]);
            }
            let elem = element.toElement;
            dec.appendChild(elem);
        }

}