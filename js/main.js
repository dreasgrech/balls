window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d'),
	NUM_STARTING_BALLS = 10,
	MIN_BALL_SIZE = 1,
	MAX_BALL_SIZE = 30,
	width,
	height,
	backgroundHue = Math.random(0, 360),
	setCanvasWidth = function() {
		var clientWindowSize = {width: window.innerWidth, height: window.innerHeight};
		width = clientWindowSize.width;
		height = clientWindowSize.height;
		ctx.canvas.width = width;
		ctx.canvas.height = height;
	},
	clearCanvas = function() {
		ctx.canvas.width = ctx.canvas.width;
	},
	generateBalls = function(num) {
		var i = 0,
		j = num;
		for (; i < j; ++i) {
			balls.addBall(createBall());
		}
	},
	getInstructions = function() {
		return "\nDOWN arrow: remove balls";
	},
	renderText = function() {
		ctx.font = "40pt sans-serif";
		var ballCount = "Balls: " + balls.numberOfBalls(),
		instructions = getInstructions(),
		ballCountTextWidth = ctx.measureText(ballCount).width,
		centerX = width / 2 - ballCountTextWidth / 2;

		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillText(ballCount, centerX, 70);
		ctx.font = "10pt sans-serif";
		ctx.fillText("UP: add balls", centerX, 90);
		ctx.fillText("DOWN: remove balls", centerX, 110);
	},
	renderBackground = function() {
		var color = colors.hsvToRgb(backgroundHue += 0.5, 100, 100);
		ctx.fillStyle = colors.getRGBString(color[0], color[1], color[2]);
		ctx.fillRect(0, 0, width, height);
		if (backgroundHue >= 360) {
			backgroundHue = 0;
		}
	},
	step = function() {
		clearCanvas();
		renderBackground();

		balls.update();
		balls.draw();

		if (keys.isKeyDown(38)) {
			balls.addBall(createBall());
		}

		if (keys.isKeyDown(40)) {
			balls.removeBall();
		}

		renderText();
	},
	createBall = function() {
		return ball(ctx, {
			x: Math.random(5, ctx.canvas.width),
			y: Math.random(5, ctx.canvas.height)
		},
		Math.random(1, 20), colors.getRandomColor(), Math.random(MIN_BALL_SIZE, MAX_BALL_SIZE));
	};
	balls = ballManager(ctx);

	window.onresize = function() {
		setCanvasWidth();
		balls.removeOutOfScreenBalls();
	};

	setCanvasWidth();
	generateBalls(NUM_STARTING_BALLS);

	setInterval(step, 1);
};

