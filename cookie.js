$(document).ready(function() {
	// difficulty:
	// 4 => beginner
	// 8 => intermediate
	// 12 => advanced
	if ($.cookie("difficulty") == null) {
		$.cookie("difficulty", 4);
	}
});

