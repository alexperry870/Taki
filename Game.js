var dec 
var player, pc, used = [];

function start() {
    ui.removeStartBtn();
    dec.createDec();
    player = new Player(dec.getHand());
    pc = new Player(dec.getHand());
    ui.shuffleCards(player,pc);
    used.push(dec.getCard());
    ui.updateUsed(used);
    game();
}

function game(){
    let isTaki = false;
    while(!isTaki){
        let lastUsed = used[used.length - 1];
        isTaki = player.playTurn(lastUsed);
        isTakei = pc.playTurn(lastUsed);
        isTaki = true;
    }
}