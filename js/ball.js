var ball = function(ctx, pos, speed, color, radius) {
	var position = pos,
	angle = Math.random(0, 2 * Math.PI),
	velocity = function() {
		return {
			x: Math.cos(angle),
			y: Math.sin(angle)
		};

	},
	currentVelocity = velocity();

	return {
		update: function() {
			position.x += currentVelocity.x * speed;
			position.y += currentVelocity.y * speed;

			if ((position.x + radius) + currentVelocity.x > ctx.canvas.width || (position.x - radius) + currentVelocity.x < 0) {
				currentVelocity.x = - currentVelocity.x;
			}

			if ((position.y + radius) + currentVelocity.y > ctx.canvas.height || (position.y - radius) + currentVelocity.y < 0) {
				currentVelocity.y = - currentVelocity.y;
			}
		},
		draw: function() {
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		},
		isInScreen: function() {
			return position.x < ctx.canvas.width && position.y < ctx.canvas.height;
		}
	};
};
