$(document).ready(function() {
	// difficulty:
	// 4 => beginner
	// 8 => intermediate
	// 12 => advanced
	if ($.cookie("difficulty") == null) {
		console.log("cookie set");
		$.cookie("difficulty", 4);
	}
});

