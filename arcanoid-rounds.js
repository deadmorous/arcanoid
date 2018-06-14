(function(){

function Rounds (gameState){
    this.numberRound = 1
    arcanoid.GamePainter.created.handle(function(painter){
        gameState.contactBallBrick.handle(function(){
            newRound.bind(painter)
            }
        )}
    )
}   

function newRound(){
    var brick = this.state.bricks.length
    if(brick == 0){
        var round = this.state.rounds
        round.numberRound +=1
        arcanoid.makeRound(this,round.numberRound)
        }
}


arcanoid.Rounds = Rounds
})()