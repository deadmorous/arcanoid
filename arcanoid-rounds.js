(function(){

function Rounds (gameState){
    this.numberRound = 1
    arcanoid.GamePainter.created.handle(function(painter){
        gameState.contactBallBrick.handle(newRound.bind(painter))
    })
}   

function newRound(){
    var brick = this.state.bricks.length
    if(brick == 0){
        var round = this.state.rounds
        round.numberRound +=1
        if (round.numberRound == 11){
            round.numberRound = 1
        }
        arcanoid.makeRound(this.state,round.numberRound)
       // this.state.ball.pos = [0.55, 0.9]
       // this.state.ball.speed = [0.1, -0.1]
        this.paint()
        }
}


arcanoid.Rounds = Rounds
})()