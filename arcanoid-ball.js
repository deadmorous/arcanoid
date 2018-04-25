(function() {
    function Ball()
    {
        this.speed = 0
        this.pos = 2
    }
    Ball.speedInc = 1
    Ball.prototype.incSpeed = function() {
        this.speed += Ball.speedInc
    }
    Ball.prototype.decSpeed = function() {
        this.speed -= Ball.speedInc
    }
    arcanoid.Ball = Ball
})()
