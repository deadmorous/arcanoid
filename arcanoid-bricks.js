(function(){
    /*
    Constructor of single brick
    INPUT[pos_x]: x-position of center of brick in respect to #game field
    INPUT[pos_y]: y-position of center of brick in respect to #game field
    */
    function Brick(pos_x,pos_y)
    {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
    }

    /*
    Constructor of array of bricks
    INPUT[brics_list]: array of objects with  bricks coordinates
    */
    function Bricks(bricks_list)
    {
        for(var i=0;i<bricks_list.length;++i){
            var pos_x = bricks_list[i]['x'];
            var pos_y = bricks_list[i]['y'];
            this[i] = new Brick(pos_x,pos_y);
        }
        this.length = bricks_list.length;
    }

    function drawBricks()
    {
        for(var i = 0;i<this.state.brick.length;++i){
            this.brick_class = $('<div>').addClass('brick');
            this.brick_class.appendTo(this.container);
            pos_x = this.state.brick[i].pos_x;
            pos_y = this.state.brick[i].pos_y;
            this.brick_class.offset(this.toScreen(pos_x,pos_y));
        }
    }

    arcanoid.GamePainter.addItemPainter(drawBricks)

    arcanoid.Bricks = Bricks
})()