(function() {
    function GamePainter(state, container)
    {
        this.state = state
        this.container = container
        state.paddleMoved.handle(
            GamePainter.prototype.positionPaddle.bind(this))
        $(window).resize(GamePainter.prototype.paint.bind(this))
    }
    GamePainter.prototype.positionPaddle = function()
    {
        this.paddle.offset({
            left: this.state.paddle.pos*window.innerWidth,
            top: window.innerHeight - this.paddle.height()
        })
    }
    GamePainter.prototype.paint = function()
    {
        this.container.html('')
        this.paddle =
            $('<div>')
                .addClass('paddle')
                .text('TODO')
                .appendTo(this.container)
        this.positionPaddle()
    }

    arcanoid.GamePainter = GamePainter
})()
