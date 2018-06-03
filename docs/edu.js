// Draw a graduated symbol map showing educational attainment 
// in the US. Include radio buttons so the user can compare
// different education levels. Include a drop-down menu so
// the user can select different survey years.

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
var lev;

var myTitle;	// for dropdown year selctor
var sel;
var changeYear;
var curYear;

function preload(){
	table = loadTable('edu.tsv','tsv', 'header');
	cp = loadTable('locations.tsv', 'tsv');
	bgMap = loadImage('map3.png');
}

function setup(){
 	var myCanvas = createCanvas(900,500);
 	myCanvas.parent('myCanvas');

 	// for navigating the array
 	rowCount = table.getRowCount();

 	// i want padding around the image
	offsetX =210;
	offsetY = 50;

	// set the colors (from and to will be used for lerp)
 	from = color(255, 255, 204, 200);
 	to = color(37, 52, 148, 200);
 	middle10 = color(209, 239, 171, 200);
 	middle25 = color(126, 214, 135, 200);
 	middle50 = color(65, 151, 173, 200);

 	// pre-set the radio buttons to "did not complete high school"
 	radio = 1; // 1=lt, 2=hs, 3=sc, 4=ba
 	lev = "Did Not Complete High School";

 	// for the year selection
 	myTitle = select("#changeYearTitle");
	changeYear = select('#changeYear');
	sel = createSelect();
	changeYear.child(sel);
	sel.position(40, 90); // this lands it on #myCanvas
	sel.option('2012-2016');
	sel.option('2000');
	sel.option('1990');
	sel.option('1980');
	sel.option('1970');
	sel.changed(changeData);
 	curYear = '2012-2016';
 	changeData();

 	// set up the array
 	for( var i = 0; i < rowCount; i++){
 		var s = new State();
 		s.st = table.getString(i, 0);
 		s.state = table.getString(i, 1);
 		s.lt70 = table.getNum(i, 2);
 		s.hs70 = table.getNum(i, 3);
 		s.sc70 = table.getNum(i, 4);
 		s.ba70 = table.getNum(i, 5);

 		s.lt80 = table.getNum(i, 6);
 		s.hs80 = table.getNum(i, 7);
 		s.sc80 = table.getNum(i, 8);
 		s.ba80 = table.getNum(i, 9);

 		s.lt90 = table.getNum(i, 10);
 		s.hs90 = table.getNum(i, 11);
 		s.sc90 = table.getNum(i, 12);
 		s.ba90 = table.getNum(i, 13);

 		s.lt00 = table.getNum(i, 14);
 		s.hs00 = table.getNum(i, 15);
 		s.sc00 = table.getNum(i, 16);
 		s.ba00 = table.getNum(i, 17);

 		s.lt16 = table.getNum(i, 18);
 		s.hs16 = table.getNum(i, 19);
 		s.sc16 = table.getNum(i, 20);
 		s.ba16 = table.getNum(i, 21);
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
 	fill(200);
 	ellipse(50, 400, 50, 50);
 	stroke(20)
 	strokeWeight(1); 
 	fill(to);		// 65%
 	ellipse(50, 400, 50, 50);
 	fill(middle50);	// 50%
 	ellipse(50, 406, 38, 38);
 	fill(middle25); // 25%
 	ellipse(50, 415, 19, 19);
 	fill(middle10); // 10%
 	ellipse(50, 422, 7, 7);
 	stroke(255);
 	line(50, 373, 85, 373); // lines to the labels
 	line(50, 385, 85, 385);
 	line(50, 403, 85, 403);
 	line(50, 418, 85, 418);
 	textAlign(LEFT);
 	noStroke();
 	fill(255);
 	text("65%", 90, 375);	// labels
 	text("50%", 90, 390);
 	text("25%", 90, 407);
 	text("10%", 90, 423);

 	// draw and label radio buttons
 	stroke(255);
 	strokeWeight(2);
 	fill(0);
 	for(var i = 0; i < 4 ; i++ ){
 		ellipse(50, 210 + i*30, 20, 20 );
 	}
 	// fill the user's most recent choice
 	fill(150);
 	ellipse(50, 180 + radio*30, 10, 10);

	// label the buttons
 	strokeWeight(1);
 	line(40, 84, 180, 84);   // for year
 	line(40, 184, 180, 184); // for level
 	noStroke();
 	fill(255);
 	text("Y E A R", 40, 80);
 	text("L E V E L", 40, 180);
 	text("Did not complete", 70, 202);
 	text("high school", 70, 214);
 	text("Completed", 70, 238);
 	text("high school", 70, 250);
 	text("Some college", 70, 274);
 	text("Bachelor's degree", 70, 300);
 	text("or higher", 70, 312);
 	
 	// if user clicks on radio buttons, store their choice
 	if( mouseIsPressed && mouseX >= 40 && mouseX <= 60){
 		if( mouseY >= 200 && mouseY <= 220 ){
 			radio = 1;
 			lev = "Did Not Complete High School";
 			changeData();
 		} else if( mouseY >= 230 && mouseY <= 250 ){
 			radio = 2;
 			lev = "Completed High School";
 			changeData();
 		} else if( mouseY >= 260 && mouseY <= 280 ){
 			radio = 3;
 			lev = "Some College (Includes Associate's Degree)";
 			changeData();
 		} else if( mouseY >= 290 && mouseY <= 310 ){
 			radio = 4;
 			lev = "Bachelor's Degree or Higher";
 			changeData();
 		}
 	}

 	// draw the symbol map, based on the user's choices
 	drawMap();	

}

function State(){
	this.st = "ST";
	this.state = "state";
	// 1970
	this.lt70 = 0; // less than high school
	this.hs70 = 0; // high school
	this.sc70 = 0; // some college
	this.ba70 = 0; // BA or higher
	// 1980
	this.lt80 = 0; // less than high school
	this.hs80 = 0; // high school
	this.sc80 = 0; // some college
	this.ba80 = 0; // BA or higher
	// 1990
	this.lt90 = 0; // less than high school
	this.hs90 = 0; // high school
	this.sc90 = 0; // some college
	this.ba90 = 0; // BA or higher
	// 2000
	this.lt00 = 0; // less than high school
	this.hs00 = 0; // high school
	this.sc00 = 0; // some college
	this.ba00 = 0; // BA or higher
	// 2016
	this.lt16 = 0; // less than high school
	this.hs16 = 0; // high school
	this.sc16 = 0; // some college
	this.ba16 = 0; // BA or higher
	// and for display
	this.x = 0;
	this.y = 0;
	this.r = 10; // radius
}

// if the user changes the year/level, update myTitle
function changeData(){
	curYear = sel.value();
	myTitle.html(curYear + ": " + lev);
}

function drawMap(){


	// draw the centerpoint for each state
	var percent;
 	for( var i = 0; i < rowCount; i++){
 		if(curYear == '1970'){
	 		if( radio == 1){
	 			percent = norm(states[i].lt70, 0, 65);
	 		} else if( radio == 2){
	 			percent = norm(states[i].hs70, 0, 65);
	 		} else if( radio == 3){
	 			percent = norm(states[i].sc70, 0, 65);
	 		}  else if( radio == 4){
	 			percent = norm(states[i].ba70, 0, 65);
	 		}
	 	} else if(curYear == '1980'){
	 		if( radio == 1){
	 			percent = norm(states[i].lt80, 0, 65);
	 		} else if( radio == 2){
	 			percent = norm(states[i].hs80, 0, 65);
	 		} else if( radio == 3){
	 			percent = norm(states[i].sc80, 0, 65);
	 		}  else if( radio == 4){
	 			percent = norm(states[i].ba80, 0, 65);
	 		}
	 	} else if(curYear == '1990'){
	 		if( radio == 1){
	 			percent = norm(states[i].lt90, 0, 65);
	 		} else if( radio == 2){
	 			percent = norm(states[i].hs90, 0, 65);
	 		} else if( radio == 3){
	 			percent = norm(states[i].sc90, 0, 65);
	 		}  else if( radio == 4){
	 			percent = norm(states[i].ba90, 0, 65);
	 		}
	 	} else if(curYear == '2000'){
	 		if( radio == 1){
	 			percent = norm(states[i].lt00, 0, 65);
	 		} else if( radio == 2){
	 			percent = norm(states[i].hs00, 0, 65);
	 		} else if( radio == 3){
	 			percent = norm(states[i].sc00, 0, 65);
	 		}  else if( radio == 4){
	 			percent = norm(states[i].ba00, 0, 65);
	 		}
	 	}  else { // curYear == 2012-2016
	 		if( radio == 1){
	 			percent = norm(states[i].lt16, 0, 65);
	 		} else if( radio == 2){
	 			percent = norm(states[i].hs16, 0, 65);
	 		} else if( radio == 3){
	 			percent = norm(states[i].sc16, 0, 65);
	 		}  else if( radio == 4){
	 			percent = norm(states[i].ba16, 0, 65);
	 		}
	 	}

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
			fill( 255, 175 );
			var posX = states[i].x + 4;
			var posY = states[i].y - 36;
			rect(posX, posY, 80, 30);

			// set the tooltip text
			var t;
			if( curYear == '1970'){
				if( radio == 1){
		 			t = states[i].st + ": " + states[i].lt70 + "%";
		 		} else if( radio == 2){
		 			t = states[i].st + ": " + states[i].hs70 + "%";
		 		} else if( radio == 3){
		 			t = states[i].st + ": " + states[i].sc70 + "%";
		 		}  else if( radio == 4){
		 			t = states[i].st + ": " + states[i].ba70 + "%";
		 		}
		 	} else if( curYear == '1980'){
				if( radio == 1){
		 			t = states[i].st + ": " + states[i].lt80 + "%";
		 		} else if( radio == 2){
		 			t = states[i].st + ": " + states[i].hs80 + "%";
		 		} else if( radio == 3){
		 			t = states[i].st + ": " + states[i].sc80 + "%";
		 		}  else if( radio == 4){
		 			t = states[i].st + ": " + states[i].ba80 + "%";
		 		}
		 	}  else if( curYear == '1990'){
				if( radio == 1){
		 			t = states[i].st + ": " + states[i].lt90 + "%";
		 		} else if( radio == 2){
		 			t = states[i].st + ": " + states[i].hs90 + "%";
		 		} else if( radio == 3){
		 			t = states[i].st + ": " + states[i].sc90 + "%";
		 		}  else if( radio == 4){
		 			t = states[i].st + ": " + states[i].ba90 + "%";
		 		}
		 	} else if( curYear == '2000'){
				if( radio == 1){
		 			t = states[i].st + ": " + states[i].lt00 + "%";
		 		} else if( radio == 2){
		 			t = states[i].st + ": " + states[i].hs00 + "%";
		 		} else if( radio == 3){
		 			t = states[i].st + ": " + states[i].sc00 + "%";
		 		}  else if( radio == 4){
		 			t = states[i].st + ": " + states[i].ba00 + "%";
		 		}
		 	}  else { // curYear == 2012-2016
				if( radio == 1){
		 			t = states[i].st + ": " + states[i].lt16 + "%";
		 		} else if( radio == 2){
		 			t = states[i].st + ": " + states[i].hs16 + "%";
		 		} else if( radio == 3){
		 			t = states[i].st + ": " + states[i].sc16 + "%";
		 		}  else if( radio == 4){
		 			t = states[i].st + ": " + states[i].ba16 + "%";
		 		}
		 	}
			fill(0);
			textAlign(CENTER);
			text(t, posX + 40 , posY + 20);
		}
 	}
}