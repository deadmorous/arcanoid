(function(){

    function Score(gameState){
        this.score = score
        gameState.contactBallBrick.handle(
       
        )}
        
        function drawScore(){
        
        this.score = $('<div>')
            .addClass('score')
            .text('Score')
            .appendTo(this.container)
    }

    arcanoid.GamePainter.addItemPainter(drawScore)

    arcanoid.Score = Score

    })

   