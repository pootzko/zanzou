$(document).ready(function() {
	console.log("initializing cookie");

	// difficulty:
	// 4 => beginner
	// 8 => intermediate
	// 12 => advanced
	if ($.cookie("difficulty") == null) {
		$.cookie("difficulty", 4);
	}


	// flashcard_type:
	// flashcard_type_ktr => kana to roumaji
	// flashcard_type_rtk => roumaji to kana
	// flashcard_type_vtk => voice to kana
	if ($.cookie("flashcard_type_ktr") == null)
		$.cookie("flashcard_type_ktr", 1);
	if ($.cookie("flashcard_type_rtk") == null)
		$.cookie("flashcard_type_rtk", 0);
	if ($.cookie("flashcard_type_vtk") == null)
		$.cookie("flashcard_type_vtk", 0);


	console.log("cookie initialized successfully");
});

