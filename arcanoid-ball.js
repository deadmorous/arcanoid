(function() {
    function ball()
    {
        this.speed = 0
        this.pos = 2
    }
    Ball.speedInc = 1
    ball.prototype.incSpeed = function() {
        this.speed += ball.speedInc
    }
    ball.prototype.decSpeed = function() {
        this.speed -= ball.speedInc
    }
    arcanoid.ball = ball
})()
