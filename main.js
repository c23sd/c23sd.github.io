var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
canvas.width  = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

var score = 0;
player1GoingRight = true;
function player(x,y,color){
	this.x = x;
	this.y = y;
	this.dirX = 5;
	this.dirY = 0;
	this.size = 20;
	this.color = color;
	this.goingRight = true;
	this.update = function(){
		this.dirY += 0.2
		this.y += this.dirY;
		if(this.x + this.size >= canvas.width){
			this.goingRight = false
		}
		else if (this.x <= 0){
			this.goingRight = true;
		}
		if(this.goingRight == true){
			this.x += this.dirX;
		}
		else{this.x -= this.dirX}
		if(this.goingRight != player1GoingRight){
			score += 1;
			player1GoingRight =this.goingRight;
			console.log(score);
		}
		if(this.y < 0){
			this.y = 0;
			this.dirY = 1;
			score = 0;
		}
		else if(this.y > canvas.height-this.size){
			this.y = canvas.height-this.size;
			this.dirY = -5;
			score = 0;
		}

	}
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}

}

function spike(x, y, color, rightSide){
	this.x = x;
	this.y = y;
	this.color = color;
	this.rightSide = rightSide;
	this.state = true;
	this.update = function(){
		if (player1.goingRight == this.rightSide){
			if((player1.x <= 5 && player1.goingRight) || (player1.x >= canvas.width -player1.size-5 && !player1.goingRight)){
				this.state = Math.round(Math.random());}
		}
		else {
			this.state = false;
		}
//collision detection
		if(this.state == true){
			if(this.rightSide == false){
				if(player1.x<=20 && (player1.y > this.y - 15 - player1.size && player1.y < this.y + 15)){
					// check small rectangle hitboxes
					// using a library
var V = SAT.Vector;
var P = SAT.Polygon;

// A square
var polygon1 = new P(new V(), [
  new V(player1.x,player1.y+player1.size), new V(player1.x +player1.size,player1.y+player1.size), new V(player1.x + player1.size,player1.y), new V(player1.x,player1.y)
]);
// A triangle
var polygon2 = new P(new V(), [
  new V(this.x-20,this.y+15), new V(this.x,this.y), new V(this.x-20,this.y-15)
]);
var response = new SAT.Response();
var collided = SAT.testPolygonPolygon(polygon1, polygon2, response);
if(collided){
	score = 0;
}

// Stealing code^^^^^^

				}
			}
			else{
				if(player1.x+player1.size > this.x && (player1.y > this.y - 15 - player1.size && player1.y < this.y + 15)){
					//check small rectangle hitboxes
					var V = SAT.Vector;
var P = SAT.Polygon;

// A square
var polygon1 = new P(new V(), [
  new V(player1.x,player1.y+player1.size), new V(player1.x +player1.size,player1.y+player1.size), new V(player1.x + player1.size,player1.y), new V(player1.x,player1.y)
]);
// A triangle
var polygon2 = new P(new V(), [
  new V(this.x,this.y), new V(this.x+20,this.y+15), new V(this.x+20,this.y-15)
]);
var response = new SAT.Response();
var collided = SAT.testPolygonPolygon(polygon1, polygon2, response);
if(collided){
	score = 0;

}
				}
			}
		}
//collision detection^^^^^^






	}
	this.draw = function(){
	if(this.state == true){
	if(this.rightSide == true){
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x +20, this.y -15);
	ctx.lineTo(this.x +20, this.y +15);
	ctx.closePath();
// the outline
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#666666';
	ctx.stroke();
// the fill color
	ctx.fillStyle = this.color;
	ctx.fill();
	}
		else{
		ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x -20, this.y -15);
	ctx.lineTo(this.x -20, this.y +15);
	ctx.closePath();
// the outline
	ctx.lineWidth = 1;
	ctx.strokeStyle = this.color;
	ctx.stroke();
// the fill color
	ctx.fillStyle = this.color;
	ctx.fill();
	}
}
}

}

var player1 = new player(0, 0, "blue"); 
var spikes = [];
var spikes2 = [];
for(var i = 0; i< canvas.width/40; i++){
	 spikes[i] = new spike(20 ,20 + 40*i,"blue", false)
	 spikes2[i] = new spike(canvas.width - 20 ,20 + 40*i,"blue", true)
}

	



window.addEventListener("click", function(){ player1.dirY=-7 });



function loop(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player1.update();
	player1.draw();
	for(var i = 0; i< canvas.width/40; i++){
	spikes[i].update();
	spikes2[i].update();
	spikes[i].draw();
	spikes2[i].draw();
	}
	requestAnimationFrame(loop)
}


requestAnimationFrame(loop);