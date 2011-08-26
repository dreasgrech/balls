var ballManager = function(ctx) {
	var balls = [];

	return {
		numberOfBalls: function() {
			return balls.length;
		},
		addBall: function(newBall) {
			balls.push(newBall);
		},
		removeBall: function() {
			balls.length && balls.pop();
		},
		removeOutOfScreenBalls: function() {
			var i = 0,
			j = balls.length;
			for (; i < j; ++i) {
				if (!balls[i].isInScreen()) {
					balls.splice(i, 1);
					j -= 1;
				}
			}
		},
		update: function() {
			var i = 0,
			j = balls.length;
			for (; i < j; ++i) {
				balls[i].update();
			}
		},
		draw: function() {
			var i = 0,
			j = balls.length;
			for (; i < j; ++i) {
				balls[i].draw();
			}
		}
	};
};
