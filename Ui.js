function Ui(){
    var ending = ".png", cardBack = "card_back.png", dir = "Cards/";

    removeStartBtn = function() {
        let btn_st_temp = document.getElementById("stbtn");
        btn_st = btn_st_temp.cloneNode();
        btn_st_temp.remove();
    },
    shuffleCards = function(player,opp){
      this.initDeck();
      this.initPlayer(player);
      this.initOpp1(pc);  
    },
    initDeck = function(){
        let deck = document.getElementById("deck");
        let deckCard = document.createElement("img");
        deckCard.setAttribute("src", dir+cardBack);
        deckCard.setAttribute("alt", cardBack);
        deckCard.setAttribute("class", "card");
        deck.appendChild(deckCard);
    },
    initPlayer = function(player){
        let cards = player.hand;
        for(let card in cards){
            cards[card].element = this.addCardPlayer(cards[card]);
        }     
    },
    addCardPlayer = function(card){
        let player = document.getElementById("player");
        let cardImg = document.createElement("img");
        cardImg.src = dir + card.img + ending;
        cardImg.alt = "card";
        cardImg.className = "card";
        player.appendChild(cardImg);
        return cardImg;

    },
    initOpp1 = function(pc){
        let cards = pc.hand;
        for(let card in cards){
            cards[card].element = this.addCardOpp1(cards[card]);
        }     
    },
    addCardOpp1= function(card){
        let opp1 = document.getElementById("opp1");
        let cardImg = document.createElement("img");
        cardImg.src = dir+cardBack;
        cardImg.alt = "card";
        cardImg.className = "card";
        opp1.appendChild(cardImg);
        return cardImg;
    },
    updateUsed = function(used){
        let usedCard = document.getElementById("used");
        let cardImg = document.createElement("img");
        let last = used.length - 1;
        cardImg.src = used[last].img;
        cardImg.alt = "card";
        cardImg.className = "card";
        usedCard.appendChild(cardImg);
    }
}