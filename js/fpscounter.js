var fpsCounter = function(ctx, stepInterval) {
	var before = new Date(),
	maxFPS = 1 / (stepInterval / 1000),
	currentFPS = 0,
	ONE_SECOND = 1000,
	frameCount = 0,
	FONT_SIZE = 30,
	TEXT_PADDING = 10;

	return {
		fps: function() {
			return currentFPS;
		},
		maxFps: function() {
			return maxFps;
		},
		update: function() {
			var now = new Date(),
			deltaTime = Math.ceil(now.getTime() - before.getTime());
			if (deltaTime >= ONE_SECOND) {
				currentFPS = frameCount;
				frameCount = 0;
				before = now;
			}
			frameCount++;
		},
		draw: function() {
			ctx.fillStyle = "rgb(255,255,0)";
			ctx.font = FONT_SIZE + "pt sans-serif";
			var textSize = ctx.measureText(currentFPS);
			ctx.fillText(currentFPS, ctx.canvas.width - textSize.width - TEXT_PADDING, FONT_SIZE + TEXT_PADDING);
		}
	};
};

