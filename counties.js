var table;		// data file
var cp = [];	// centerpoints
var rowCount;

function preload(){
	table = loadTable('counties.tsv','tsv','header');
}

function setup(){
	myCanvas = createCanvas(800, 500);
	myCanvas.parent('myCanvas');

	rowCount = table.getRowCount();
	print(rowCount + " rows");

	for( var i = 0; i < rowCount; i++){
		var p = new Point();
		p.state = table.get(i,0);
		p.GEOID = table.get(i,1);
		p.county = table.get(i,2);
		p.lat = table.getNum(i,3);
		p.lon = table.getNum(i,4);
		cp[i] = p;
	}
	print(cp[1]);
}

function draw(){
	noLoop();
	background(100);
	fill(255);
	noStroke();
	for( var i = 0 ; i < rowCount ; i++ ){
		var x = map(cp[i].lon, -165, -64, 25, width-25);
		var y = map(cp[i].lat, 17, 70, height-25, 25);
		ellipse(x,y,3,3);
	}
}

function Point(){
	this.lat = 0;
	this.lon = 0;
	this.county = "name";
	this.state = "ST";
	this.GEOID = "00000";
}