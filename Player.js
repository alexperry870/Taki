function Player(hand) {
    this.hand = hand;
    this.checkCards = function(topCard, callBack) {
        this.hand.forEach(card => {
            card.usable = callBack(card, topCard);
        })
    },
    this.disableHand = function(){
        this.hand.forEach(card => {
            card.usable = false;
        })
    },
    this.addCard = function(card){
        this.hand.push(card);
    },
    this.toseCard = function(card){
        var indexOfL= this.hand.indexOf(card);
        this.hand.splice(indexOfL,1);
    },
    this.findByElem = function(elem){
        let foundCard = null;
        for (let index = 0; index < this.hand.length; index++) {
            const element = this.hand[index];
            if(element.element == elem.element)
            {
                foundCard = element;
                break;
            }
        }
        return foundCard;
    }
}
