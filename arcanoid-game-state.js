(function() {
    function GameState()
    {
        var bricks_list = [
            {'x':0,'y':1},      // left-top brick
            {'x':0,'y':0},      // left-bottom brick
            {'x':1,'y':0},      // right-bottom brick
            {'x':1,'y':1},      // right-top brick
            {'x':0.5,'y':0.5},  // middle brick
            {'x':0.7,'y':0.3}   // random brick 
        ];
        this.paddle = new arcanoid.Paddle
        this.brick = new arcanoid.Bricks(bricks_list)
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
