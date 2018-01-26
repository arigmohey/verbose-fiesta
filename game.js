// Start of Global Variables =={
// ====================================

// Defining Animation Holder
var anim_id;
// Defining Street and it's Dimensions
var container = document.getElementById("container");
var container_left = parseInt(container.style.left);
var container_width = parseInt(container.style.width);
var container_height = parseInt(container.style.height);
// Defining Moving Cars and their Dimensions
var car = document.getElementById("car");
var car_1 = document.getElementById("car_1");
var car_2 = document.getElementById("car_2");
var car_3 = document.getElementById("car_3");
var car_width = parseInt(car.style.width);
var car_height = parseInt(car.style.height);
// Defining Oil Spot
var oil = document.getElementById("oilSpot");
var oil_width = parseInt(oil.style.width);
var oil_height = parseInt(oil.style.height);

// Defining Middle Lines
var line_1 = document.getElementById("line_1");
var line_2 = document.getElementById("line_2");
var line_3 = document.getElementById("line_3");
// Defining Restart Div
var restart_div = document.getElementById("restart_div");
var restart_btn = document.getElementById("restart_btn");
// Defining Crash Image Div
var crashImg = document.getElementById("crash"); 
var boom_div = document.getElementById("boom_div");
// Defining Sidebar Divs
var pause = document.getElementById("pause_div");
var pauseLabel = document.getElementById("pauseB");
var score = document.getElementById("score");
var timer = document.getElementById("timer");
var level_label = document.getElementById("level");
// Deifining Audio Divs
var start=document.getElementById("sstart");
var audio=document.getElementById("sound");
var crash=document.getElementById("boom");
// Defining Global Variables			
var gameOver = false;
var sliping = false;
var scoreCounter = 1;
var speed = 2;
var lineSpeed = 5;
var level = 1;
// Defining Movement Flags
var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;

// ====================================
// End of Global Variables ==}

// Start of Global functions =={
// ====================================

// Time and Score Counter Function 
function get_time()
{
	var sec = 0 ;
	var min = 0 ;
	var counter = setInterval(
		function ()
		{
			if(gameOver === true)
	        {
				clearInterval(counter);
				audio.pause();
				crash.play();
				setTimeout(function(){crash.pause();},2000)		
	        }
			
			sec ++;
			scoreCounter++;
			score.innerHTML=scoreCounter;
			if(sec==60)
			{
				min ++;
				sec=0;
			}
			function addZero(digit) 
	        {
		        if (digit < 10) 
				{digit = '0' + digit}
			    return digit;
			}
			timer.innerHTML=addZero(min)+":"+addZero(sec);
		}
    , 1000);
}
// Increasing Level Function 
function level_inc()
{
	if(scoreCounter/30 == level && gameOver === false)
	{
		level++;
		alert("Congratulation, You have reached level "+level);
		level_label.innerHTML=level;
		lineSpeed += 4;
	    speed += 2;
	    anim_id = requestAnimationFrame(repeat);
	}
}
// Move the Player Car Left Function
function left()
{
	if(gameOver === false  && parseInt(car.style.left) > 0){
		car.style.left = parseInt(car.style.left) - 1 + "%";
		moveLeft = requestAnimationFrame(left);
	}
}
// Move the Player Car Right Function
function right()
{
	if(gameOver === false && parseInt(car.style.left) < (container_width - car_width)-270){
		car.style.left = parseInt(car.style.left) + 1 + "%";
		moveRight = requestAnimationFrame(right);
	}
}
// Move the Player Car Forward Function
function up()
{
	if(gameOver === false && parseInt(car.style.top) > 0){
		car.style.top = parseInt(car.style.top) - 1 + "%";
		moveUp = requestAnimationFrame(up);
	}	
}
// Move the Player Car Backward Function
function down()
{
	if(gameOver === false && parseInt(car.style.top) < (container_height - car_height)-445){
		car.style.top = parseInt(car.style.top) + 1 + "%";
		moveDown = requestAnimationFrame(down);
	}	
}
// Cars Animation Function
function carDown(car)
{
	var carTop = parseInt(car.style.top);
	if(carTop > container_height){
		carTop = -200;
		var carLeft = parseInt(Math.random() * (container_width - car_width));
		car.style.left =carLeft+'px';
	}
	car.style.top = carTop +speed+'px';
}
// Oil Spot Animation Function
function oilDown(oil)
{
	var oilTop = parseInt(oil.style.top);
	if(oilTop > container_height){
		oilTop = -200;
		var oilLeft = parseInt(Math.random() * (container_width - oil_width));
		oil.style.left =oilLeft+'px';
	}
	oil.style.top = oilTop +speed+'px';
}
// Middle Lines Animation Function
function lineDown(line)
{
	var lineTop = parseInt(line.style.top);
	if(lineTop > container_height){
		lineTop = -300;
	}
	line.style.top = lineTop + lineSpeed +'px';
}
// Repeater Function to Animate the Whole Game
function repeat()
{
	if(gameOver === false){
		if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }
		
		carDown(car_1);
		carDown(car_2);
		carDown(car_3);
		oilDown(oil);
		slip(car, oil);


		lineDown(line_1);
		lineDown(line_2);
		lineDown(line_3);
        level_inc();
		anim_id = requestAnimationFrame(repeat);
	}
}
// Collision Function to check if Player car has collided to any other car
function collision(car1, car2) {
	var x1 = car1.offsetLeft;
	var y1 = car1.offsetTop;
	var h1 = parseInt(car1.style.height);
	var w1 = parseInt(car1.style.width);

	var x2 = car2.offsetLeft;
	var y2 = car2.offsetTop;
	var h2 = parseInt(car2.style.height);
	var w2 = parseInt(car2.style.width);
	
	if((y1 < (y2+h2+5)) && ((x1+w1+5) > x2) && (x1 < (x2+w2+5))  && ((y1+h1+5) > y2)) 
	{
		gameOver = true;
		crashImg.setAttribute("style","display:block;top:"+Math.min(y1,y2)+"px ;left:"+Math.min(x1,x2)+"px; position: relative; z-index:1;");
		return true;
	}else{
		return false;
	}
		
}
// Slipping Function when Player car passes over an oil spot
function slip(car1, oil1) {
	var x1 = car1.offsetLeft;
	var y1 = car1.offsetTop;
	var h1 = parseInt(car1.style.height);
	var w1 = parseInt(car1.style.width);

	var x2 = oil1.offsetLeft;
	var y2 = oil1.offsetTop;
	var h2 = parseInt(oil1.style.height);
	var w2 = parseInt(oil1.style.width);
	
	if((y1 < (y2+h2+5)) && ((x1+w1+5) > x2) && (x1 < (x2+w2+5))  && ((y1+h1+5) > y2)) 
	{
		sliping = true;
	}else{
		sliping =  false;
	}
		
}
// Stopper Function to Stop the Game when it's over
function stop_the_game() {
    gameOver = true;
    cancelAnimationFrame(anim_id);
    cancelAnimationFrame(moveLeft);
    cancelAnimationFrame(moveRight);
    cancelAnimationFrame(moveUp);
    cancelAnimationFrame(moveDown);
    audio.pause();
	// var boom = setTimeout(function(){
	// 	boom_div.setAttribute("style",boom_div.getAttribute("style")+";display:inline !important;");
	// 	boom_div.focus();
	// },500);
    
	var boom =setTimeout(function(){
		crashImg.setAttribute("style","display:none;");
		restart_div.setAttribute("style","display:inline;");
		restart_btn.focus();
	},3000);	
}
// Arrows Key Down EventListeners
document.addEventListener("keydown",function(e){
	if(gameOver === false && sliping === false){
		var key = e.keyCode;
		if(key === 37 && moveLeft === false) // LEFT
		{	
			moveLeft = requestAnimationFrame(left);
		}
		else if(key === 39 && moveRight === false) // RIGHT
		{	
			moveRight = requestAnimationFrame(right);
		}
		else if(key === 38 && moveUp === false) // UPWARD
		{	
			moveUp = requestAnimationFrame(up);
		}
		else if(key === 40 && moveDown === false) // DOWNWARD
		{	
			moveDown = requestAnimationFrame(down);
		}
	}
});
// Arrows Key Up EventListeners
document.addEventListener("keyup",function(e){
	if(gameOver === false && sliping === false)
	{
		var key = e.keyCode;
		if(key === 37)
		{
			window.cancelAnimationFrame(moveLeft);
            moveLeft = false;
		}
		else if (key === 39)
		{
			window.cancelAnimationFrame(moveRight);
            moveRight = false;
		}
		else if(key === 38)
		{
			window.cancelAnimationFrame(moveUp);
            moveUp = false;
		}
		else if(key === 40)
		{
			window.cancelAnimationFrame(moveDown);
			moveDown = false;
		}
	}
});
// Restart Button Click EventListener
restart_btn.addEventListener("click",function(){
	location.reload();
});
// Start Audio ending Event Listeners
start.addEventListener("ended",function(){
	audio.play();
	anim_id = requestAnimationFrame(repeat);
	get_time();
});
// ====================================
// End of Global functions =={

// Start The Game
get_time();
start.play();
anim_id = requestAnimationFrame(repeat);