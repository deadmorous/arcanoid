(function(){

    function Score(gameState){
        this.currentscore = 0
        arcanoid.GamePainter.created.handle(function(painter) {
            gameState.contactBallBrick.handle(
                updateScore.bind(painter))}
        )}

        function updateScore(){
            var newscore = this.state.score
            newscore.currentscore += 1
            this.htmlscore.text("Score: "+ newscore.currentscore)
        }
        
        function drawScore(){
        
        this.htmlscore = $('<div>')
            .addClass('score')
            .text("Score: ")
            .appendTo(this.container)
    }

    arcanoid.GamePainter.addItemPainter(drawScore)

    arcanoid.Score = Score

    })()

   