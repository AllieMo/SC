// StarCatcher Scripts for the game made by Soft Dev 2015
    // when the web page window loads up, the game scripts will be read

// star images
var goodStar= new Image();
var badStar = new Image();
goodStar.src = "images/ball1.png";
badStar.src = "images/evilball.png";

window.onload = function() {
    var gameOn = false;
    var star = {
    _x: null,
    _y: null,
    _xSpeed: null,
    _ySpeed: null,
    _width: 20,
    _height: 20,
    _visible: null,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed,image) {
        var obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._xSpeed=xSpeed;
        obj._ySpeed=ySpeed;
        obj._img = image;
        obj._visible = true;
        return obj;
    },

    setImage: function(img){
        this._img.src=img;
    },

    //Update the new x and y of the star based on the speed.
    //drawing functionality is left for calling class
    //no input or return
    update: function () {
        this._x+=this._xSpeed;
        this._y+=this._ySpeed;
    },
    setSize: function () {
        this._width = 300;
        this._height = 200;
    },
};

    //loading score variables
    var p1Score = 0, p2Score = 0;

    //load canvas
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"),
        w = canvas.width = 1200,
        h = canvas.height = 700;

    //load images
    var ship1 = new Image();
    ship1.src="images/player1.png"
    var ship2 = new Image();
    ship2.src="images/player2.png";
    var background = new Image();
    background.src="images/court.png";

    // using arrays to keep track of star speeds and positions
// our stars are created using a single array with a class of information
    var starCount=40;
    var starArray=[];

    // Create an array of stars
    for (var i = 0; i < starCount; i++) {
        // this assigns each element in the array all the information for the star by 
        // using the 'star' class, pass the starting x,y locations 
        //  and speeds into the array.
        starArray.push(star.create(20,i*2+10,Math.random()*5,Math.random()*5,goodStar));
    }

    var badstarCount=20;
    var badstarArray=[];

    // Create an array of bad stars
    for (var i = 0; i < badstarCount; i++) {
        // this assigns each element in the array all the information for the star by 
        // using the 'star' class, pass the starting x,y locations 
        //  and speeds into the array.
        badstarArray.push(star.create(20,i*20+50,Math.random()*5,Math.random()*5,badStar));
    }

    var a = new Image();
    a.src="images/player1Wins.png";

    var a1 = new Image ();
    a1.src="images/player2Wins.png";
        
    // moving players around the screen 
    var p1x=w/2+100, p1y=h/2, p2x=w/2-100, p2y=h/2;
 
    //load up splash intro screen
    var s = new Image();
    s.src="images/splash1.png";
    s.onload = function () {ctx.drawImage(s,0,0,w,h);}

    // moving stars around the screen and update the players movement
    function starsUpdate () {
        // to move the stars around
        ctx.drawImage(background,0,0,w,h);
        
    //  draw star on screen only if visible
        for (var i = 0; i < starCount; i++) {
            starArray[i].update();
            if (starArray[i]._visible) {
                ctx.drawImage(starArray[i]._img, starArray[i]._x-starArray[i]._width/2, starArray[i]._y-starArray[i]._height/2, starArray[i]._width, starArray[i]._height);
                    // collision test
                if (Math.sqrt(Math.pow(p1x-starArray[i]._x,2) + Math.pow(p1y-starArray[i]._y,2))<40) {scoring(i,1,'good')}
                if (Math.sqrt(Math.pow(p2x-starArray[i]._x,2) + Math.pow(p2y-starArray[i]._y,2))<40) {scoring(i,2,'good')}
            }
            if (starArray[i]._x>w || starArray[i]._x<0) {starArray[i]._xSpeed = -starArray[i]._xSpeed}
            if (starArray[i]._y>h || starArray[i]._y<0) {starArray[i]._ySpeed = -starArray[i]._ySpeed}
           
        }//endFor
    //  draw  bad stars on screen only if visible
        for (var i = 0; i < badstarCount; i++) {
            badstarArray[i].update();
            if (badstarArray[i]._visible) {
                ctx.drawImage(badstarArray[i]._img, badstarArray[i]._x-badstarArray[i]._width/2, badstarArray[i]._y-badstarArray[i]._height/2, badstarArray[i]._width, badstarArray[i]._height);
                    // collision test for bad star
                if (Math.sqrt(Math.pow(p1x-badstarArray[i]._x,2) + Math.pow(p1y-badstarArray[i]._y,2))<40) {scoring(i,1,'bad')}
                if (Math.sqrt(Math.pow(p2x-badstarArray[i]._x,2) + Math.pow(p2y-badstarArray[i]._y,2))<40) {scoring(i,2,'bad')}
            }
            if (badstarArray[i]._x>w || badstarArray[i]._x<0) {badstarArray[i]._xSpeed = -badstarArray[i]._xSpeed}
            if (badstarArray[i]._y>h || badstarArray[i]._y<0) {badstarArray[i]._ySpeed = -badstarArray[i]._ySpeed}
           
        }//endFor

    }  // close stars update

    function time () {
        $("#TimeDisp").text(Time);

    //Listens to app for keyboard actions
    addEventListener("keydown", function (e) {

        if (e.keyCode == 38) { //  (key: up arrow)
            p1y-=10;
        }
        if (e.keyCode == 40) { //  (key: down arrow)
            p1y+=10;
        }
        if (e.keyCode == 37) { //  (key: left arrow)
            p1x-=10;
        }
        if (e.keyCode == 39) { //  (key: right arrow)
            p1x+=10;
        }
        // start the game with keyboard command and pause game
        if (e.keyCode == 32) { // (key: space bar to start game)
            if (gameOn == 0) {
                gameOn = 1;
                main();
            } //end if
        }//end if
        
        if (e.keyCode == 80) {
             // (key: p to pause game)
            gameOn = 0;
        }//end if

    }, false);

    // a new array is made to keep track of a button being held down
    var keysDown = [];

    // if the key is held down, the keycode is placed in array
    // then it is deleted upon keyup command.  
    // playerUpdate will now control player movements and use the keysDown array

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    //  player 2 movement keyboard commands
    addEventListener("keyup", function (e) {

        if (e.keyCode == 87) { //  (key: w )
            p2y-=10;
        }
        else if (e.keyCode == 83) { //  (key: s)
            p2y+=10;
        }
        else if (e.keyCode == 65) { //  (key: a)
            p2x-=10;
        }
        else if (e.keyCode == 68) { //  (key: d)
            p2x+=10;
        }
        //take keycode out of array (not being held down anymore)
        delete keysDown[e.keyCode];
    }, false); 

//player movement
    function playerUpdate() {
        //player two hodling down a key using the array keysDown
        if (87 in keysDown) {// P2 holding down the w key
            p2y -= 5;
        }
        if (83 in keysDown) { // P2 holding down (key: s)
            p2y += 5;
        }
        if (65 in keysDown) { // P2 holding down (key: a)
            p2x -= 5;
        }
        if (68 in keysDown) { // P2 holding down (key: d)
            p2x += 5;
        }

        // player one hodling key down
        if (37 in keysDown) { // P2 holding down (key: left arrow)
            p1x -= 5;
        }
        if (38 in keysDown) { // P2 holding down (key: up arrow)
            p1y -= 5;
        }
        if (39 in keysDown) { // P2 holding down (key: right arrow)
            p1x += 5;
        }
        if (40 in keysDown) { // P2 holding down (key: down arrow)
            p1y += 5;
        }
        //draw images of ships
        if (p1x>w-25) {p1x=25}
        if (p1x<25) {p1x=w-25}
        if (p1y>h-25) {p1y=h-25}
        if (p1y<25) {p1y=25}
        if (p2x>w-25) {p2x=25}
        if (p2x<25) {p2x=w-25}
        if (p2y>h-25) {p2y=h-25}
        if (p2y<25) {p2y=25}
       
        ctx.drawImage(ship1, p1x-30, p1y-30, 70, 70);
        ctx.drawImage(ship2, p2x-20, p2y-20, 70, 70);
    } // end player update
    
     //  scoring functions to place and score stars
    function scoring(k,wp,type) {
        if (wp==1) {
            // need to place a small star next to player 1 score
            if (type=='good') {
                starArray[k]._visible=false;
                p1Score= p1Score+2;
            }
            if (type=='bad') {
                badstarArray[k]._visible=false;
                p1Score= p1Score-2;
            }
            $("#p1ScoreDisp").text(p1Score);
            if (p1Score > starCount/2) {
                gameOn=0;
                {ctx.drawImage(a,0,0,w,h);}
            }
        }
        else if (wp==2) {
            if (type=='good') {
                starArray[k]._visible=false;
                p2Score= p2Score+2;
            }
            if (type=='bad') {
                badstarArray[k]._visible=false;
                p2Score= p2Score-2;
            }
            $("#p2ScoreDisp").text(p2Score);
            if (p2Score > starCount/2) {
                gameOn=0;
                {ctx.drawImage(a1,0,0,w,h);}
            }
        }
    } // end scoring function

    //Our main function which clears the screens 
    //  and redraws it all again through function updates,
    //  then calls itself out again
    function main(){
        ctx.clearRect(0,0,w,h);
        starsUpdate();
        playerUpdate();
        if (gameOn == 1) {
            requestAnimationFrame(main);}
    } // close main
} // close window onload 


               