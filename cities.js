// display the 1000 most populous US cities (2015)

var cData;	// for holding JSON data
var city = [];	// an array of cities
var cCount;		// count of cities

function preload(){
	cData = loadJSON('cities.json');
}

function setup() {
  var myCanvas = createCanvas(800,500);
  myCanvas.parent('myCanvas');

  textFont("Roboto");

  // haven't figured out how to pull this from the JSON file yet
  cCount = 1000; 

  // set up the array of cities
  for( var i = 0; i < cCount ; i++){
  	var c = new Dot(cData[i]);
  	// translate the lat-long data into x-y data that'll fit
  	// on the canvas (with a little margin)
  	c.x = map(c.lon, -160,-65, 10, width-100);
  	c.y = map(c.lat, 20, 62, height-20, 20);
  	// the higher the rank, the bigger the circle
  	c.r = map(c.rank, 1, 1000, 15, 1);
  	city[i] = c;
  }
}

function draw() {
  background(0);

  // draw the cities
  noStroke();
  for(var i = 0; i < cCount; i++){
  	city[i].twinkle();
  	fill(255, 225, 120, city[i].alpha);
  	ellipse(city[i].x, city[i].y, city[i].r, city[i].r);
  }

  // draw tooltip on mouseover
  // it's a separate loop so it appears on top of all the cities
  for( var i = 0; i < cCount; i++){
  	var d = dist(mouseX, mouseY, city[i].x, city[i].y);
  	// only draw tooltip if the mouse is over the city
	if( d < city[i].r ){
		fill(255, 225, 120, 200);
		stroke(255,150)
		strokeWeight(3);
  		ellipse(city[i].x, city[i].y, city[i].r, city[i].r);

		fill(255);
		stroke(200);
		strokeWeight(1);
		var posX = city[i].x + 4;
		var posY = city[i].y - 36;
		rect(posX, posY, 150, 30);
		fill(0);
		noStroke();
		textSize(12);
		textAlign(CENTER);
		text(city[i].city + ": #" + city[i].rank, posX + 75 , posY + 20);
	}
  }
}

// class for the dots representing the cities
function Dot(c){
	this.x = c.x;			// city's x-coordinate
	this.y = c.y;			// city's y-coordinate
	this.r = c.r;			// radius of the circle

	// from the data file
	this.city = c.city;
	this.rank = c.rank;
	this.state = c.state;
	this.lat = c.latitude;
	this.lon = c.longitude;
	
	// for the bokeh effect
	this.theta = 0;
	this.speed = random(0.001, 0.05);
	this.scalar = random(1, 50);
	this.alpha = 125+ cos(this.theta) * this.scalar;

	// bokeh effect: adjust the transparency so it appears to shimmer
	this.twinkle = function(){
		this.alpha = 75 + cos(this.theta) * this.scalar;
		this.theta += this.speed;
	};
}