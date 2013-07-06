$(document).ready(function() {
	initializeLocalStorage();
	storage_symbols = JSON.parse(localStorage.getItem("storage_symbols_obj"));
	storage_score = JSON.parse(localStorage.getItem("storage_score_obj"));
	checked_storage_symbols = {};
	latest_symbols = ["あ", "い", "う"];
	correct_answer_index = 0;
	flashcard_type = 1;
	temp_correct_state = 1; // used in onAnswerBoxClick()

	initializeSound();
	setFlashcard();
});





// initialize soundmanager2
function initializeSound() {
	soundManager.setup({
		url: "lib/soundmanager2/",
		flashVersion: 9,
		useFlashBlock: false
	});
}





// prepare flashcard
function setFlashcard() {
	var tmp_low_range = 0, tmp_high_range = 0, tmp_range_value = 0;
	var flawless_coefficient = 1, check_latest = 1, latest_flag, latest_amount;
	checked_storage_symbols = {"symbols": []};


	// single out chosen practice symbols
	for (var i=0; i<storage_symbols.symbols.length; i++)
		if (storage_symbols.symbols[i].se == 1)
			checked_storage_symbols.symbols.push(storage_symbols.symbols[i]);


	// check if at least one symbol is selected, if not - initialize first five hiragana symbols
	checkFlashcardAmount();


	// set symbol appearance probabilities
	for (var i=0; i<checked_storage_symbols.symbols.length; i++) {
		var success_rate_percentage = calculateSuccessRate(i);

		tmp_low_range = tmp_high_range;
		// symbols that have not been practised yet
		if (success_rate_percentage == 0)
			tmp_high_range += checked_storage_symbols.symbols.length;
		else if (success_rate_percentage == 1)
			tmp_high_range += flawless_coefficient;
		else
			tmp_high_range += (checked_storage_symbols.symbols.length * (-1 * Math.log(success_rate_percentage) + 1));

		checked_storage_symbols.symbols[i].lr = Math.floor(tmp_low_range * 100) / 100;
		checked_storage_symbols.symbols[i].hr = Math.floor(tmp_high_range * 100) / 100;
	}


	randomizeFlashcardType();


	// choose new flashcard if it hasn't appeared as one of previous 3 flashcards
	while (check_latest == 1) {
		// randomize new flashcard
		tmp_range_value = Math.floor(Math.random() * tmp_high_range);

		// find the symbol within given range
		for (var i=0; i<checked_storage_symbols.symbols.length; i++) {
			if ((checked_storage_symbols.symbols[i].lr <= tmp_range_value) && (checked_storage_symbols.symbols[i].hr > tmp_range_value)) {
				correct_answer_index = i;
				break;
			}
		}


		latest_flag = 0;

		// set the latest_amount treshold (prevents problems with less than "latest_symbols.length" symbols selected)
		if (checked_storage_symbols.symbols.length <= latest_symbols.length)
			latest_amount = checked_storage_symbols.symbols.length - 1;
		else
			latest_amount = latest_symbols.length;

		// check if current symbol appeared as one of previous "latest" flashcards
		for (var i=0; i<latest_amount; i++) {
			if (checked_storage_symbols.symbols[correct_answer_index].sy == latest_symbols[i]) {
				latest_flag = 1;
				break;
			}
		}

		check_latest = latest_flag;
	}


	// shift latest_symbols[]
	latest_symbols[0] = latest_symbols[1];
	latest_symbols[1] = latest_symbols[2];
	latest_symbols[2] = checked_storage_symbols.symbols[correct_answer_index].sy;


	// set current flashcard
	if (flashcard_type == 1)
		var current_flashcard = checked_storage_symbols.symbols[correct_answer_index].sy;
	else if (flashcard_type == 2)
		var current_flashcard = checked_storage_symbols.symbols[correct_answer_index].ro;
 	else if (flashcard_type == 3) {
		var sound_path = "sounds/" + String(checked_storage_symbols.symbols[correct_answer_index].ro) + ".mp3";
		sound_path = sound_path.replace("*", "");
		sound_path = sound_path.replace("o/", "");

		soundManager.onready(function() {
			soundManager.createSound({
				id: "current_sound",
				url: sound_path
			});
			setTimeout(function() { soundManager.play("current_sound") }, 300);
		});

 		var current_flashcard = "" +
			"<img src='images/play.png' " +
			"	id='play_image' alt='play' " +
			"	onClick='soundManager.play(\"current_sound\");' />";
	}


	// output flashcard
	$("#flashcard_content").empty();
	$("#flashcard_content").append(current_flashcard);


	initializeAnswers();
}





// prepare answer boxes
function initializeAnswers() {
	var storage_symbols_length = storage_symbols.symbols.length;
	var checked_symbols_length = checked_storage_symbols.symbols.length;
	var answer_boxes = "";
	var answers = [], answers_ro = [], answers_sy = [], answers_tmp = [];
	var tmp_index = 0, checked_symbols_counter = 0, skip_flag = 0, different_sounds_count, i;
	var similar_check = 0, row_check = 0;

	// used in onAnswerBoxClick()
	// 1 => not answered yet
	// 0 => answered wrongly
	// 2 => answered correctly
	temp_correct_state = 1;


	// get different sounds count
	for (i=0; i<checked_symbols_length; i++) {
		if ($.inArray(checked_storage_symbols.symbols[i].ro, answers_tmp) == -1)
			answers_tmp.push(checked_storage_symbols.symbols[i].ro);
	}
	different_sounds_count = answers_tmp.length;


	// prepare the correct answer
	if (flashcard_type == 1)
		answers[0] = checked_storage_symbols.symbols[correct_answer_index].ro;
	else if (flashcard_type > 1)
		answers[0] = checked_storage_symbols.symbols[correct_answer_index].sy;


	// prepare wrong answers
	i = 1;
	while (i < $.cookie("difficulty")) {
		skip_flag = 0;

		// select similar kana for answers to increase difficulty
		if (($.cookie("difficulty") > 4) && (similar_check == 0)) {
			var similar_row = -1;
			similar_check = 1;

			// set the frequency (difficulty increase)
			if ($.cookie("difficulty") == 8)
				var frequency = 0.25;
			else
				var frequency = 0.65;

			// check if currecnt symbol has similar looking symbols
			for (var j=0; j<similar_kana.length; j++)
				for (var k=0; k<similar_kana[j].length; k++)
					if (checked_storage_symbols.symbols[correct_answer_index].sy == similar_kana[j][k])
						similar_row = j;

			// add similar answers to the answers pool
			if (similar_row != -1) {
				for (var j=0; j<similar_kana[similar_row].length; j++) {
					var tmp_similar_symbol = similar_kana[similar_row][j];

					for (var k=0; k<storage_symbols_length; k++) {
						if (storage_symbols.symbols[k].sy != checked_storage_symbols.symbols[correct_answer_index].sy) {
							if (storage_symbols.symbols[k].sy == tmp_similar_symbol) {
								if (Math.random() < frequency) {
									if (flashcard_type == 1)
										answers[i] = storage_symbols.symbols[k].ro;
									else if (flashcard_type > 1)
										answers[i] = storage_symbols.symbols[k].sy;

									i++;
								}
							}
						}
					}
				}
			}
		}


		// add symbols from the same row to the answers pool
		if (row_check == 0) {
			var tmp_row, tmp_set, tmp_type;
			row_check = 1;

			// set the frequency (difficulty increase)
			if ($.cookie("difficulty") == 8)
				var frequency = 0.4;
			else ($.cookie("difficulty") == 12)
				var frequency = 0.65;

			// find the row, set and type that the answer is located at
			for (var j=0; j<storage_symbols_length; j++) {
				if (storage_symbols.symbols[j].sy == checked_storage_symbols.symbols[correct_answer_index].sy) {
					tmp_type = storage_symbols.symbols[j].kt;
					tmp_set = storage_symbols.symbols[j].ks;
					tmp_row = storage_symbols.symbols[j].kr;
					break;
				}
			}

			// iterate through the same row and append as answers
			for (var j=0; j<storage_symbols_length; j++) {
				if (storage_symbols.symbols[j].kr == tmp_row) {
					if (storage_symbols.symbols[j].ks == tmp_set) {
						if (storage_symbols.symbols[j].kt == tmp_type) {
							if (Math.random() < frequency) {
								if (flashcard_type == 1)
									answers[i] = storage_symbols.symbols[j].ro;
								else if (flashcard_type > 1)
									answers[i] = storage_symbols.symbols[j].sy;

								// skip duplicate answers (same incorrect answer appearing twice)
								for (var k=0; k<i; k++)
									if (answers[i] == answers[k])
										skip_flag = 1;

								// skip empty symbol values
								if (answers[i] == "")
									skip_flag = 1;

								// if flashcard answer is unique, set next flashcard
								if (skip_flag == 0) {
									// check if symbol is "checked" or just in the same row
									for (var l=0; l<checked_symbols_length; l++) {
										if (answers[i] ==  checked_storage_symbols.symbols[l].ro) {
											checked_symbols_counter++;
											break;
										}
										if (answers[i] ==  checked_storage_symbols.symbols[l].sy) {
											checked_symbols_counter++;
											break;
										}
									}
									i++;
								}
								skip_flag = 0;
							}
						}
					}
				}
			}
		}


		// prepare incorrect answers if answers[i] is not an acceptable/valid answer
		if (checked_symbols_counter < (different_sounds_count-1)) {
			current_symbol_index = Math.floor(Math.random() * checked_symbols_length);

			answers_ro[i] = checked_storage_symbols.symbols[current_symbol_index].ro;
			answers_sy[i] = checked_storage_symbols.symbols[current_symbol_index].sy;
		}
		else {
			current_symbol_index = Math.floor(Math.random() * storage_symbols_length);

			answers_ro[i] = storage_symbols.symbols[current_symbol_index].ro;
			answers_sy[i] = storage_symbols.symbols[current_symbol_index].sy;
		}

		if (flashcard_type == 1)
			answers[i] = answers_ro[i];
		else if (flashcard_type > 1)
			answers[i] = answers_sy[i];


		// skip duplicate answers (same incorrect answer appearing twice)
		for (var j=0; j<i; j++)
			if (answers[i] == answers[j])
				skip_flag = 1;

		// skip same roumaji written in different kana type (hiragana/katakana)
		if ((flashcard_type > 1) && (skip_flag == 0))
			for (var j=0; j<i; j++)
				if (answers_ro[i] == answers_ro[j])
					skip_flag = 1;

		// skip empty symbol values
		if (answers[i] == "")
			skip_flag = 1;


		// if flashcard answer is unique, set next flashcard
		if (skip_flag == 0) {
			checked_symbols_counter++;
			i++;
		}
	}


	// trim answers[] and randomize answer positions
	answers.splice($.cookie("difficulty"), answers.length - $.cookie("difficulty"))
	answers = randomizeArrayIndexes(answers);


	// prepare correct and answer count information
	var correct_answers_count = storage_score.correct;
	var total_answers_count = storage_score.total;
	if (total_answers_count != 0)
		var success_rate_percentage = "(" + (correct_answers_count / total_answers_count * 100).toPrecision(4) + "%)";
	else
		var success_rate_percentage = "";


	// generate answers table and add success rate information to it
	var success_rate = "Success rate: " + correct_answers_count + "/" + total_answers_count + " " + success_rate_percentage;
	answer_boxes += "<table>" +
		"<tr><td id='score' class='answers_table_header' colspan='4'>" + success_rate + "</td></tr>";


	for (i=0; i<($.cookie("difficulty") / 4); i++) {
		answer_boxes += "<tr>";
		for (j=0; j<4; j++) {
			// set temporary answer
			if (flashcard_type == 1)
				tmp_answer = checked_storage_symbols.symbols[correct_answer_index].ro;
			else if (flashcard_type > 1)
				tmp_answer = checked_storage_symbols.symbols[correct_answer_index].sy;

			if (answers[tmp_index] == tmp_answer)
				var answer_id = "correct_answer";
			else {
				// get id's for wrong answers
				for (var k=0; k<storage_symbols.symbols.length; k++) {
					// for roumaji and voice flashcards
					if (answers[tmp_index] == storage_symbols.symbols[k].ro) {
						var answer_id = "" +
							"" + checked_storage_symbols.symbols[correct_answer_index].kt + "_" +
							"" + storage_symbols.symbols[k].ks + "_" +
							"" + storage_symbols.symbols[k].kr + "_" +
							"" + storage_symbols.symbols[k].kc;

						break;
					}
					// for kana flashcards
					else if (answers[tmp_index] == storage_symbols.symbols[k].sy) {
						var answer_id = "" +
							"" + storage_symbols.symbols[k].kt + "_" +
							"" + storage_symbols.symbols[k].ks + "_" +
							"" + storage_symbols.symbols[k].kr + "_" +
							"" + storage_symbols.symbols[k].kc;

						break;
					}
				}
			}

			answer_boxes += "" +
				"<td id='" + answer_id + "' onclick='onAnswerBoxClick(\"" + answer_id + "\");'>" +
				"" + answers[tmp_index] +
				"</td>";
			tmp_index++;
		}
		answer_boxes += "</tr>";
	}
	answer_boxes += "</table>";


	generateSuccessRatesTable();


	// output flashcard answers
	$("#flashcard_table").empty();
	$("#flashcard_table").append(answer_boxes);
}





// actions to execute on answering
function onAnswerBoxClick(answer_id) {
	// on answering correctly change box color and increase count
	if (answer_id == "correct_answer") {
		$("#" + answer_id).css('background-color', "#207947");

		// if the correct answer was the first choice increment both correct and total count
		if (temp_correct_state == 1) {
			for (var i=0; i<storage_symbols.symbols.length; i++) {
				if (storage_symbols.symbols[i].sy == checked_storage_symbols.symbols[correct_answer_index].sy) {
					if (flashcard_type == 1) {
						storage_symbols.symbols[i].ck++;
						storage_symbols.symbols[i].tk++;
					}
					else if (flashcard_type == 2) {
						storage_symbols.symbols[i].cr++;
						storage_symbols.symbols[i].tr++;
					}
					else if (flashcard_type == 3) {
						storage_symbols.symbols[i].cv++;
						storage_symbols.symbols[i].tv++;
					}

					storage_score.correct++;
					storage_score.total++;

					var symbol_key = symbolKey(i);
					var table_column = DBtableColumnName();

					incrementDBScoreValue(symbol_key, table_column + "c");
					incrementDBScoreValue(symbol_key, table_column + "t");

					temp_correct_state = 2;
					break;
				}
			}
		}
		// if the correct answer was not the first answer, go to next flashcard
		else
			temp_correct_state = 2;
	}
	// on answering incorrectly change box color and increase total count
	else {
		$("#" + answer_id).css('background-color', "#c32918");

		var table_column = DBtableColumnName();

		// increase total count (for flashcard symbol) only if answered wrongly on first try
		if (temp_correct_state == 1) {
			for (var i=0; i<storage_symbols.symbols.length; i++) {
				if (storage_symbols.symbols[i].sy == checked_storage_symbols.symbols[correct_answer_index].sy) {
					if (flashcard_type == 1)
						storage_symbols.symbols[i].tk++;
					else if (flashcard_type == 2)
						storage_symbols.symbols[i].tr++;
					else if (flashcard_type == 3)
						storage_symbols.symbols[i].tv++;

					var symbol_key = symbolKey(i);

					incrementDBScoreValue(symbol_key, table_column + "t");

					break;
				}
			}
		}

		// increase total count for the wrong answered symbol
		var table_column_split = table_column.split("_");

		// if flashcard is kana type, increase roumaji total
		if (table_column_split[1] == "ktr")
			table_column = table_column.replace("ktr", "rtk");
		// if flashcard is roumaji or voice type, increase kana total
		else {
			table_column = table_column.replace("rtk", "ktr");
			table_column = table_column.replace("vtk", "ktr");
		}

		incrementDBScoreValue(answer_id, table_column + "t");

		// increase total count (localstorage)
		var answer_id_split = answer_id.split("_");
		for (var i=0; i<storage_symbols.symbols.length; i++) {
			if (storage_symbols.symbols[i].kt == answer_id_split[0]) {
				if (storage_symbols.symbols[i].ks == answer_id_split[1]) {
					if (storage_symbols.symbols[i].kr == answer_id_split[2]) {
						if (storage_symbols.symbols[i].kc == answer_id_split[3]) {
							if (flashcard_type == 1)
								storage_symbols.symbols[i].tk++;
							else if (flashcard_type == 2)
								storage_symbols.symbols[i].tr++;
							else if (flashcard_type == 3)
								storage_symbols.symbols[i].tv++;
							break;
						}
					}
				}
			}
		}

		storage_score.total++;
		temp_correct_state = 0;
	}


	// save changes to storage_symbols_obj
	localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));
	localStorage.setItem("storage_score_obj", JSON.stringify(storage_score));


	// if answered correctly, set next flashcard
	if (temp_correct_state == 2) {
		if (flashcard_type == 3)
			soundManager.destroySound("current_sound");
		setTimeout(function() { setFlashcard() }, 1000);
	}
}





// randomize flashcard type for each flashcard
function randomizeFlashcardType() {
	var combination_sum = 0;

	if ($.cookie("flashcard_type_ktr") == 1)
		combination_sum += 1;
	if ($.cookie("flashcard_type_rtk") == 1)
		combination_sum += 2;
	if ($.cookie("flashcard_type_vtk") == 1)
		combination_sum += 4;


	// if user unchecked all kana types, set flashcard_type_ktr to 1
	if (combination_sum == 0)
		$.cookie("flashcard_type_ktr", 1)


	// randomly returns value 1, 2 or 3 based on selected kana flashcard types
	if (combination_sum == 2)
		flashcard_type = 2;
	if (combination_sum == 3)
		flashcard_type = Math.floor(Math.random() * 2) + 1;
	if (combination_sum == 4)
		flashcard_type = 3;
	if (combination_sum == 5)
		flashcard_type = Math.floor(Math.random() * 2) * 2 + 1;
	if (combination_sum == 6)
		flashcard_type = Math.floor(Math.random() * 2) + 2;
	if (combination_sum == 7)
		flashcard_type = Math.floor(Math.random() * 3) + 1;
}





// prepare and output succes rates for current flashcard
function generateSuccessRatesTable() {
	// prepare kana to roumaji score
	var correct_kana_count = checked_storage_symbols.symbols[correct_answer_index].ck;
	var total_kana_count = checked_storage_symbols.symbols[correct_answer_index].tk;

	if (total_kana_count != 0) {
		var kana_success_percentage = " (" + (correct_kana_count / total_kana_count * 100).toPrecision(4) + "%)";
		var kana_score = correct_kana_count + "/" + total_kana_count + kana_success_percentage;
	}
	else
		var kana_score = "not yet rated";


	// prepare roumaji to kana score
	var correct_roumaji_count = checked_storage_symbols.symbols[correct_answer_index].cr;
	var total_roumaji_count = checked_storage_symbols.symbols[correct_answer_index].tr;

	if (total_roumaji_count != 0) {
		var roumaji_succesd_percentage = " (" + (correct_roumaji_count / total_roumaji_count * 100).toPrecision(4) + "%)";
		var roumaji_score = correct_roumaji_count + "/" + total_roumaji_count + roumaji_succesd_percentage;
	}
	else
		var roumaji_score = "not yet rated";


	// prepare voice to kana score
	var correct_voice_count = checked_storage_symbols.symbols[correct_answer_index].cv;
	var total_voice_count = checked_storage_symbols.symbols[correct_answer_index].tv;

	if (total_voice_count != 0) {
		var voice_success_percentage = " (" + (correct_voice_count / total_voice_count * 100).toPrecision(4) + "%)";
		var voice_score = correct_voice_count + "/" + total_voice_count + voice_success_percentage;
	}
	else
		var voice_score = "not yet rated";


	// prepare average score
	var correct_average_count = correct_kana_count + correct_roumaji_count + correct_voice_count;
	var total_average_count = total_kana_count + total_roumaji_count + total_voice_count;

	if (total_average_count != 0) {
		var average_success_percentage = " (" + (correct_average_count / total_average_count * 100).toPrecision(4) + "%)";
		var average_score = correct_average_count + "/" + total_average_count + average_success_percentage;
	}
	else
		var average_score = "not yet rated";


	var success_rates_table = "" +
		"<table>" +
		"	<th>Kana to roumaji:</th>" +
		"		<tr><td>• " + kana_score + "</td></tr>" +
		"		<tr><td class='score_padding'></td></tr>" +
		"	<th>Roumaji to kana:</th>" +
		"		<tr><td>• " + roumaji_score + "</td></tr>" +
		"		<tr><td class='score_padding'></td></tr>" +
		"	<th>Voice to kana:</th>" +
		"		<tr><td>• " + voice_score + "</td></tr>" +
		"		<tr><td class='score_padding'></td></tr>" +
		"		<tr><td class='score_padding'></td></tr>" +
		"	<th>Average:</th>" +
		"		<tr><td>• " + average_score + "</td></tr>" +
		"</table>";


	$("#score_table_holder").empty();
	$("#score_table_holder").append(success_rates_table);
}





// calculate success rate (percentage) for single symbol
function calculateSuccessRate(index) {
	var correct_kana_count = checked_storage_symbols.symbols[index].ck;
	var total_kana_count = checked_storage_symbols.symbols[index].tk;

	var correct_roumaji_count = checked_storage_symbols.symbols[index].cr;
	var total_roumaji_count = checked_storage_symbols.symbols[index].tr;

	var correct_voice_count = checked_storage_symbols.symbols[index].cv;
	var total_voice_count = checked_storage_symbols.symbols[index].tv;


	var correct_average_count = correct_kana_count + correct_roumaji_count + correct_voice_count;
	var total_average_count = total_kana_count + total_roumaji_count + total_voice_count;


	// if symbol was answered at least once correctly
	if ((total_average_count > 0) && (correct_average_count != 0))
		var average_success_percentage = (correct_average_count / total_average_count).toPrecision(3);
	// if symbol has been answered at least once so far, but with zero success
	else if ((total_average_count > 0) && (correct_average_count == 0))
		var average_success_percentage = 0.01;
	// if symbol hasn't been answered yet
	else
		var average_success_percentage = 0;


	// upon reaching 0.9 it can considered that symbol has been practised
	// enough and doesn't need further prioritization
	if (average_success_percentage > 0.9)
		average_success_percentage = 1;


	return average_success_percentage;
}





// randomize array indexes (used to shuffle answers in answer table)
function randomizeArrayIndexes(my_array) {
	var i = my_array.length;

	while (--i) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp_i = my_array[i];
		var temp_j = my_array[j];
		my_array[i] = temp_j;
		my_array[j] = temp_i;
	}

	return my_array;
}





// prepare symbol key for database query
function symbolKey(index) {
	var row_name = "" +
		"" + storage_symbols.symbols[index].kt + "_" +
		"" + storage_symbols.symbols[index].ks + "_" +
		"" + storage_symbols.symbols[index].kr + "_" +
		"" + storage_symbols.symbols[index].kc;

	return row_name;
}





// prepare database column name for database query
function DBtableColumnName() {
	var column_name = "";
	if ($.cookie("difficulty") == 4)
		column_name += "b_";
	else if ($.cookie("difficulty") == 8)
		column_name += "i_";
	else if ($.cookie("difficulty") == 12)
		column_name += "a_";

	if (flashcard_type == 1)
		column_name += "ktr_";
	else if (flashcard_type == 2)
		column_name += "rtk_";
	else if (flashcard_type == 3)
		column_name += "vtk_";

	return column_name;
}





// check if at least one symbol is selected, if not - initialize first five hiragana symbols
function checkFlashcardAmount() {
	if (checked_storage_symbols.symbols.length == 0) {
		for (var i=0; i<5; i++)
			storage_symbols.symbols[i].se = 1;

		// save changes to storage_symbols_obj
		localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));

		// reinitialize
		setFlashcard();
	}
}






