function Ui(){
    this.ending = ".png";
    this.cardBack = "card_back.png";
    this.dir = "Cards/";
    this.btn_st = null;

    this.removeStartBtn = function() {
        let btn_st_temp = document.getElementById("stbtn");
        this.btn_st = btn_st_temp.cloneNode();
        btn_st_temp.remove();
    },

    this.shuffleCards = function(player,opp){
      this.initDeck();
      this.initPlayer(player);
      this.initOpp1(pc);  
    },
    this.initDeck = function(){
        let deck = document.getElementById("deck");
        let deckCard = document.createElement("img");
        deckCard.setAttribute("src", dir+cardBack);
        deckCard.setAttribute("alt", cardBack);
        deckCard.setAttribute("class", "card");
        deck.appendChild(deckCard);
    },
    this.initPlayer = function(player){
        let cards = player.hand;
        for(let card in cards){
            cards[card].element = this.addCardPlayer(cards[card]);
        }     
    },
    this.addCardPlayer = function(card){
        let player = document.getElementById("player");
        let cardImg = document.createElement("img");
        cardImg.src = dir + card.img + ending;
        cardImg.alt = "card";
        cardImg.className = "card";
        player.appendChild(cardImg);
        return cardImg;

    },
    this.initOpp1 = function(pc){
        let cards = pc.hand;
        for(let card in cards){
            cards[card].element = this.addCardOpp1(cards[card]);
        }     
    },
    this.addCardOpp1= function(card){
        let opp1 = document.getElementById("opp1");
        let cardImg = document.createElement("img");
        cardImg.src = dir+cardBack;
        cardImg.alt = "card";
        cardImg.className = "card";
        opp1.appendChild(cardImg);
        return cardImg;
    },
    this.updateUsed = function(used){
        let usedCard = document.getElementById("used");
        let cardImg = document.createElement("img");
        let last = used.length - 1;
        cardImg.src = used[last].img;
        cardImg.alt = "card";
        cardImg.className = "card";
        usedCard.appendChild(cardImg);
    },
    this.move = function(element){
        let dec = document.getElementById("used");
        if (dec.childElementCount > 0) {
            dec.removeChild(dec.children[0]);
        }
        let elem = element.toElement;
        dec.appendChild(elem);
        dec.removeAttribute("onclick");
        elem.removeEventListener("onclick", move, true);
    }
    
}