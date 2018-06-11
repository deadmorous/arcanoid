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
    
    function makeBricks(gameState,bricks_list)
    {
       
                
        
        var array_of_bricks = [];
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
                    function(brick_num,brick_side) {
                        
                        var brick = painter.state.bricks[brick_num]
                        brick.brickElement.removeClass('brick')
                        brick.brickElement.addClass('bangbrick');
                        drawBang(brick,painter)
                        setTimeout(function() {
                            brick.brickElement.remove()
                            }, 200)
                        // painter.paint();
                        var brick_width = $('div.brick').outerWidth()/$('#game').width();
                        var brick_height = $('div.brick').outerHeight()/$('#game').height();
                        switch(brick_side)
                        {
                            case 'up-down': //contact with upper or lower side of brick 
                                painter.state.ball.speed[1] = -painter.state.ball.speed[1];
                                painter.state.bricks.splice(brick_num,1);
                                break;
                            case 'left-right': //contact with left or right side of brick
                                painter.state.ball.speed[0] = -painter.state.ball.speed[0];
                                painter.state.bricks.splice(brick_num,1);
                                break;
                            case 'corner':
                                switch(corner_type)
                                {
                                    case 'top-right':
                                        var x1 = painter.state.bricks[brick_num].pos_x + brick_width;
                                        var y1 = painter.state.bricks[brick_num].pos_y;
                                        break;
                                    case 'top-left':
                                        var x1 = painter.state.bricks[brick_num].pos_x;
                                        var y1 = painter.state.bricks[brick_num].pos_y;
                                        break;
                                    case 'bottom-left':
                                        var x1 = painter.state.bricks[brick_num].pos_x;
                                        var y1 = painter.state.bricks[brick_num].pos_y + brick_height;
                                        break;
                                    case 'bottom-right':
                                        var x1 = painter.state.bricks[brick_num].pos_x + brick_width    ;
                                        var y1 = painter.state.bricks[brick_num].pos_y + brick_height;
                                        break;
                                }
                                var x2 = painter.state.ball.pos[0];
                                var y2 = painter.state.ball.pos[1];
                                var n = unitVector(x1,y1,x2,y2);
                                var v_x = painter.state.ball.speed[0];
                                var v_y = painter.state.ball.speed[1];
                                // debugger
                                var a = n.x*v_y - n.y*v_x;
                                var b = n.x*v_x + n.y*v_y;
                                painter.state.ball.speed[0] = -a*n.y - b*n.x;
                                painter.state.ball.speed[1] = -b*n.y + a*n.x;
                                painter.state.bricks.splice(brick_num,1);
                                break;
                        }
                    }
                )
            }
        )
        return array_of_bricks;
    }

    function unitVector(x1,y1,x2,y2)
    {
        var distance = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        var x = (x2-x1)/distance;
        var y = (y2-y1)/distance;
        return {'x':x,'y':y};
    }

    function drawBricks()
    {
        for(var i = 0;i<this.state.bricks.length;++i){
            var brick = this.state.bricks[i]
            brick.brickElement = $('<div>').addClass('brick');
            brick.brickElement.appendTo(this.container);
            pos_x = brick.pos_x;
            pos_y = brick.pos_y;
            brick.brickElement.offset(this.toScreen(pos_x,pos_y));
        }
    }

    function drawBang (bangbrick,p){
        
        bangbrick.brickElement.appendTo(p.container);
        pos_x = bangbrick.pos_x;
        pos_y = bangbrick.pos_y;
        bangbrick.brickElement.offset(p.toScreen(pos_x*0.75,pos_y*0.75))
    }

    arcanoid.GamePainter.addItemPainter(drawBricks)

    arcanoid.makeBricks = makeBricks
})()