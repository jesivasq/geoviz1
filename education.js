// Draw a graduated symbol map showing educational attainment 
// in the US

var table;		// data table
var cp; 		// centerpoints
var rowCount;
var states = [];

var bgMap;		// background map
var offsetX;
var offsetY;

var from;		// colors
var to;
var middle;

function preload(){
	table = loadTable('edu-2016.tsv','tsv', 'header');
	cp = loadTable('locations.tsv', 'tsv');
	bgMap = loadImage('map3.png');
}

function setup(){
 	var myCanvas = createCanvas(800,500);
 	myCanvas.parent('myCanvas');

 	// for navigating the array
 	rowCount = table.getRowCount();

 	// i want a little padding around the image
	offsetX = 80;
	offsetY = 50;

	// set the colors for the low and high
 	from = color(255, 255, 204, 230);
 	to = color(34, 94, 168, 230);
 	middle = color(127, 205, 187, 230);
 	

 	// set up the array
 	for( var i = 0; i < rowCount; i++){
 		var s = new State();
 		s.st = table.getString(i, 0);
 		s.state = table.getString(i, 1);
 		s.lt = table.getNum(i, 2);
 		s.hs = table.getNum(i, 3);
 		s.sc = table.getNum(i, 4);
 		s.ba = table.getNum(i, 5);
 		s.x = cp.getNum(i, 1) + offsetX;
 		s.y = cp.getNum(i, 2) + offsetY;
 		states[i] = s;
 	}

 	textFont("Arial");
 	textSize(12);
}

function draw(){
	colorMode(RGB);
	background(0);
 	image( bgMap, offsetX, offsetY ); 

 	// Legend
 	stroke(20)
 	strokeWeight(1);
 	fill(to);
 	ellipse(700, 400, 50, 50);
 	fill(middle);
 	ellipse(700, 413, 25, 25);
 	fill(from);
 	ellipse(700, 425, 2, 2);
 	stroke(255)
 	line(700, 375, 733, 375);
 	line(700, 400, 733, 400);
 	line(700, 423, 733, 423);

 	textAlign(LEFT);
 	noStroke();
 	fill(255);
 	text("> 40%", 740, 380);
 	text("30%", 740, 405);
 	text("< 20%", 740, 428);

 	// draw the centerpoint for each state
 	for( var i = 0; i < rowCount; i++){
 		var percent = norm(states[i].ba, 19.6, 41.2);
 		states[i].r = (50 * percent) + 2;

 		colorMode(HSB);
 		var c = lerpColor(from, to, percent);
 		fill(c);
 		stroke(20)
 		strokeWeight(1);
 		ellipse(states[i].x, states[i].y, states[i].r, states[i].r);
 	}	

 	// draw a tooltip when the mouse is over the dot symbol
 	for( var i = 0; i < rowCount; i++){
 		var d = dist(mouseX, mouseY, states[i].x, states[i].y);
		if( d < states[i].r ){
			noStroke();
			colorMode(RGB);
			fill( 255, 200 );
			var posX = states[i].x + 4;
			var posY = states[i].y - 36;
			rect(posX, posY, 80, 30);

			fill(0);
			textAlign(CENTER);
			text(states[i].st + ": " + states[i].ba + "%", posX + 40 , posY + 20);
		}
 	}
}

function State(){
	this.st = "ST";
	this.state = "state";
	this.lt = 0; // less than high school
	this.hs = 0; // high school
	this.sc = 0; // some college
	this.ba = 0; // BA or higher
	// and for display
	this.x = 0;
	this.y = 0;
	this.r = 10; // radius
}

