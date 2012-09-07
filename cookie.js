$(document).ready(function() {
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


	// kana type:
	// hiragana => hiragana
	// katakana => katakana
	if ($.cookie("kana_type") == null)
		$.cookie("kana_type", "hiragana");


	// kana set:
	// monographs => monographs
	// digraphs => digraphs
	// monographs_with_diacritics => monographs with diacritics
	// digraphs_with_diacritics => digraphs with diacritics
	if ($.cookie("kana_set") == null)
		$.cookie("kana_set", "monographs");
});

