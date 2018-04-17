function Deck(EventListenerEmpty){
    this.cards = [],
    this.onEmptyDeck = new EventDispatcher(this);
    this.onEmptyDeck.attach(EventListenerEmpty);
    this.createDec = function() {
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
        for (let i = 0; i < 2; i++) {
            this.cards.push(new Card("change", "colorful"));
        }
    },
    this.getHand = function(){
        let hand = [];        
        for(let i = 0; i < 2; i++){
            hand.push(this.getCard());
        }
        return hand;
    },
    this.getCard = function(){
        let len = this.cards.length - 1;
        let rand = Math.floor(Math.random() * len);
        let card = this.cards[rand];
        this.cards.splice(rand, 1);
        if(this.cards.length <=0){
            this.onEmptyDeck.notify();
        }
        return card;
    },
    //when the deck is empty this func returns all cards
    //from used cards except the top card(last)
    this.reshuffle = function(cards){
        this.cards = cards;
    } 
}