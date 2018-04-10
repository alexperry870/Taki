function Player(hand) {
    this.hand = hand;
    this.playTurn = function(topCard){
        this.hand.forEach(element => {
            element.checkAvb(topCard);
        });
    }
}