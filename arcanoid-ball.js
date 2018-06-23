(function() {
    function Ball(gameState)
    {
        this.speed = [0.1, -0.1]
        this.pos = [0.63, 0.85]
        this.radius = 0.015
        arcanoid.GamePainter.created.handle(function(painter) {
            gameState.ballMoved.handle(
                positionBall.bind(painter))
        })
    }

    function positionBall()
    {
        var ball = this.state.ball
        var pos = ball.pos
        this.ball.offset(this.toScreen(pos[0]-ball.radius, pos[1]-ball.radius))
    }

    function drawBall()
    {
        var ballSize = this.state.ball.radius*200+'%'
        this.ball = $('<div>')
            .addClass('ball')
            
            .css({width: ballSize, height: ballSize})
            .appendTo(this.container)
        positionBall.call(this)
    }

    arcanoid.GamePainter.addItemPainter(drawBall)

    arcanoid.Ball = Ball
})()
