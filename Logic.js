Logic = function () {
    //cardA - from the players hand
    //cardB - Last card used AKA the first card with face up
    //check(A,B) - checks match of cards( cardA could play now?)
    this.check = function (cardA, cardB, plus2state) {
        if (plus2state == true) {
            if (cardA.symbol == "2plus") {
                return true;
            }
        }
        else {
            if (cardA.color == cardB.color) {
                return true;
            }
            else if (cardA.symbol == cardB.symbol) {
                return true;
            }
            else if (cardA.symbol == "change") {
                return true;
            }
            else if (cardB.symbol == "change" && cardB.color == "colorful") {
                return true;
            }
            else if (cardA.symbol == "taki" && cardA.color == "colorful") {
                return true;
            }
            else {
                return false;
            }
        }
    }
}