(function(){

    function Score(gameState){
        this.pos = [0.9, 0.9]
        this.score = 0
        
        gameState.contactBallBrick.handle(
            function(score){
                score += score
            }
        )}
        function drawScore(){
        
        this.ball = $('<div>')
            .addClass('ball')
            .text("Score:"+ score)
            .appendTo(this.container)
    }

    arcanoid.GamePainter.addItemPainter(drawScore)

    arcanoid.Score = Score

    })

   