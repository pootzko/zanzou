$(document).ready(function() {
	initializeLocalStorage();
	storage_symbols = JSON.parse(localStorage.getItem("storage_symbols_obj"));
	checked_storage_symbols = {"symbols": []};
	correct_answer_index = 0;

	setFlashcard();
});





// prepare flashcard
function setFlashcard() {
	console.log("initializing new flashcard");

	// single out chosen practice symbols
	for (var i=0; i<storage_symbols.symbols.length; i++)
		if (storage_symbols.symbols[i].se == 1)
			checked_storage_symbols.symbols.push(storage_symbols.symbols[i]);

	// choose new flashcard
	correct_answer_index = Math.floor(Math.random() * checked_storage_symbols.symbols.length);
	var current_symbol = checked_storage_symbols.symbols[correct_answer_index].sy;


	var temp_row = checked_storage_symbols.symbols[correct_answer_index].kr;
	var temp_column = checked_storage_symbols.symbols[correct_answer_index].kc;
	var temp_type = checked_storage_symbols.symbols[correct_answer_index].kt;
	console.log("flashcard initialized => monographs[" + temp_row + "][" + temp_column + "][" + temp_type + "]");


	// output flashcard
	$("#flashcard_content").empty();
	$("#flashcard_content").append(current_symbol);


	initializeAnswers(checked_storage_symbols);
}





// prepare answer boxes
function initializeAnswers(checked_storage_symbols) {
	console.log("initializing flashcard answers");
	var storage_symbols_range = storage_symbols.symbols.length;
	var answer_boxes = "";
	var answers = [];
	var i=0, j=0, temp_index=0, skip_flag;


	// prepare the correct answer
	var random_index = Math.floor(Math.random() * $.cookie("difficulty"));
	answers[random_index] = checked_storage_symbols.symbols[correct_answer_index].ro;
	console.log("correct flashcard answer set " + answers[random_index]);


	// prepare wrong answers
	while (i<$.cookie("difficulty")) {
		skip_flag = 0;

		// prepare incorrect answers if answers[i] is not the correct answer
		if (i != random_index) {
			current_symbol_index = Math.floor(Math.random() * storage_symbols_range);
			answers[i] = storage_symbols.symbols[current_symbol_index].ro;
			console.log("incorrect flashcard answer set " + answers[i]);

			// skip repeated answers
			for (j=0; j<i; j++) {
				if (String(answers[i]) == String(answers[j])) {
					skip_flag = 1;
					console.log("skipping " + answers[i]);
				}
			}
			// skip empty symbol values
			if (answers[i] == "")
				skip_flag = 1;

			if (skip_flag != 1)
				i++;
		}
		else
			i++;
	}
	console.log("incorrect flashcard answers set");


	// prepare correct and answer count information
	var correct_answers_count = checked_storage_symbols.symbols[correct_answer_index].co;
	var total_answers_count = checked_storage_symbols.symbols[correct_answer_index].to;
	if (total_answers_count != 0)
		var success_rate_percentage = "(" +(correct_answers_count / total_answers_count * 100).toPrecision(4) + "%)";
	else
		var success_rate_percentage = "";


	// generate answers table and add success rate information to it
	var success_rate = "SUCCESS RATE: " + correct_answers_count + "/" + total_answers_count + " " + success_rate_percentage;
	answer_boxes += "<table>" +
		"<tr>" +
		"	<td id='score' class='answers_table_header' colspan='3'>" + success_rate + "</td>" +
		"	<td class='answers_table_header'><a href='/practice.php'>skip</a></td>" +
		"</tr>";

	for (i=0; i<($.cookie("difficulty") / 4); i++) {
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
	console.log("flashcard answers initialized successfully");


	// output flashcard answers
	$("#flashcard_table").empty();
	$("#flashcard_table").append(answer_boxes);
}





// actions to execute on answering
function onAnswerBoxClick(answer_id) {
	// 1 => not answered yet
	// 0 => answered wrongly
	// 2 => answered correctly
	var temp_correct_state = 1;


	// on answering correctly change box color and increse count
	if (answer_id == "correct_answer") {
		$("#" + answer_id).css('background-color', "#207947");

		// if the correct answer was the first choice increment both correct and total count
		if (temp_correct_state == 1) {
			for (var i=0; i<storage_symbols.symbols.length; i++) {
				if (storage_symbols.symbols[i].sy == checked_storage_symbols.symbols[correct_answer_index].sy) {
					storage_symbols.symbols[i].co++;
					storage_symbols.symbols[i].to++;
					temp_correct_state = 2;
				}
			}
		}
		// if the correct answer was not the first choice only increment total symbol count
		else
			storage_symbols.symbols[i].to++;
	}
	// on answering incorrectly change box color and increse count
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


	// save changes to storage_symbols_obj
	localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));
	console.log("table check changes stored to storage_symbols_obj " +
		"(" + correct_answer_index + " => " + checked_storage_symbols.symbols[correct_answer_index].se + ")");


	// if answered correctly, set next flashcard
	if (temp_correct_state == 2)
		setTimeout(function() { setFlashcard() }, 1000);
}







