function Ui() {
    this.ending = ".png";
    this.cardBack = "card_back.png";
    this.dir = "Cards/";
    this.btn_st = null;
    this.clickDeck = new EventDispatcher(this); //event of click on deck
    this.clickCard = new EventDispatcher(this);
    this.clickQuit = new EventDispatcher(this);
    this.init = function () {
        this.removeStartBtn();
        this.addScoreBox();
        this.addQuitBtn();
    };
    this.addQuitBtn = function () {
        var quit = document.createElement("img")
        quit.src = "button_quit.png";
        quit.id = "btnQuit";
        quit.alt = "Quit";
        quit.title = "Quit";
        quit.onclick = this.onClickQuit.bind(this);
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(quit);
    };
    this.addScoreBox = function () {
        var box = document.createElement("div");
        var board = document.getElementById("board");
        box.id = "counter";
        board.appendChild(box);
    };
    // event of click on avlbl card
    this.removeStartBtn = function () {
        var btn_st_temp = document.getElementById("stbtn");
        this.btn_st = btn_st_temp.cloneNode();
        btn_st_temp.remove();
    };
    this.updateStateBox = function (newTurn, DeckCount) {
        var box = document.getElementById("counter");
        box.innerHTML = "Turn: " + newTurn + "<br>Deck: " + DeckCount;
    };
    this.shuffleCards = function (player, opp) {
        this.initDeck();
        this.initPlayer(player);
        this.initOpp1(opp);
    };
    this.initDeck = function () {
        var deck = document.getElementById("deck");
        var deckCard = document.createElement("img");
        deckCard.setAttribute("src", this.dir + this.cardBack);
        deckCard.setAttribute("alt", this.cardBack);
        deckCard.setAttribute("class", "card");
        deckCard.setAttribute("id", "deckCard");
        deck.appendChild(deckCard);
    };
    this.initPlayer = function (player) {
        var cards = player;
        for (var card in cards) {
            cards[card].element = this.addCardPlayer(cards[card]);
        }
    };
    this.addCardPlayer = function (card) {
        var player = document.getElementById("player");
        var cardImg = this.getCardElem(card);
        player.appendChild(cardImg);
        return cardImg;
    };
    this.getCardElem = function(card){
        var cardImg = document.createElement("img");
        cardImg.src = this.dir + card.img + this.ending;
        cardImg.alt = "card";
        cardImg.className = "card";
        return cardImg;
    };
    this.initOpp1 = function (pc) {
        var cards = pc;
        for (var card in cards) {
            cards[card].element = this.addCardOpp1(cards[card]);
        }
    };
    this.addCardOpp1 = function (card) {
        var opp1 = document.getElementById("opp1");
        var cardImg = document.createElement("img");
        cardImg.src = this.dir + this.cardBack;
        cardImg.alt = "card";
        cardImg.className = "card";
        opp1.appendChild(cardImg);
        return cardImg;
    };
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
    };
    this.enableDeck = function (func) {
        var decTop = document.getElementById("deckCard");
        decTop.onclick = this.onClickDeck.bind(this);
        decTop.classList.add("usable");
        this.clickDeck.attach(func);
    };
    this.disableDeck = function (fun) {
        var decTop = document.getElementById("deckCard");
        decTop.onclick = null;
        decTop.classList.remove("usable");
        this.clickDeck.disattach(fun);
    };
    this.onClickDeck = function (elem) {
        this.clickDeck.notify(elem.toElement);
    };

    this.onClickCard = function (elem) {
        this.clickCard.notify(elem.toElement);
    };
    this.updateUsed = function (card) {
        var cardImg = document.createElement("img");
        cardImg.src = this.dir + card.img + this.ending;
        cardImg.alt = "card";
        cardImg.className = "card";
        this.move(cardImg);
    };
    this.move = function (element) {
        var dec = document.getElementById("used");
        if (dec.childElementCount > 0) {
            dec.removeChildren();
        }
        dec.appendChild(element);
    };
    this.tosePcCard = function (card) {
        var cardElem = this.getCardElem(card);
        var oppHand =  document.getElementById("opp1");
        oppHand.removeChild(oppHand.children[oppHand.children.length - 1]);
        if(card.symbol == "change"){
            cardElem.style.borderStyle = "solid";
            cardElem.style.borderColor = card.color;
        }
        this.move(cardElem);
    };
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
    };
    this.restart = function () {
        var start = document.getElementById("start");
        var scoreBox = document.getElementById("score");
        scoreBox.remove();
        start.appendChild(this.btn_st);
    };
    this.clearGame = function () {
        var oppHand = document.getElementById("opp1");
        var used = document.getElementById("used");
        var deck = document.getElementById("deck");
        var player = document.getElementById("player");
        var score = document.getElementById("counter");
        var quit = document.getElementById("btnQuit");
        var colorBox = document.getElementById("colorMenu");
        if(colorBox != null){
            colorBox.removeChildren();
        }
        score.remove();
        quit.remove();
        oppHand.removeChildren();
        used.removeChildren();
        deck.removeChildren();
        player.removeChildren();
    };
    this.onClickQuit = function () {
        this.clickQuit.notify();
    };
    this.clickColor = null;
    this.colorMenu = function (listener) {//gets observer to the color
        this.clickColor = new EventDispatcher(this);
        this.clickColor.attach(listener);
        var colorBox = document.createElement("div");
        colorBox.id = "colorMenu";
        var yellowBox = document.createElement("div");
        yellowBox.id = "yellowColor";
        yellowBox.classList.add("colorBlock");
        yellowBox.onclick = this.onClickColor.bind(this);        
        var greenBox = document.createElement("div");
        greenBox.id = "greenColor";
        greenBox.classList.add("colorBlock");
        greenBox.onclick = this.onClickColor.bind(this);
        var blueBox = document.createElement("div");
        blueBox.id = "blueColor";
        blueBox.classList.add("colorBlock");
        blueBox.onclick = this.onClickColor.bind(this);
        var redBox = document.createElement("div");
        redBox.id = "redColor";
        redBox.classList.add("colorBlock");
        redBox.onclick = this.onClickColor.bind(this);
        colorBox.appendChild(yellowBox);
        colorBox.appendChild(greenBox);
        colorBox.appendChild(blueBox);
        colorBox.appendChild(redBox);
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(colorBox);
    };
    this.onClickColor = function(elem){
        if(this.clickColor != null){         
            var color = elem.toElement.id.replace("Color","");
            this.clickColor.notify(color);
            this.removeColorMenu();
        }
    };
    this.removeColorMenu = function(){
        var colorBox = document.getElementById("colorMenu");
        colorBox.remove();
    }

}

HTMLElement.prototype.removeChildren = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }

};