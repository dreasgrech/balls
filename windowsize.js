var windowSize = function() {
	var w = 0;
	var h = 0;

	//IE
	if (!window.innerWidth) {
		//strict mode
		if (! (document.documentElement.clientWidth == 0)) {
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
		}
		//quirks mode
		else {
			w = document.body.clientWidth;
			h = document.body.clientHeight;
		}
	}
	//w3c
	else {
		w = window.innerWidth;
		h = window.innerHeight;
	}
	return {
		width: w,
		height: h
	};
};
