 (function(){
   
 /*   function SetBricks(pos_x,pos_y)
    {
        var bricks_list = [];
        bricks_list[0]={'x':0.1,'y':0.9};
        bricks_list[1]={'x':0.9,'y':0};
        bricks_list[2]={'x':0.85,'y':0.9};
        bricks_list[3]={'x':0.5,'y':0.5};
        bricks_list[4]={'x':0.7,'y':0.3};
        bricks_list[5]={'x':0.6,'y':0.7};
        bricks_list[6]={'x':0.0,'y':0.0};
        bricks_list[7]={'x':0.1,'y':0.0};
        bricks_list[8]={'x':0.2,'y':0.0};
        bricks_list[9]={'x':0.3,'y':0.0};
        bricks_list[10]={'x':0.4,'y':0.0};

        this.bricks = arcanoid.makeBricks(this,bricks_list)
    }

   
    function makeRound(gameState,roundNumber)
    {
       

    }
    */

    function giverConstruction(Num)
    {
        var r = [];
        var r1 = [];
       r1[0]='1010101010';
       r1[1]='0101010101';
       r1[2]='1010101010';
       r1[3]='0101010101';
       r1[4]='1010101010';
       r1[5]='0101010101';
       r1[6]='1010101010';
       r1[7]='0101010101';
       r1[8]='1010101010';
       r1[9]='0101010101';
       
       var r2 = [];
       r2[0]='1001100110';
       r2[1]='0011100010';
       r2[2]='1001100110';
       r2[3]='0011100010';
       r2[4]='1001100110';
       r2[5]='0011100010';
       r2[6]='1001100110';
       r2[7]='0011100010';
       r2[8]='1001100110';
       r2[9]='0011100010';
       
       var r3 = [];
       r3[0]='1000000001';
       r3[1]='0100110010';
       r3[2]='0010000100';
       r3[3]='0001001000';
       r3[4]='0100110010';
       r3[5]='0100110010';
       r3[6]='0001001000';
       r3[7]='0010000100';
       r3[8]='0100110010';
       r3[9]='1000000001';

       switch(Num)
         {
            case 1:  
                 r = r1
                 break;
            case 2: 
                 r = r2
                break;
            case 2: 
                 r = r3
               break;
        }
    
       return r;
    }

    function makeRound(gameState,roundNumber)
    {
        var bricks_list = [];
        var k = [];
        k = giverConstruction(roundNumber);
        var ro = 0;
        for (var i=0; i<k.length; ++i) 
        {           
            var col = 0;
            for (var j=0; j<k[i].length; ++j) 
            {
                if (k[i].substr(j, 1) == '1')
                {
                    bricks_list[i] = {'x':col,'y':ro}
                }
                col = col + 0.1              
            }
            ro = ro + 0.1
        }
        
        this.bricks = arcanoid.makeBricks(this,bricks_list)
    }

    arcanoid.makeRound = makeRound
})()