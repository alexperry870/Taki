function Card(symbol, color) {
    this.symbol = symbol;
    this.color = color;
    this.isNum = Number.isInteger(symbol);
    this.img = symbol + "_" + color;
    this.usable = false;
    this.element = null;
    this.checkAvb = function(card){
        if(card.color == this.color 
            || card.symbol == this.symbol){
                this.usable = true;
                this.element.classList.add("usable");
                this.element.onclick =  move;
            }
    }
}