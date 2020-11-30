var FoodX, FoodY;
var blocks = 20;
var end;
let snake1 = [];
let snake2 = [];
var lambi1 = 0;
var lambi2 = 0;
var ran;
let eatSound;
let deadSound;
let col1;
let col2;

function preload() {
	deadSound = loadSound("sounds/Oof.mp3");
	eatSound = loadSound("sounds/munch-sound-effect.mp3");
}

function setup() {
	createCanvas(1080, 600);

	snake1[lambi1++] = new SnakeBody((width) / 3, (height) / 2);
	snake2[lambi2++] = new SnakeBody((2 * width) / 3, (height) / 2);

	frameRate(18);

	col1 = color(255, 0, 255);
	col2 = color(0, 255, 0);

	end = -1;

	foodLocation();
	
	deadSound.rate(4);
	eatSound.rate(1.7);
	eatSound.setVolume(0.25);

	startScreen();
}

function draw() {
	if (end == 0) {
		snake1[0].move();
		snake2[0].move();
		snake1[0].dead1();
		snake2[0].dead2();
	}
	if (end == 0) {
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
	dead1() {
		for (var i = 0; i < lambi2; i++) {
			if (this.x == snake2[i].x && this.y == snake2[i].y) {
				if(i == 0) {
					snake2[0].dead2();
				}
				deadSound.play();
				lambi1 = 0;
				revive1();
			}
		}
	}
	dead2() {
		for (var i = 0; i < lambi1; i++) {
			if (this.x == snake1[i].x && this.y == snake1[i].y) {
				deadSound.play();
				lambi2 = 0;
				revive2();
			}
		}
	}
	eat1() {
		if (this.x == FoodX && this.y == FoodY) {
			eatSound.play();
			snake1[lambi1] = new SnakeBody(snake1[lambi1 - 1].x, snake1[lambi1 - 1].y);
			lambi1++
			foodLocation();
		}
	}
	eat2() {
		if (this.x == FoodX && this.y == FoodY) {
			eatSound.play();
			snake2[lambi2] = new SnakeBody(snake2[lambi2 - 1].x, snake2[lambi2 - 1].y);
			lambi2++
			foodLocation();
		}
	}
	move() {
		this.x = this.x + this.xSpeed;
		this.y = this.y + this.ySpeed;
		if(this.x < 20) {
			this.x = 1040;
		}
		if(this.y < 20) {
			this.y = 560;
		}
		if(this.x > 1040) {
			this.x = 20;
		}
		if(this.y > 560) {
			this.y = 20;
		}
	}
	show(colour) {
		fill(colour);
		stroke(0);
		strokeWeight(1);
		rect(this.x, this.y, blocks);
	}
}

function revive1() {
	var ranX = int(random(1, (width / blocks) - 2)) * blocks;
	var ranY = int(random(1, (height / blocks) - 2)) * blocks;
	for (i = 0; i < lambi2; i++) {
		if (ranX == snake2[i].x && ranY == snake2[i].y) {
			revive1();
		}
	}
	snake1[lambi1++] = new SnakeBody(ranX, ranY);
}

function revive2() {
	var ranX = int(random(1, (width / blocks) - 2)) * blocks;
	var ranY = int(random(1, (height / blocks) - 2)) * blocks;
	for (i = 0; i < lambi1; i++) {
		if (ranX == snake1[i].x && ranY == snake1[i].y) {
			revive2();
		}
	}
	snake2[lambi2++] = new SnakeBody(ranX, ranY);
}

function foodLocation() {
	FoodX = int(random(1, (width / blocks) - 2)) * blocks;
	FoodY = int(random(1, (height / blocks) - 2)) * blocks;
	ran = int(random(1, 5));
	for (i = 0; i < lambi1; i++) {
		if (FoodX == snake1[i].x && FoodY == snake1[i].y) {
			foodLocation();
		}
	}
	for (i = 0; i < lambi2; i++) {
		if (FoodX == snake2[i].x && FoodY == snake2[i].y) {
			foodLocation();
		}
	}
}

function FoodShow(type) {
	if (type == 1) {
		stroke(0);
		strokeWeight(1);
		fill(185, 52, 52);
		rectMode(CORNER);
		rect(FoodX + 9, FoodY, 2, 6);
		fill(255, 0, 0);
		ellipseMode(CORNER);
		ellipse(FoodX, FoodY + 3, 20, 16);
		fill(0, 255, 0);
		ellipse(FoodX + 11, FoodY + 1, 9, 2.5);
	} else if (type == 2) {
		stroke(0);
		strokeWeight(1);
		fill(185, 52, 52);
		rectMode(CORNER);
		rect(FoodX + 9, FoodY, 2, 6);
		fill(255, 140, 0);
		ellipseMode(CORNER);
		ellipse(FoodX, FoodY + 3, 20, 17);
		fill(0, 255, 0);
		ellipse(FoodX + 11, FoodY + 1, 9, 2.5);
	} else if (type == 3) {
		noFill();
		stroke(0);
		strokeWeight(1);
		line(FoodX + 10, FoodY + 2, FoodX + 5, FoodY + 17);
		line(FoodX + 10, FoodY + 2, FoodX + 15, FoodY + 17);
		fill(255, 0, 0);
		circle(FoodX + 5, FoodY + 17, 7);
		circle(FoodX + 15, FoodY + 17, 7);
	} else if (type == 4) {
		noFill();
		stroke(255, 255, 0);
		strokeWeight(5);
		arc(FoodX + 18, FoodY + 1, 30, 30, HALF_PI + 0.30, PI - 0.30);
		arc(FoodX + 20, FoodY, 30, 18, HALF_PI + 0.30, PI - 0.30);
		strokeWeight(1);
		stroke(50);
		arc(FoodX + 18, FoodY + 1, 30, 30, HALF_PI + 0.30, PI - 0.30);
		arc(FoodX + 20, FoodY, 30, 18, HALF_PI + 0.30, PI - 0.30);
		noStroke();
		fill(0, 255, 0);
		quad(FoodX, FoodY + 2, FoodX + 1, FoodY + 5, FoodX + 7, FoodY + 2, FoodX + 6, FoodY);
		stroke(0);
		strokeWeight(2);
		point(FoodX + 16, FoodY + 16);
		point(FoodX + 19, FoodY + 9);
	}
}

function keyPressed() {
	if(end == -1 && keyCode == ENTER) {
		end = 0;
		gameScreen();
	}

	if (end == 0) {
		if (keyCode === 65 && snake1[0].xSpeed < 1) {
			snake1[0].updateSpeed(-1, 0);
		} else if (keyCode === 68 && snake1[0].xSpeed > -1) {
			snake1[0].updateSpeed(1, 0);
		} else if (keyCode === 87 && snake1[0].ySpeed < 1) {
			snake1[0].updateSpeed(0, -1);
		} else if (keyCode === 83 && snake1[0].ySpeed > -1) {
			snake1[0].updateSpeed(0, 1);
		}

		if (keyCode === LEFT_ARROW && snake2[0].xSpeed < 1) {
			snake2[0].updateSpeed(-1, 0);
		} else if (keyCode === RIGHT_ARROW && snake2[0].xSpeed > -1) {
			snake2[0].updateSpeed(1, 0);
		} else if (keyCode === UP_ARROW && snake2[0].ySpeed < 1) {
			snake2[0].updateSpeed(0, -1);
		} else if (keyCode === DOWN_ARROW && snake2[0].ySpeed > -1) {
			snake2[0].updateSpeed(0, 1);
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
	fill(col1);
	rect(2 * width/6, height/2 , blocks);
	fill(col2);
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

	snake1[0].eat1();
	snake2[0].eat2();

	fill(170);
	stroke(170);
	strokeWeight(2);
	textAlign(CENTER);
	textSize(45);
	if (lambi1 > lambi2) {
		text("Snake1: " + (lambi1 - 1), width / 2, height / 2);
	} else if (lambi1 < lambi2) {
		text("Snake2: " + (lambi2 - 1), width / 2, height / 2);
	} else {
		text("Tied: " + (lambi1 - 1), width / 2, height / 2);
	}

	FoodShow(ran);

	for (i = lambi1 - 1; i >= 0; i--) {
		snake1[i].show(col1);
		if (i == 0) {
			snake1[0].eyes();
		}
	}
	for (i = lambi2 - 1; i >= 0; i--) {
		snake2[i].show(col2);
		if (i == 0) {
			snake2[0].eyes();
		}
	}

	for (i = lambi1 - 1; i > 0; i--) {
		snake1[i].x = snake1[i - 1].x;
		snake1[i].y = snake1[i - 1].y;
		snake1[i].xSpeed = snake1[i - 1].xSpeed;
		snake1[i].ySpeed = snake1[i - 1].ySpeed;
	}
	for (i = lambi2 - 1; i > 0; i--) {
		snake2[i].x = snake2[i - 1].x;
		snake2[i].y = snake2[i - 1].y;
		snake2[i].xSpeed = snake2[i - 1].xSpeed;
		snake2[i].ySpeed = snake2[i - 1].ySpeed;
	}
}