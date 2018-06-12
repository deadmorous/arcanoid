(function() {
    function GameState()
    {
        var roundNumber = 1;
        // Important: Events are created first!
        this.paddleMoved = new arcanoid.Event
        this.ballMoved = new arcanoid.Event
        this.contactBallBrick = new arcanoid.Event
        
        this.paddle = new arcanoid.Paddle(this)
        arcanoid.makeRound(this,roundNumber)
        this.ball = new arcanoid.Ball(this)
        this.score = new arcanoid.Score(this)
    }
    GameState.prototype.next = function(dt)
    {
        if (this.paddle.speed != 0) {
            this.paddle.pos += this.paddle.speed*dt


            //Ширина ракетки.
            var paddle_width =  $('.paddle').width() / $('#game').width();
            //Предотвращение выхода ракетки за границы поля.

            
            var paddle_width =  $('.paddle').width() / $('#game').width();
            

            if (this.paddle.pos < 0) this.paddle.pos = 0;
            if (this.paddle.pos + paddle_width > 1) this.paddle.pos = 1 - paddle_width;

            this.paddleMoved.raise()
        }

        if (!(this.ball.speed[0] === 0 && this.ball.speed[1] === 0)) {

            //Ball size
            var ball_width = $('div.ball').width()/$('#game').width();
            var ball_height = $('div.ball').height()/$('#game').height();

            this.ball.pos[0] += this.ball.speed[0]*dt

            //Exit the ball out of the field along the OX
            if (this.ball.pos[0] < ball_width / 2) {
                this.ball.pos[0] = ball_width / 2;
                this.ball.speed[0] = -this.ball.speed[0];
            }

            if (this.ball.pos[0] + ball_width / 2 > 1) {
                this.ball.pos[0] = 1 - ball_width / 2;
                this.ball.speed[0] = -this.ball.speed[0];
            }

            this.ball.pos[1] += this.ball.speed[1]*dt
            //Exit the ball out of the field along the OY
            if (this.ball.pos[1] - ball_height / 2 < 0) {
                this.ball.pos[1] = ball_height / 2;
                this.ball.speed[1] = -this.ball.speed[1];
            }

    
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
        var brick_width = $('div.brick').outerWidth()/$('#game').width();
        var brick_height = $('div.brick').outerHeight()/$('#game').height();
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
                if(
                    this.ball.radius > distance(this.ball.pos[0],this.ball.pos[1],
                      this.bricks[i].pos_x,this.bricks[i].pos_y ) ||
                    this.ball.radius > distance(this.ball.pos[0],this.ball.pos[1],
                      this.bricks[i].pos_x + brick_width,this.bricks[i].pos_y ) ||
                    this.ball.radius > distance(this.ball.pos[0],this.ball.pos[1],
                      this.bricks[i].pos_x,this.bricks[i].pos_y + brick_height ) ||
                    this.ball.radius > distance(this.ball.pos[0],this.ball.pos[1],
                      this.bricks[i].pos_x + brick_width,this.bricks[i].pos_y + brick_height) 
                )
                {
                    if(this.ball.pos[0] > this.bricks[i].pos_x + brick_width &&
                      this.ball.pos[1] < this.bricks[i].pos_y)
                    {
                        this.contactBallBrick.raise(i,'corner','top-right');
                        break;
                    }
                    if(this.ball.pos[0] < this.bricks[i].pos_x &&
                        this.ball.pos[1] < this.bricks[i].pos_y)
                    {
                        this.contactBallBrick.raise(i,'corner','top-left');
                        break;
                    }
                    if(this.ball.pos[0] < this.bricks[i].pos_x &&
                        this.ball.pos[1] > this.bricks[i].pos_y + brick_height)
                    {
                        this.contactBallBrick.raise(i,'corner','bottom-left');
                        break;
                    }
                    if(this.ball.pos[0] > this.bricks[i].pos_x + brick_width &&
                        this.ball.pos[1] > this.bricks[i].pos_y + brick_height)
                    {
                        this.contactBallBrick.raise(i,'corner','bottom-right');
                        break;
                    }
                }
            }
        }        
    }

    function distance(x1,y1,x2,y2)
    {
        return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    }


    /**
     * Обработка контакта ракетки с мячом.
     */
    function checkContactBallPaddle()
    {
        //Размеры мяча.
        var ball_height = $('div.ball').height()/$('#game').height();

        //Размеры ракетки.
        var paddle_width =  $('.paddle').width() / $('#game').width();
        var paddle_height =  $('.paddle').height() / $('#game').height();

        //Если самая низшая точка ушла ниже самой высшей точки ракетки, то...
        if (this.ball.pos[1] + ball_height / 2 >= 1 - paddle_height) {
            //Границы ракетки по оси OX.
            var paddle_left = this.paddle.pos;
            var paddle_right = this.paddle.pos + paddle_width;

            //Если мяч коснулся ракетки, то...
            if (paddle_left <= this.ball.pos[0] && this.ball.pos[0] <= paddle_right) {
                this.ball.speed[1] = -Math.abs(this.ball.speed[1]);
            } /*Ball isn't touch paddle*/
            else {
                this.ball.speed[0] = Math.abs(this.ball.speed[0]);
                this.ball.speed[1] = -Math.abs(this.ball.speed[1]);
                this.ball.pos[0] = this.paddle.pos + paddle_width / 2;
                this.ball.pos[1] = 1 - paddle_height - ball_height / 2;
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
               // this.ball.speed[1] = -Math.abs(this.ball.speed[1]);
               this.ball.speed[1] = 0
               $('#header').text("Game Over. Press F5 to restart")
            } 

        }
    }

    arcanoid.GameState = GameState
})()
