function Player(name, hand) {
    this.hand = hand;
    this.name = name;
    this.turnCount = 0;
    this.singleCardCounter = 0;
    this.avlbl = false; 
    this.incTurn = function(){
        this.turnCount++;
    }
    this.checkCards = function(topCard, callBack) {
        var check = false;
        this.hand.forEach(card => {
            card.usable = callBack(card, topCard);
            if(card.usable == true){
                check = true;
            }
        })
        this.avlbl = (check == true)? true : false;
        this.singleCardCounter = (hand.length == 1)? this.singleCardCounter + 1 : this.singleCardCounter;
    },
    this.isAvlbl = function(){
        return this.avlbl;
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
            if(element.element == elem)
            {
                foundCard = element;
                break;
            }
        }
        return foundCard;
    }
}
