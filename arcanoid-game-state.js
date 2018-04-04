(function() {
    function GameState()
    {
        this.paddle = new arcanoid.Paddle
        this.paddleMoved = new arcanoid.Event
    }
    GameState.prototype.next = function(dt)
    {
        if (this.paddle.speed != 0) {
            this.paddle.pos += this.paddle.speed*dt
            this.paddleMoved.raise()
        }
    }
    arcanoid.GameState = GameState
})()
