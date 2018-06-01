// Draw a graduated symbol map showing educational attainment 
// in the US. Include radio buttons so the user can compare
// different education levels.

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

var radio;		// radio button selector

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
	offsetX = 0;
	offsetY = 50;

	// set the colors for the low and high
 	from = color(255, 255, 204, 200);
 	to = color(34, 94, 168, 200);
 	middle = color(127, 205, 187, 200);

 	// pre-set the radio buttons to "completed high school"
 	radio = 2; // 1=lt, 2=hs, 3=sc, 4=ba
 	

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
 	noStroke();
 	fill(255);
 	ellipse(650, 400, 50, 50);
 	stroke(20)
 	strokeWeight(1);
 	fill(to);
 	ellipse(650, 400, 50, 50);
 	fill(middle);
 	ellipse(650, 413, 25, 25);
 	fill(from);
 	ellipse(650, 420, 10, 10);
 	stroke(255);
 	line(650, 375, 685, 375);
 	line(650, 400, 685, 400);
 	line(650, 414, 685, 414);

 	textAlign(LEFT);
 	noStroke();
 	fill(255);
 	text("50%", 690, 380);
 	text("25%", 690, 403);
 	text("10%", 690, 421);

 	// draw and label radio buttons
 	stroke(255);
 	strokeWeight(2);
 	fill(0);
 	for(var i = 0; i < 4 ; i++ ){
 		ellipse(650, 210 + i*30, 20, 20 );
 	}
 	// fill the user's most recent choice
 	fill(150);
 	ellipse(650, 180 + radio*30, 10, 10);
 	noStroke();
 	// label the buttons
 	fill(255);
 	text("Did not complete", 670, 202);
 	text("high school", 670, 214);
 	text("Completed", 670, 238);
 	text("high school", 670, 250);
 	text("Some college", 670, 274);
 	text("Bachelor's degree", 670, 300);
 	text("or higher", 670, 312);
 	

 	// if user clicks on radio buttons, store their choice
 	if( mouseIsPressed && mouseX >= 640 && mouseX <= 660){
 		if( mouseY >= 200 && mouseY <= 220 ){
 			radio = 1;
 		} else if( mouseY >= 230 && mouseY <= 250 ){
 			radio = 2;
 		} else if( mouseY >= 260 && mouseY <= 280 ){
 			radio = 3;
 		} else if( mouseY >= 290 && mouseY <= 310 ){
 			radio = 4;
 		}
 	}

 	// draw the centerpoint for each state
 	for( var i = 0; i < rowCount; i++){
 		if( radio == 1){
 			var percent = norm(states[i].lt, 0, 42);
 		} else if( radio == 2){
 			var percent = norm(states[i].hs, 0, 42);
 		} else if( radio == 3){
 			var percent = norm(states[i].sc, 0, 42);
 		}  else if( radio == 4){
 			var percent = norm(states[i].ba, 0, 42);
 		}
 		//var percent = norm(states[i].ba, 0, 42);
 		states[i].r = 50 * percent;

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

			// set the tooltip text
			var t;
			if( radio == 1){
	 			t = states[i].st + ": " + states[i].lt + "%";
	 		} else if( radio == 2){
	 			t = states[i].st + ": " + states[i].hs + "%";
	 		} else if( radio == 3){
	 			t = states[i].st + ": " + states[i].sc + "%";
	 		}  else if( radio == 4){
	 			t = states[i].st + ": " + states[i].ba + "%";
	 		}
			fill(0);
			textAlign(CENTER);
			text(t, posX + 40 , posY + 20);
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

