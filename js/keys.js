var keys = (function() {
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

} ());

