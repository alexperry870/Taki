function Player(name, hand) {
    this.hand = hand;
    this.name = name;
    this.turnCount = 0;
    this.singleCardCounter = 0;
    this.avlbl = false;
    this.incTurn = function () {
        this.turnCount++;
    };
    this.checkCards = function (topCard, callBack, plusTwoState) {
        var check = false;
        this.hand.forEach(card => {
            card.usable = callBack(card, topCard, plusTwoState);
            if (card.usable == true) {
                check = true;
            }
        });
        this.avlbl = (check == true) ? true : false;
        this.singleCardCounter = (hand.length == 1) ? this.singleCardCounter + 1 : this.singleCardCounter;
    };
    this.isAvlbl = function () {
        return this.avlbl;
    };
    this.disableHand = function () {
        this.hand.forEach(card => {
            card.usable = false;
        })
        this.avlbl = false;
    };
    this.addCard = function (card) {
        this.hand.push(card);
    };
    this.toseCard = function (card) {
        var indexOfL = this.hand.indexOf(card);
        this.hand.splice(indexOfL, 1);
    };
    this.findByElem = function (elem) {
        let foundCard = null;
        for (let index = 0; index < this.hand.length; index++) {
            const element = this.hand[index];
            if (element.element == elem) {
                foundCard = element;
                break;
            }
        }
        return foundCard;
    };
    this.getCardsSameColor = function (color) {
        var res = [];
        for (var cardIndex in this.hand) {
            var card = this.hand[cardIndex];
            if (card.color == color) {
                res.push(card);
            }
        }

        return res;
    };
    this.randomColor = function () {
        var colors = ["red", "green", "blue", "yellow"];
        var len = colors.length;
        var rand = Math.floor(Math.random() * len);
        return colors[rand];
    }
    this.getCardToUse = function (lastCard, plus2state) {
        var res = null;

        if (lastCard.color == "colorful") {//case of first card is change color
            lastCard.color = this.randomColor();
        };
        for (var cardIndex in this.hand) {
            var card = this.hand[cardIndex];
            if (card.symbol == "2plus" && card.color == lastCard.color) {
                res = card;
                return res;
            }
        }
        if (plus2state == false) {
            for (var cardIndex in this.hand) {
                var card = this.hand[cardIndex];
                if (card.symbol == "change") {
                    res = card;
                    res.color = this.randomColor();
                    return res;
                }
            }
            for (var cardIndex in this.hand) {
                var card = this.hand[cardIndex];
                if (card.symbol == "stop" && card.color == lastCard.color) {
                    res = card;
                    return res;
                }
            }
            for (var cardIndex in this.hand) {
                var card = this.hand[cardIndex];
                if (card.symbol == "plus" && card.color == lastCard.color) {
                    res = card;
                    return res;
                }
            }
            for (var cardIndex in this.hand) {
                var card = this.hand[cardIndex];
                if (card.symbol == "taki" && card.color == "colorful") {
                    res = card;
                    return res;
                }
            }
            for (var cardIndex in this.hand) {
                var card = this.hand[cardIndex];
                if (card.symbol == "taki" && card.color == lastCard.color) {
                    res = card;
                    return res;
                }
            }
            for (var cardIndex in this.hand) {
                var card = this.hand[cardIndex];
                if (card.color == lastCard.color) {
                    res = card;
                    return res;
                }
            }
            for (var cardIndex in this.hand) {
                var card = this.hand[cardIndex];
                if (card.isNum && card.symbol == lastCard.symbol) {
                    res = card;
                    return res;
                }
            }
        }
        return res;
    }
}
