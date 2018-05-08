(function() {
    function Paddle(gameState)
    {
        this.speed = 0
        this.pos = 0.5
        arcanoid.GamePainter.created.handle(function(painter) {
            gameState.paddleMoved.handle(
                positionPaddle.bind(painter))
        })
    }
    Paddle.speedInc = 0.5
    Paddle.prototype.incSpeed = function() {
        this.speed += Paddle.speedInc
    }
    Paddle.prototype.decSpeed = function() {
        this.speed -= Paddle.speedInc
    }
    arcanoid.Paddle = Paddle

    function positionPaddle()
    {
        this.paddle.offset(this.toScreen(this.state.paddle.pos, 0.97))
    }

    function drawPaddle()
    {
        this.paddle = $('<div>')
            .addClass('paddle')
            .text('TODO')
            .appendTo(this.container)
        positionPaddle.call(this)
    }

    arcanoid.GamePainter.addItemPainter(drawPaddle)
})()
