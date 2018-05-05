function Deck(EventListenerEmpty){
    this.cards = [];
    this.onEmptyDeck = new EventDispatcher(this);
    this.onEmptyDeck.attach(EventListenerEmpty);
    this.createDec = function() {
        //create {1-9}/2
        var colors = ["red", "green", "blue", "yellow"];
        var color_cards =
            [1, 3, 4, 5, 6, 7, 8, 9, "taki", "stop",];
        for (var i = 0; i < 2; i++) {
            for (var symbol in color_cards) {
                for (var color in colors) {
                    this.cards.push(new Card(color_cards[symbol], colors[color]));
                }
            }
        }
        //add colorfoul cards
        for (var i = 0; i < 2; i++) {
            this.cards.push(new Card("change", "colorful"));
        }
    };
    this.getHand = function(){
        var hand = [];        
        for(var i = 0; i < 8; i++){
            hand.push(this.getCard());
        }
        return hand;
    };
    this.getCard = function(){
        var len = this.cards.length - 1;
        var rand = Math.floor(Math.random() * len);
        var card = this.cards[rand];
        this.cards.splice(rand, 1);
        if(this.cards.length <=0){
            this.onEmptyDeck.notify();
        }
        return card;
    };
    //when the deck is empty this func returns all cards
    //from used cards except the top card(last)
    this.reshuffle = function(cards){
        this.cards = cards;
    } 
}