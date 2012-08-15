$(document).ready(function() {
	initializeLocalStorage();
	storage_symbols = JSON.parse(localStorage.getItem("storage_symbols_obj"));

	setFlashcard();
});





function setFlashcard() {
	var checked_storage_symbols = {"symbols": []};


	for (var i=0; i<storage_symbols.symbols.length; i++)
		if (storage_symbols.symbols[i].se == 1)
			checked_storage_symbols.symbols.push(storage_symbols.symbols[i]);


	var current_symbol_index = Math.floor(Math.random() * checked_storage_symbols.symbols.length);


	var temp_row = checked_storage_symbols.symbols[current_symbol_index].kr;
	var temp_column = checked_storage_symbols.symbols[current_symbol_index].kc;


	if (checked_storage_symbols.symbols[current_symbol_index].kt == "h")
		var temp_type = 1;
	else if (checked_storage_symbols.symbols[current_symbol_index].kt == "k")
		var temp_type = 2;
	else
		var temp_type = 0;


	if (checked_storage_symbols.symbols[current_symbol_index].ks == "mon") {
		var current_symbol = monographs[temp_row][temp_column][temp_type];
		console.log("this flashcard => monographs[" + temp_row + "][" + temp_column + "][" + temp_type + "]");
	}
	else if (checked_storage_symbols.symbols[current_symbol_index].ks == "dig") {
		var current_symbol = digraphs[temp_row][temp_column][temp_type];
		console.log("this flashcard => digraphs[" + temp_row + "][" + temp_column + "][" + temp_type + "]");
	}
	else if (checked_storage_symbols.symbols[current_symbol_index].ks == "mwd") {
		var current_symbol = monographs_with_diacritics[temp_row][temp_column][temp_type];
		console.log("this flashcard => monographs_with_diacritics[" + temp_row + "][" + temp_column + "][" + temp_type + "]");
	}
	else if (checked_storage_symbols.symbols[current_symbol_index].ks == "dwd") {
		var current_symbol = digraphs_with_diacritics[temp_row][temp_column][temp_type];
		console.log("this flashcard => digraphs_with_diacritics[" + temp_row + "][" + temp_column + "][" + temp_type + "]");
	}


	$("#flashcard_content").empty();
	$("#flashcard_content").append(current_symbol);

	setAnswers(checked_storage_symbols, current_symbol_index);
}





function setAnswers(checked_storage_symbols, correct_symbol_index) {
	var random_index = Math.floor(Math.random() * 8);
	var answer_boxes = "";
	var answers = [];
	var i=0, j=0, temp_index=0;

	while (i<8) {
		if (i == random_index)
			answers[i] = [checked_storage_symbols.symbols[correct_symbol_index].ro];
		else {
			var current_symbol_index = Math.floor(Math.random() * storage_symbols.symbols.length);
			answers[i] = [storage_symbols.symbols[current_symbol_index].ro];
		}

		// skip repeated and empty answers
		for (j=0; j<i; j++) {
			if (String(answers[i]) == String(answers[j])) {
				i--;
				break;
			}
		}
		if (answers[i] == "")
			i--;

		i++;
	}

	answer_boxes += "<table>";
	for (i=0; i<2; i++) {
		answer_boxes += "<tr>";
		for (j=0; j<4; j++) {
			answer_boxes += "<td>" + answers[temp_index] + "</td>";
			temp_index++;
		}
		answer_boxes += "</tr>";
	}
	answer_boxes += "</table>";

	$("#flashcard_table").empty();
	$("#flashcard_table").append(answer_boxes);
}












