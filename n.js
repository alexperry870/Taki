function move(element) {
    let dec = document.getElementById("used");
    if (dec.childElementCount > 0) {
        dec.removeChild(dec.children[0]);
    }
    let elem = element.toElement;
    dec.appendChild(elem);
    dec.removeAttribute("onclick");
    elem.removeEventListener("onclick", move, true);
}

var btn_st;
var dec = {
    cards: [],
    createDec : function() {
        //create {1-9}/2
        let colors = ["red", "green", "blue", "yellow"];
        let color_cards =
            [1, 3, 4, 5, 6, 7, 8, 9, "taki", "stop",];
        for (let i = 0; i < 2; i++) {
            for (let symbol in color_cards) {
                for (let color in colors) {
                    this.cards.push(new Card(color_cards[symbol], colors[color]));
                }
            }
        }
        //add colorfoul cards
        for (let i = 0; i < 4; i++) {
            this.cards.push(new Card("change", "colorful"));
        }
    },
    getHand : function(){
        let hand = [];        
        for(let i = 0; i < 8; i++){
            hand.push(this.getCard());
        }
        return hand;
    },
    getCard : function(){
        let len = this.cards.length - 1;
        let rand = Math.floor(Math.random() * len);
        let card = this.cards[rand];
        this.cards.splice(rand, 1);
        return card;
    }
}
var player, pc, used = [];

function start() {
    ui.removeStartBtn();
    dec.createDec();
    player = new Player(dec.getHand());
    pc = new Player(dec.getHand());
    ui.shuffleCards(player,pc);
    used.push(dec.getCard());
    ui.updateUsed(used);
    game();
}

function game(){
    let isTaki = false;
    while(!isTaki){
        let lastUsed = used[used.length - 1];
        isTaki = player.playTurn(lastUsed);
        isTakei = pc.playTurn(lastUsed);
        isTaki = true;
    }
}

function Player(hand) {
    this.hand = hand;
    this.playTurn = function(topCard){
        this.hand.forEach(element => {
            element.checkAvb(topCard);
        });
    }
}


