function Card(symbol, color) {
    this.symbol = symbol;
    this.color = color;
    this.isNum = Number.isInteger(symbol);
    this.img = symbol + "_" + color;
    this.usable = false;
    this.element = null;
}
