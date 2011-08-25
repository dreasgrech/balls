window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d'),
	NUM_STARTING_BALLS = 10000,
	MIN_BALL_SIZE = 1,
	MAX_BALL_SIZE = 30,
	width,
	height,
	balls = [],
	backgroundHue = 0,
	setCanvasWidth = function() {
		var clientWindowSize = windowSize();
		width = clientWindowSize.width;
		height = clientWindowSize.height;
		ctx.canvas.width = width;
		ctx.canvas.height = height;
	},
	getRandomColor = function() {
		var r = random(0, 255),
		g = random(0, 255),
		b = random(0, 255);
		return getRGBString(r, g, b);
	},
	random = function(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	},
	createBall = function() {
		return ball({
			x: random(5, width),
			y: random(5, height)
		},
		random(1, 10), random(1, 10), getRandomColor(), random(MIN_BALL_SIZE, MAX_BALL_SIZE));
	},
	addBall = function() {
		balls.push(createBall());
	},
	removeBall = function() {
		if (balls.length) {
			balls.pop();
		}
	},
	removeOutOfScreenBalls = function() {
		var i = 0,
		j = balls.length;
		for (; i < j; ++i) {
			if (!balls[i].isInScreen()) {
				balls.splice(i, 1);
				j -= 1;
			}
		}
	},
	generateBalls = function(num) {
		var i = 0,
		j = num;
		for (; i < j; ++i) {
			addBall();
		}
	},
	getRGBString = function(r, g, b) {
		return 'rgb(' + r + ',' + g + ',' + b + ')';
	},
	getInstructions = function() {
		return "UP arrow: add balls\nDOWN arrow: remove balls";
	},
	renderText = function() {
		ctx.font = "40pt sans-serif";
		var ballCount = "Balls: " + balls.length,
		instructions = getInstructions(),
		ballCountTextWidth = ctx.measureText(ballCount).width,
		centerX = width / 2 - ballCountTextWidth / 2;

		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillText(ballCount, centerX, 70);
		//ctx.font = "10pt sans-serif";
		//ctx.fillText(instructions, centerX, 70);
	},
	renderBackground = function() {
		var color = hsvToRgb(backgroundHue += 0.5, 100, 100);
		ctx.fillStyle = getRGBString(color[0], color[1], color[2]);
		ctx.fillRect(0, 0, width, height);
		if (backgroundHue >= 360) {
			backgroundHue = 0;
		}
	},
	ball = function(pos, dx, dy, color, size) {
		var position = pos,
		speed = 0.5;

		return {
			update: function() {
				position.x += dx * speed;
				position.y += dy * speed;

				if (position.x + dx > width || position.x + dx < 0) {
					dx = - dx;
				}

				if (position.y + dy > height || position.y + dy < 0) {
					dy = - dy;
				}
			},
			draw: function() {
				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.arc(position.x, position.y, size, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
			},
			isInScreen: function() {
				return position.x < width && position.y < height;
			}
		};
	},
	keys = (function() {
		var pressed = {};
		window.onkeydown = function(ev) {
			pressed[ev.keyCode] = true;
		};

		window.onkeyup = function(ev) {
			pressed[ev.keyCode] = false;
		}
		return {
			isKeyDown: function(keyCode) {
				return pressed[keyCode];
			}
		};

	} ()),
	step = function() {
		ctx.canvas.width = ctx.canvas.width;
		renderBackground();
		var i = 0,
		j = balls.length;
		for (; i < j; ++i) {
			balls[i].update();
			balls[i].draw();
		}

		if (keys.isKeyDown(38)) {
			addBall();
		}

		if (keys.isKeyDown(40)) {
			removeBall();
		}

		renderText();
	};

	window.onresize = function() {
		setCanvasWidth();
		removeOutOfScreenBalls();
	};

	setCanvasWidth();

	generateBalls(NUM_STARTING_BALLS);
	setInterval(step, 1);
};

