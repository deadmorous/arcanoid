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
    function Bricks(gameState,bricks_list)
    {
        array_of_bricks = [];
        for(var i=0;i<bricks_list.length;++i){
            var pos_x = bricks_list[i]['x'];
            var pos_y = bricks_list[i]['y'];
            var new_brick = new Brick(pos_x,pos_y)
            array_of_bricks.push(new_brick)
        }
        // definition of handler of contact of ball and brick
        arcanoid.GamePainter.created.handle(
            function(painter){
                gameState.contactBallBrick.handle(
                    function(brick_num,brick_side){
                        painter.state.bricks.splice(brick_num,1)
                        painter.paint();
                        switch(brick_side)
                        {
                            case 'up-down': //contact with upper or lower side of brick 
                                painter.state.ball.speed[1] = -painter.state.ball.speed[1]
                                break;
                            case 'left-right': //contact with left or right side of brick
                                painter.state.ball.speed[0] = -painter.state.ball.speed[0]
                                break;
                        }
                    }
                )
            }
        )
        return array_of_bricks;
    }

    function drawBricks()
    {
        for(var i = 0;i<this.state.bricks.length;++i){
            this.brick_class = $('<div>').addClass('brick');
            this.brick_class.appendTo(this.container);
            pos_x = this.state.bricks[i].pos_x;
            pos_y = this.state.bricks[i].pos_y;
            this.brick_class.offset(this.toScreen(pos_x,pos_y));
        }
    }

    arcanoid.GamePainter.addItemPainter(drawBricks)

    arcanoid.Bricks = Bricks
})()