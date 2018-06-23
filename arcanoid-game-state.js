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
        this.rounds = new arcanoid.Rounds(this)
              
    }
    
    GameState.prototype.next = function(dt)
    {
        if (this.paddle.speed != 0) {
            this.paddle.pos += this.paddle.speed*dt
            var paddle_width =  $('.paddle').width() / $('#game').width();        
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

   
    /**
     * Contact of ball with paddle
     */
   
    function checkContactBallPaddle()
    {
        var ball_width = $('div.ball').width()/$('#game').width();
        var ball_height = $('div.ball').height()/$('#game').height();
        var paddle_width =  $('.paddle').width() / $('#game').width();
        var paddle_height =  $('.paddle').height() / $('#game').height();
        var paddle_left = this.paddle.pos;
        var paddle_right = this.paddle.pos + paddle_width;
        var paddle_center = this.paddle.pos + paddle_width / 2;
		var ball_pos_x = this.ball.pos[0];
		
        //Contact with top side of paddle
        if (this.ball.pos[1] + ball_height / 2 >= 1 - paddle_height && this.ball.speed[1]>0) {
            if (paddle_left <= this.ball.pos[0] && this.ball.pos[0] <= paddle_right) {		
				var ksi = 2 * (ball_pos_x - paddle_center) / paddle_width;
				var psi = Math.PI / 12 * ksi;
				var nx = Math.sin(psi);
				var ny = -Math.sqrt(1-nx*nx);
				var v_x = this.ball.speed[0];
				var v_y = this.ball.speed[1];
				var a = nx*v_y - ny*v_x;
				var b = nx*v_x + ny*v_y;
				this.ball.speed[0] = -a*ny - b*nx;
				this.ball.speed[1] = -b*ny + a*nx;
            } 
        }
        //Contact with right and left sides of paddle
        if (this.ball.pos[1] >= 1 - paddle_height) {
            if (paddle_right >= this.ball.pos[0] - ball_width / 2 && paddle_left <= this.ball.pos[0] + ball_width / 2)
            {
                if (paddle_center >= this.ball.pos[0])
                {
                    this.ball.pos[0] = paddle_left - ball_width / 2;
                    this.ball.speed[0] = -this.ball.speed[0];
                }
                else
                {
                    this.ball.pos[0] = paddle_right + ball_width / 2;
                    this.ball.speed[0] = -this.ball.speed[0];
                }
            } 
        }

        
        //Contact with right corner
        if(this.ball.radius > distance(this.ball.pos[0],this.ball.pos[1],paddle_right,1-paddle_height))              
        {
        var x1 = this.ball.pos[0];
        var y1 = this.ball.pos[1];
        var x2 = paddle_right;
        var y2 = 1-paddle_height;
        var n = unitVector(x1,y1,x2,y2);
        var v_x = this.ball.speed[0];
        var v_y = this.ball.speed[1];
        var a = n.x*v_y - n.y*v_x;
        var b = n.x*v_x + n.y*v_y;
        this.ball.speed[0] = -a*n.y - b*n.x;
        this.ball.speed[1] = -b*n.y + a*n.x;
        }
		
		//Contact with left corner
        if(this.ball.radius > distance(this.ball.pos[0],this.ball.pos[1],paddle_left, 1-paddle_height))              
        {
        var x1 = this.ball.pos[0];
        var y1 = this.ball.pos[1];
        var x2 = paddle_left;
        var y2 = 1-paddle_height;
        var n = unitVector(x1,y1,x2,y2);
        var v_x = this.ball.speed[0];
        var v_y = this.ball.speed[1];
        var a = n.x*v_y - n.y*v_x;
        var b = n.x*v_x + n.y*v_y;
        this.ball.speed[0] = -a*n.y - b*n.x;
        this.ball.speed[1] = -b*n.y + a*n.x;
        }
        

        //Game over
        if (this.ball.pos[1] + ball_height/2 >= 1.2 - paddle_height){
            this.ball.speed[1] = 0
            this.ball.speed[0] = 0
            $('#header').text("Game Over. Press F5 to restart")
        }
    }
    function unitVector(x1,y1,x2,y2)
    {
        var distance = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        var x = (x2-x1)/distance;
        var y = (y2-y1)/distance;
        return {'x':x,'y':y};
    }
	
	
    function distance(x1,y1,x2,y2)
    {
        return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    }
    arcanoid.GameState = GameState
})()