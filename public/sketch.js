var FoodX = [];
var FoodY = [];
var ran = [];
var blocks = 20;
var end;
let SNAKES = [[], []];
var LAMBI = [0, 0];
let COL = [0, 0];
let eatSound;
let deadSound;
let appleImg;
let pearImg;
let orangeImg;
let bananaImg;

function preload() {
	deadSound = loadSound("sounds/Oof.mp3");
	eatSound = loadSound("sounds/munch-sound-effect.mp3");
	appleImg = loadImage("img/Apple.png");
	pearImg = loadImage("img/Pear.png");
	orangeImg = loadImage("img/Orange.png");
	bananaImg = loadImage("img/Banana.png");
}

function setup() {
	createCanvas(1300, 700);

	for(var s = 0; s < LAMBI.length; s++) {
		SNAKES[s][LAMBI[s]++] = new SnakeBody(0, 0);
		COL[s] = color(random(255), random(255), random(255));
	}

	for(s = 0; s < 6; s++) {
		foodLocation(s);
	}

	frameRate(18);

	end = -1;
	
	deadSound.rate(4);
	eatSound.rate(1.7);
	eatSound.setVolume(0.25);

	startScreen();
}

function draw() {
	if (end == 0) {
		for(i = 0; i < LAMBI.length; i++) {
			SNAKES[i][0].move();
		}
		for(i = 0; i < LAMBI.length; i++) {
			SNAKES[i][0].dead(i);
		}
		gameScreen();
	}
}

class SnakeBody {
	constructor(ranX, ranY) {
		this.x = ranX;
		this.y = ranY;
		this.xSpeed = 0;
		this.ySpeed = 0;
	}
	updateSpeed(xS, xY) {
		this.xSpeed = xS * blocks;
		this.ySpeed = xY * blocks;
	}
	eyes() {
		fill(0);
		noStroke();
		ellipseMode(CENTER);
		if (this.xSpeed > 0) {
			ellipse(this.x + 15, this.y + 5, 6, 3);
			ellipse(this.x + 15, this.y + 15, 6, 3);
		} else if (this.xSpeed < 0) {
			ellipse(this.x + 5, this.y + 5, 6, 3);
			ellipse(this.x + 5, this.y + 15, 6, 3);
		} else if (this.ySpeed < 0) {
			ellipse(this.x + 5, this.y + 5, 3, 6);
			ellipse(this.x + 15, this.y + 5, 3, 6);
		} else if (this.ySpeed > 0) {
			ellipse(this.x + 5, this.y + 15, 3, 6);
			ellipse(this.x + 15, this.y + 15, 3, 6);
		}
	}
	dead(me) {
		for(var k = 0; k < LAMBI.length; k++) {
			if (k == me) {
				continue;
			}
			for (var i = 0; i < LAMBI[k]; i++) {
				if (this.x == SNAKES[k][i].x && this.y == SNAKES[k][i].y) {
					if(i == 0 || (i == 1 && SNAKES[me][1].x == SNAKES[k][0].x && SNAKES[me][1].y == SNAKES[k][0].y)) {
						deadSound.play();
						LAMBI[k] = 0;
						revive(k);
					}
					deadSound.play();
					LAMBI[me] = 0;
					revive(me);
				}
			}
		}
	}
	eat(me) {
		for(var f = 0; f < FoodX.length; f++) {
			if (this.x == FoodX[f] && this.y == FoodY[f]) {
				eatSound.play();
				SNAKES[me][LAMBI[me]] = new SnakeBody(SNAKES[me][LAMBI[me] - 1].x, SNAKES[me][LAMBI[me] - 1].y);
				LAMBI[me]++;
				foodLocation(f);
			}
		}
	}
	move() {
		this.x = this.x + this.xSpeed;
		this.y = this.y + this.ySpeed;
		if(this.x < blocks) {
			this.x = width - (2*blocks);
		}
		if(this.y < blocks) {
			this.y = height - (2*blocks);
		}
		if(this.x > width - (2*blocks)) {
			this.x = blocks;
		}
		if(this.y > height - (2*blocks)) {
			this.y = blocks;
		}
	}
	show(colour) {
		fill(colour);
		stroke(0);
		strokeWeight(1);
		rect(this.x, this.y, blocks);
	}
}

function revive(me) {
	var ranX = int(random(1, (width / blocks) - 2)) * blocks;
	var ranY = int(random(1, (height / blocks) - 2)) * blocks;

	for(var k = 0; k < LAMBI.length; k++) {
			if (k == me) {
				continue;
			}
			for (i = 0; i < LAMBI[k]; i++) {
			if (ranX == SNAKES[k][i].x && ranY == SNAKES[k][i].y) {
				revive(me);
			}
		}
	}
	SNAKES[me][LAMBI[me]++] = new SnakeBody(ranX, ranY);
}

function foodLocation(f) {
	FoodX[f] = int(random(1, (width / blocks) - 2)) * blocks;
	FoodY[f] = int(random(1, (height / blocks) - 2)) * blocks;
	ran[f] = int(random(1, 5));

	for(i = 0; i < FoodX.length; i++) {
		if(i == f) {
			continue;
		}
		if(FoodX[i] == FoodX[f] && FoodY[i] == FoodY[f]) {
			foodLocation(f);
		}
	}
	
	for(k = 0; k < LAMBI.length; k++) {
		for (i = 0; i < LAMBI[k]; i++) {
			if (FoodX[f] == SNAKES[k][i].x && FoodY[f] == SNAKES[k][i].y) {
				foodLocation(f);
			}
		}
	}
}

function FoodShow(type, f) {
	if (type == 1) {
		image(bananaImg, FoodX[f], FoodY[f], 20,20);
	} else if (type == 2) {
		image(appleImg, FoodX[f], FoodY[f], 20,20);
	} else if (type == 3) {
		image(pearImg, FoodX[f], FoodY[f], 20,20);
	} else if (type == 4) {
		image(orangeImg, FoodX[f], FoodY[f], 20,20);
	}
}

function keyPressed() {
	if(end == -1 && keyCode == ENTER) {
		end = 0;
		gameScreen();
	}

	if (end == 0) {
		if (keyCode === 65 && SNAKES[0][0].xSpeed < 1) {
			SNAKES[0][0].updateSpeed(-1, 0);
		} else if (keyCode === 68 && SNAKES[0][0].xSpeed > -1) {
			SNAKES[0][0].updateSpeed(1, 0);
		} else if (keyCode === 87 && SNAKES[0][0].ySpeed < 1) {
			SNAKES[0][0].updateSpeed(0, -1);
		} else if (keyCode === 83 && SNAKES[0][0].ySpeed > -1) {
			SNAKES[0][0].updateSpeed(0, 1);
		}

		if (keyCode === LEFT_ARROW && SNAKES[1][0].xSpeed < 1) {
			SNAKES[1][0].updateSpeed(-1, 0);
		} else if (keyCode === RIGHT_ARROW && SNAKES[1][0].xSpeed > -1) {
			SNAKES[1][0].updateSpeed(1, 0);
		} else if (keyCode === UP_ARROW && SNAKES[1][0].ySpeed < 1) {
			SNAKES[1][0].updateSpeed(0, -1);
		} else if (keyCode === DOWN_ARROW && SNAKES[1][0].ySpeed > -1) {
			SNAKES[1][0].updateSpeed(0, 1);
		}

		if (keyCode === 71 && SNAKES[2][0].xSpeed < 1) {
			SNAKES[2][0].updateSpeed(-1, 0);
		} else if (keyCode === 74 && SNAKES[2][0].xSpeed > -1) {
			SNAKES[2][0].updateSpeed(1, 0);
		} else if (keyCode === 89 && SNAKES[2][0].ySpeed < 1) {
			SNAKES[2][0].updateSpeed(0, -1);
		} else if (keyCode === 72 && SNAKES[2][0].ySpeed > -1) {
			SNAKES[2][0].updateSpeed(0, 1);
		}
	}
}

function startScreen() {
	background(60);
	textSize(35);
	textAlign(CENTER);
	fill(0, 255, 255);
	text("Player1 ", 2 * width/6, height/2 - blocks);
	text("Player2 ", 4 * width/6, height/2 - blocks);
	fill(255, 255, 0);
	text("W, A, D, S", 2 * width/6, height/2 + 2 * blocks);
	text("Arrow Keys", 4 * width/6, height/2 + 2 * blocks);
	textSize(60);
	fill(255, 0, 0);
	text("Press Enter to Continue...", width/2, height - 4 * blocks);
	rectMode(CENTER);
	fill(COL[0]);
	rect(2 * width/6, height/2 , blocks);
	fill(COL[1]);
	rect(4 * width/6, height/2 , blocks);
}

function gameScreen() {
	//making playing ground
	background(60);
	noFill();
	stroke(255);
	strokeWeight(1);
	rectMode(CORNER);
	rect(blocks - 1, blocks - 1, width - 2 * blocks + 2, height - 2 * blocks + 2);

	for(i = 0; i < LAMBI.length; i++) {
		SNAKES[i][0].eat(i);
	}

	fill(170);
	stroke(170);
	strokeWeight(2);
	textAlign(CENTER);
	textSize(45);
	if (LAMBI[0] > LAMBI[1]) {
		text("Player1: " + (LAMBI[0] - 1), width / 2, height / 2);
	} else if (LAMBI[0] < LAMBI[1]) {
		text("Player2: " + (LAMBI[1] - 1), width / 2, height / 2);
	} else {
		text("Tied: " + (LAMBI[0] - 1), width / 2, height / 2);
	}

	for(i = 0; i < FoodX.length; i++) {
		FoodShow(ran[i], i);
	}

	for(k = 0; k < LAMBI.length; k++) {
		for (i = LAMBI[k] - 1; i >= 0; i--) {
			SNAKES[k][i].show(COL[k]);
			if (i == 0) {
				SNAKES[k][0].eyes();
			}
		}
	}

	for(k = 0; k < LAMBI.length; k++) {
		for (i = LAMBI[k] - 1; i > 0; i--) {
			SNAKES[k][i].x = SNAKES[k][i - 1].x;
			SNAKES[k][i].y = SNAKES[k][i - 1].y;
			SNAKES[k][i].xSpeed = SNAKES[k][i - 1].xSpeed;
			SNAKES[k][i].ySpeed = SNAKES[k][i - 1].ySpeed;
		}
	}
}