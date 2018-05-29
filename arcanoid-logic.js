(function(){

    function Score(gameState){
        this.currentscore = 0
        this.currentround = 0
        
        arcanoid.GamePainter.created.handle(
            gameState.arcanoid.makeRound.handle(
                roundnumber.bind(painter)
            )
        )

        arcanoid.GamePainter.created.handle(function(painter) {
            gameState.contactBallBrick.handle(
                updateScore.bind(painter))}
        )}

        function roundnumber(){
            var newround = this.state.round
            newround.round += 1
            this.htmlround.text("Level " + newround.currentround )
            
        }

        function updateScore(){
            var newscore = this.state.score
            newscore.currentscore += 1
            this.htmlscore.text("Score: "+ newscore.currentscore)
        }
        function drawRound(){
            this.htmlround = $('div')
            .addClass('round')
            .appendTo(this.container)
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

   