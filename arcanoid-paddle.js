(function() {
    function Paddle()
    {
        this.speed = 0
        this.pos = 0.5
    }
    Paddle.speedInc = 0.5
    Paddle.prototype.incSpeed = function() {
        this.speed += Paddle.speedInc
    }
    Paddle.prototype.decSpeed = function() {
        this.speed -= Paddle.speedInc
    }
    arcanoid.Paddle = Paddle
})()
