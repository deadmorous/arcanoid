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

    /*
    Add all bricks to container and specifies its location
    */
    GamePainter.prototype.printBricks = function()
    {
        for(var i = 0;i<this.state.brick.length;++i){
            this.brick_class = $('<div>').addClass('brick');
            this.brick_class.appendTo(this.container);
            pos_x = this.state.brick[i].pos_x;
            pos_y = this.state.brick[i].pos_y;
            var coord = convert_coordinates([pos_x,pos_y],this.brick_class)
            this.brick_class.offset({
                left: coord['x'],
                top: coord['y']
            });
        }
    }

    /*
    Converts relative coordinate in container 
    */
    function convert_coordinates([x_relat,y_relat],brick_class)
    {
        var brick_height = brick_class.height();
        var brick_width = brick_class.width();

        var x = ($('#game').innerWidth() - brick_width)*x_relat;
        var y =  window.innerHeight - y_relat * 
            (  $('#game').innerHeight() - brick_height) - brick_height; 
        return {'x':x,'y':y}
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
        this.printBricks(); 
    }

    arcanoid.GamePainter = GamePainter
})()
