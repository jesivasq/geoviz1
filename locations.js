var cp; // centerpoints
var rowCount;
var bgMap; // background map

var dot;
var dots = [];

var offsetX;
var offsetY;

function preload(){
	cp = loadTable('locations.tsv', 'tsv');
	bgMap = loadImage("map.png");
	textFont("Raleway");
}

function setup() {
	var myCanvas = createCanvas(800, 500);
	myCanvas.parent('myCanvas');

	// i want a little padding around the image
	offsetX = 80;
	offsetY = 50;

	rowCount = cp.getRowCount();
}

function draw() {
	background(200);
	image(bgMap, offsetX, offsetY); // 640 x 400

	// make a circle to represent each centerpoint
	for(var i = 0; i < rowCount; i++){
		dot = new Dot(cp.getNum(i, 1)+offsetX, cp.getNum(i,2)+offsetY, cp.get(i,0));
		dots[i] = dot;
		
		fill(130,150);
		stroke(100,150);
		strokeWeight(1);
		ellipse( dots[i].x, dots[i].y, dots[i].r, dots[i].r);
		
		// display a tooltip if the mouse is hovered over the centerpoint
		var d = dist(mouseX, mouseY, dots[i].x, dots[i].y);
		if( d < dots[i].r ){
			print(dots[i].state);
			displayDot = dots[i];

			fill(255);
			stroke(200);
			strokeWeight(1);
			var posX = dots[i].x + 4;
			var posY = dots[i].y - 36;
			rect(posX, posY, 50, 30);

			fill(0);
			noStroke();
			textSize(20);
			textAlign(CENTER);
			text(dots[i].state, posX + 25 , posY + 23);
		}
	}
}

function Dot( tempX, tempY, tempState ){
	this.x = tempX;
	this.y = tempY;
	this.state = tempState;
	this.r = 7; // radius
}

