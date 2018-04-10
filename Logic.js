Logic = function () {
    //cardA - from the players hand
    //cardB - Last card used AKA the first card with face up
    //check(A,B) - checks match of cards( cardA could play now?)
    this.check = function (cardA, cardB) {
        if (cardA.color == cardB.color
            || cardA.symbol == cardB.symbol) {
            return true;
        }
        else {
            return false;
        }
    }
}