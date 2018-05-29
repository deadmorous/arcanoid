(function() {
    function GameState()
    {
        var bricks_list = [];
        bricks_list[0]={'x':0.1,'y':0.9};
        bricks_list[1]={'x':0.9,'y':0};
        bricks_list[2]={'x':0.85,'y':0.9};
        bricks_list[3]={'x':0.5,'y':0.5};
        bricks_list[4]={'x':0.7,'y':0.3};
        bricks_list[5]={'x':0.6,'y':0.7};
        // Important: Events are created first!
        this.paddleMoved = new arcanoid.Event
        this.ballMoved = new arcanoid.Event
        this.contactBallBrick = new arcanoid.Event
        
        this.paddle = new arcanoid.Paddle(this)
        this.bricks = arcanoid.makeBricks(this,bricks_list)
        this.ball = new arcanoid.Ball(this)
    }
    GameState.prototype.next = function(dt)
    {
        if (this.paddle.speed != 0) {
            this.paddle.pos += this.paddle.speed*dt

            
            var paddle_width =  $('.paddle').width() / $('#game').width();
            
            if (this.paddle.pos < 0) this.paddle.pos = 0;
            if (this.paddle.pos + paddle_width > 1) this.paddle.pos = 1 - paddle_width;

            this.paddleMoved.raise()
        }

        if (!(this.ball.speed[0] === 0 && this.ball.speed[1] === 0)) {
            
            this.ball.pos[0] += this.ball.speed[0]*dt

          
            this.ball.pos[1] += this.ball.speed[1]*dt
           
            this.ballMoved.raise()
        }

        //conatact ball adn brick check and handling
        checkContactBallBrick.call(this);
        checkContactBallPaddle.call(this);
    }

    function checkContactBallBrick()
    {
        var ball_width = $('div.ball').width()/$('#game').width();
        var ball_height = $('div.ball').height()/$('#game').height();
        var brick_width = $('div.brick').width()/$('#game').width();
        var brick_height = $('div.brick').height()/$('#game').height();
        if(this.bricks.length!=0)
        {
            for(var i=0;i<this.bricks.length;++i)
            {
                // checking and handling of contact ball and upper or lower side of brick
                if(
                    (this.ball.pos[1]>this.bricks[i].pos_y+brick_height && 
                    this.ball.pos[1]-ball_height/2<this.bricks[i].pos_y+brick_height &&
                    this.ball.pos[0]>this.bricks[i].pos_x &&
                    this.ball.pos[0]<this.bricks[i].pos_x+brick_width)||
                    (this.ball.pos[1]<this.bricks[i].pos_y && 
                    this.ball.pos[1]+ball_height/2>this.bricks[i].pos_y &&
                    this.ball.pos[0]>this.bricks[i].pos_x &&
                    this.ball.pos[0]<this.bricks[i].pos_x+brick_width)
                )
                {
                    this.contactBallBrick.raise(i,'up-down')
                    break;
                }
                // checking and handling of contact of  ball and left or right side of brick
                if(
                    (this.ball.pos[1]>this.bricks[i].pos_y &&
                    this.ball.pos[1]<this.bricks[i].pos_y+brick_height &&
                    this.ball.pos[0]<this.bricks[i].pos_x &&
                    this.ball.pos[0]+ball_width/2>this.bricks[i].pos_x)||
                    (this.ball.pos[1]>this.bricks[i].pos_y &&
                    this.ball.pos[1]<this.bricks[i].pos_y+brick_height &&
                    this.ball.pos[0]>this.bricks[i].pos_x+brick_width &&
                    this.ball.pos[0]-ball_width/2<this.bricks[i].pos_x+brick_width)
                )
                {
                    this.contactBallBrick.raise(i,'left-right')
                    break;
                }
            }
        }        
    }


    
    function checkContactBallPaddle()
    {
        
        var ball_height = $('div.ball').height()/$('#game').height();

        var paddle_width =  $('.paddle').width() / $('#game').width();
        var paddle_height =  $('.paddle').height() / $('#game').height();

        
        if (this.ball.pos[1] + ball_height / 2 >= 1 - paddle_height) {
            
            var paddle_left = this.paddle.pos;
            var paddle_right = this.paddle.pos + paddle_width;

            if (paddle_left <= this.ball.pos[0] && this.ball.pos[0] <= paddle_right) {
                this.ball.speed[1] = -Math.abs(this.ball.speed[1]);
            } 
        }
    }

    arcanoid.GameState = GameState
})()
