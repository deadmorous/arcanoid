(function() {
    function Ball(gameState)
    {
        this.speed = [0, 0.01,0.5]
        this.pos = [0.55, 0.965]
        this.radius = 0.03
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
        this.ball = $('<div>')
            .addClass('ball')
            .text('O')
            .appendTo(this.container)
        positionBall.call(this)
    }

    arcanoid.GamePainter.addItemPainter(drawBall)

    arcanoid.Ball = Ball
})()
