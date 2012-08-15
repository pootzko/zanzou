$(document).ready(function() {
	initializeLocalStorage();
	storage_symbols = JSON.parse(localStorage.getItem("storage_symbols_obj"));
	checked_storage_symbols = {"symbols": []};
	correct_answer_index = 0;

	setFlashcard();
});





function setFlashcard() {
	for (var i=0; i<storage_symbols.symbols.length; i++)
		if (storage_symbols.symbols[i].se == 1)
			checked_storage_symbols.symbols.push(storage_symbols.symbols[i]);


	correct_answer_index = Math.floor(Math.random() * checked_storage_symbols.symbols.length);

	var temp_row = checked_storage_symbols.symbols[correct_answer_index].kr;
	var temp_column = checked_storage_symbols.symbols[correct_answer_index].kc;


	if (checked_storage_symbols.symbols[correct_answer_index].kt == "h")
		var temp_type = 1;
	else if (checked_storage_symbols.symbols[correct_answer_index].kt == "k")
		var temp_type = 2;
	else
		var temp_type = 0;


	if (checked_storage_symbols.symbols[correct_answer_index].ks == "mon") {
		var current_symbol = monographs[temp_row][temp_column][temp_type];
		console.log("this flashcard => monographs[" + temp_row + "][" + temp_column + "][" + temp_type + "]");
	}
	else if (checked_storage_symbols.symbols[correct_answer_index].ks == "dig") {
		var current_symbol = digraphs[temp_row][temp_column][temp_type];
		console.log("this flashcard => digraphs[" + temp_row + "][" + temp_column + "][" + temp_type + "]");
	}
	else if (checked_storage_symbols.symbols[correct_answer_index].ks == "mwd") {
		var current_symbol = monographs_with_diacritics[temp_row][temp_column][temp_type];
		console.log("this flashcard => monographs_with_diacritics[" + temp_row + "][" + temp_column + "][" + temp_type + "]");
	}
	else if (checked_storage_symbols.symbols[correct_answer_index].ks == "dwd") {
		var current_symbol = digraphs_with_diacritics[temp_row][temp_column][temp_type];
		console.log("this flashcard => digraphs_with_diacritics[" + temp_row + "][" + temp_column + "][" + temp_type + "]");
	}


	$("#flashcard_content").empty();
	$("#flashcard_content").append(current_symbol);

	initializeAnswers(checked_storage_symbols);
}





function initializeAnswers(checked_storage_symbols) {
	var answer_boxes = "";
	var answers = [];
	var i=0, j=0, temp_index=0, skip_flag;
	var storage_symbols_range = storage_symbols.symbols.length;


	var random_index = Math.floor(Math.random() * 8);
	answers[random_index] = checked_storage_symbols.symbols[correct_answer_index].ro;
	console.log(random_index + " T: " + answers[random_index]);


	while (i<8) {
		skip_flag = 0;

		if (i != random_index) {
			current_symbol_index = Math.floor(Math.random() * storage_symbols_range);
			answers[i] = storage_symbols.symbols[current_symbol_index].ro;

			// skip repeated and empty answers
			for (j=0; j<i; j++) {
				if (answers[i] == answers[j]) {
					skip_flag = 1;
				}
			}
			if (answers[i] == "")
				skip_flag = 1;

			if (skip_flag != 1)
				i++;
		}
		else
			i++;
	}


	var correct_answers = checked_storage_symbols.symbols[correct_answer_index].co;
	var total_answers = checked_storage_symbols.symbols[correct_answer_index].to;
	if (total_answers != 0)
		var success_rate_percentage = "(" +(correct_answers / total_answers * 100).toPrecision(4) + "%)";
	else
		var success_rate_percentage = "";

	var success_rate = "SUCCESS RATE: " + correct_answers + "/" + total_answers + " " + success_rate_percentage;
	answer_boxes += "<table>" +
		"<tr>" +
		"	<td id='score' class='answers_table_header' colspan='3'>" + success_rate + "</td>" +
		"	<td class='answers_table_header'>next</td>" +
		"</tr>";
	for (i=0; i<2; i++) {
		answer_boxes += "<tr>";
		for (j=0; j<4; j++) {
			if (String(answers[temp_index]) == checked_storage_symbols.symbols[correct_answer_index].ro)
				var answer_id = "correct_answer";
			else
				var answer_id = "answer_box_" + temp_index;


			answer_boxes += "" +
				"<td id='" + answer_id + "' onclick='onAnswerBoxClick(\"" + answer_id + "\");'>" +
				"" + answers[temp_index] +
				"</td>";
			temp_index++;
		}
		answer_boxes += "</tr>";
	}
	answer_boxes += "</table>";

	$("#flashcard_table").empty();
	$("#flashcard_table").append(answer_boxes);
}





function onAnswerBoxClick(answer_id) {
	var temp_correct_state = 1;

	if (answer_id == "correct_answer") {
		$("#" + answer_id).css('background-color', "#207947");

		if (temp_correct_state == 1) {
			for (var i=0; i<storage_symbols.symbols.length; i++) {
				if (storage_symbols.symbols[i].sy == checked_storage_symbols.symbols[correct_answer_index].sy) {
					storage_symbols.symbols[i].co++;
					storage_symbols.symbols[i].to++;
				}
			}
		}
		else
			storage_symbols.symbols[i].to++;
	}
	else {
		$("#" + answer_id).css('background-color', "#c32918");

		if (temp_correct_state == 1) {
			for (var i=0; i<storage_symbols.symbols.length; i++) {
				if (storage_symbols.symbols[i].sy == checked_storage_symbols.symbols[correct_answer_index].sy)
					storage_symbols.symbols[i].to++;

			}
		}

		temp_correct_state = 0;
	}

	localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));
	console.log("table check changes stored to storage_symbols_obj " +
		"(" + correct_answer_index + " => " + checked_storage_symbols.symbols[correct_answer_index].se + ")");
}







