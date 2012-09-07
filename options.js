$(document).ready(function() {
	initializeLocalStorage();
	storage_symbols = JSON.parse(localStorage.getItem("storage_symbols_obj"));

	initializeOptions();
});





// initialize option values from cookie
function initializeOptions() {
	var difficulty_id = "#button_df" + $.cookie("difficulty");
	var kana_type_selector = $.cookie("kana_type");
	var kana_set_selector = $.cookie("kana_set");


	// set flaschard type tmp true/false values
	if ($.cookie("flashcard_type_ktr") == 1)
		var tmp_ktr_value = true;
	else
		var tmp_ktr_value = false;

	if ($.cookie("flashcard_type_rtk") == 1)
		var tmp_rtk_value = true;
	else
		var tmp_rtk_value = false

	if ($.cookie("flashcard_type_vtk") == 1)
		var tmp_vtk_value = true;
	else
		var tmp_vtk_value = false


	// set difficulty radio button
	$(difficulty_id).attr('checked', true);

	// set kana flashcard type checkboxes
	$("#button_ktr").attr('checked', tmp_ktr_value);
	$("#button_rtk").attr('checked', tmp_rtk_value);
	$("#button_vtk").attr('checked', tmp_vtk_value);

	// set kana table type
	$("#button_" + kana_type_selector).attr('checked', true);
	$("#button_" + kana_set_selector).attr('checked', true);
	$("#kana_table").append(generateTable(kana_type_selector, kana_set_selector));

	initializeTableCheckboxes();
}





// change difficulty cookie values
function changeDifficulty(difficulty_value) {
	$.cookie("difficulty", difficulty_value);
}





// set flashcard types to be used in testing
function setFlashcardTypes(tmp_flashcard_id) {
	if (tmp_flashcard_id == 1) {
		var tmp_value = $.cookie("flashcard_type_ktr") * (-1) + 1;
		$.cookie("flashcard_type_ktr", tmp_value);
	}
	if (tmp_flashcard_id == 2) {
		var tmp_value = $.cookie("flashcard_type_rtk") * (-1) + 1;
		$.cookie("flashcard_type_rtk", tmp_value);
	}
	if (tmp_flashcard_id == 3) {
		var tmp_value = $.cookie("flashcard_type_vtk") * (-1) + 1;
		$.cookie("flashcard_type_vtk", tmp_value);
	}
}





// changes kana table type/set (on click)
function changeKanaTable() {
	// kana type selector
	if ($("#button_hiragana").is(':checked'))
		var kana_type_selector = "hiragana";
	else if ($("#button_katakana").is(':checked'))
		var kana_type_selector = "katakana";

	// kana set selector
	if ($("#button_monographs").is(':checked'))
		var kana_set_selector = "monographs";
	else if ($("#button_digraphs").is(':checked'))
		var kana_set_selector = "digraphs";
	else if ($("#button_monographs_with_diacritics").is(':checked'))
		var kana_set_selector = "monographs_with_diacritics";
	else if ($("#button_digraphs_with_diacritics").is(':checked'))
		var kana_set_selector = "digraphs_with_diacritics";


	// on button selection change table
	$("#kana_table").empty();
	$("#kana_table").append(generateTable(kana_type_selector, kana_set_selector));

	// set kana table position cookie values
	$.cookie("kana_type", kana_type_selector);
	$.cookie("kana_set", kana_set_selector);

	initializeTableCheckboxes();
}





// sets kana table position cookie values
function rememberKanaTablePosition(kana_type_selector, kana_set_selector) {
	if (kana_type_selector == "hiragana")
		$.cookie("kana_type", 0);
	else if (kana_type_selector == "katakana")
		$.cookie("kana_type", 1);

	if (kana_set_selector == "monograps")
		$.cookie("kana_set", 0);
	else if (kana_set_selector == "digraphs")
		$.cookie("kana_set", 1);
	else if (kana_set_selector == "monographs_with_diacritics")
		$.cookie("kana_set", 2);
	else if (kana_set_selector == "digraphs_with_diacritics")
		$.cookie("kana_set", 3);
}





// generate kana selected tables
function generateTable(kana_type, kana_set) {
	var rows, columns, column_prefixes, row_prefixes, symbols, table_header_row;
	var checkbox_id_prefix = "";
	var table_content = "<table>";



	// set kana type and checkbox ID prefix (kana_type part)
	if (kana_type == "hiragana") {
		var k = 1;
		checkbox_id_prefix = "h_";
	}
	else {
		var k = 2;
		checkbox_id_prefix = "k_";
	}



	// set kana set and checkbox ID prefix (kana_set part)
	if (kana_set == "monographs") {
		column_prefixes = ["a", "i", "u", "e", "o"];
		row_prefixes = ["∅", "K", "S", "T", "N", "H", "M", "Y", "R", "W"];
		rows = 10;
		columns = 5;
		symbols = monographs;
		checkbox_id_prefix += "mon_";

		// "n" symbol
		n_symbol = "<b>" + symbols[10][0][k] + "</b> <span class='symbol_info'>(" + symbols[10][0][0] + ")</span>";
		special = "" +
			"<tr class='table_symbol'>" +
			"	<td class='table_prefix'></td>" +
			"	<td></td><td></td><td class='options_td'>" +
			"		<input type='checkbox'" +
			"			name='" + kana_set + "'" +
			"			value='" + checkbox_id_prefix + "10_0'" +
			"			id='" + checkbox_id_prefix + "10_0'" +
			"			onclick='changeCheckboxState(\"" + checkbox_id_prefix + "10_0\")'/>" + n_symbol +
			"	</td><td></td><td></td>" +
			"	<td class='row_checkbox'>" +
			"		<a href='javascript:;'" +
			"		onclick='changeCheckboxRowState(\"" + checkbox_id_prefix + 10 + "_row_" + columns + "\");" +
			"		return false;'>&#10004;</a>" +
			"	</td>" +
			"</tr>";
	}
	else if (kana_set == "digraphs") {
		column_prefixes = ["ya", "yu", "yo"];
		row_prefixes = ["K", "S", "T", "N", "H", "M", "R"];
		rows = 7;
		columns = 3;
		symbols = digraphs;
		checkbox_id_prefix += "dig_";
	}
	else if (kana_set == "monographs_with_diacritics") {
		column_prefixes = ["a", "i", "u", "e", "o"];
		row_prefixes = ["G", "Z", "D", "B", "P"];
		rows = 5;
		columns = 5;
		symbols = monographs_with_diacritics;
		checkbox_id_prefix += "mwd_";
	}
	else if (kana_set == "digraphs_with_diacritics") {
		column_prefixes = ["ya", "yu", "yo"];
		row_prefixes = ["G", "Z", "D", "B", "P"];
		rows = 5;
		columns = 3;
		symbols = digraphs_with_diacritics;
		checkbox_id_prefix += "dwd_";
	}
	else
		alert("error: wrong kana set");



	// populate table with kana
	// create table header row
	table_header_row = "<tr><td class='empty_box'></td>";
	for (i=0; i<columns; i++)
		table_header_row += "<th>" + column_prefixes[i] + "</th>";
	table_header_row += "" +
		"<td class='row_checkbox'><a href='javascript:;'" +
		"onclick='changeCheckboxTableState(\"" + checkbox_id_prefix + "table_" + rows + "_" + columns + "\");" +
		"return false;'>&#10004;</a></td>";
	table_header_row += "</tr>";
	table_content += table_header_row;

	// table content
	for (i=0; i<rows; i++) {
		// table header column
		table_content += "<tr class='table_symbol'><td class='table_prefix'>" + row_prefixes[i] + "</td>";

		// table content
		for (j=0; j<columns; j++) {
			var checkbox_id = checkbox_id_prefix + i + "_" + j;

			table_content += "<td class='options_td'>";
			if (symbols[i][j][k] != "") {
				var symbol = "<b>" + symbols[i][j][k] + "</b> <span class='symbol_info'>(" + symbols[i][j][0] + ")</span>";
				table_content += "" +
					"<input type='checkbox'" +
					"	name='" + kana_set + "'" +
					"	value='" + checkbox_id + "'" +
					"	id='" + checkbox_id + "'" +
					"	onclick='changeCheckboxState(\"" + checkbox_id + "\")'/>" + symbol;
			}
			table_content += "</td>";
		}

		// select-whole-row checkboxes
		table_content += ""+
			"<td class='row_checkbox'>" +
			"	<a href='javascript:;'" +
			"	onclick='changeCheckboxRowState(\"" + checkbox_id_prefix + i + "_row_" + columns + "\");" +
			"	return false;'>&#10004;</a>" +
			"</td></tr>";
	}

	// append special symbols if they exist in current kana_set
	if (kana_set == "monographs")
		table_content += special;


	return table_content += "</table>";
}





// check/uncheck selected checkboxes
function initializeTableCheckboxes() {
	for (i=0; i<storage_symbols.symbols.length; i++) {
		var checkbox_id = "#";

		// kana_type prefix
		checkbox_id += storage_symbols.symbols[i].kt + "_";
		// kana_set prefix
		checkbox_id += storage_symbols.symbols[i].ks + "_";
		// auto-check checkboxes
		checkbox_id += storage_symbols.symbols[i].kr + "_" + storage_symbols.symbols[i].kc;


		// check set symbols, and uncheck unset symbols
		if (storage_symbols.symbols[i].se == 1)
			$(checkbox_id).attr('checked', true);
		else
			$(checkbox_id).attr('checked', false);
	}
}





// change single-checkbox state on click
function changeCheckboxState(this_id) {
	var temp_id = this_id.split("_");


	// change the "check" state of single symbol
	for (var i=0; i<storage_symbols.symbols.length; i++)
		if (storage_symbols.symbols[i].kt == temp_id[0])
			if (storage_symbols.symbols[i].ks == temp_id[1])
				if (storage_symbols.symbols[i].kr == temp_id[2])
					if (storage_symbols.symbols[i].kc == temp_id[3]) {
						if (storage_symbols.symbols[i].se == 0)
							storage_symbols.symbols[i].se = 1;
						else if (storage_symbols.symbols[i].se == 1)
							storage_symbols.symbols[i].se = 0;
						break;
					}

	// save changes to storage_symbols_obj
	localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));
}





// change checkbox-row state on click
function changeCheckboxRowState(this_id) {
	// temp_id model: kana_type, kana_set, row, "row", columns
	var temp_id = this_id.split("_");
	var temp_state = 0, new_state;


	// check if any checkbox in row are checked
	for (var i=0; i<temp_id[4]; i++)
		for (var j=0; j<storage_symbols.symbols.length; j++)
			if (storage_symbols.symbols[j].kt == temp_id[0])
				if (storage_symbols.symbols[j].ks == temp_id[1])
					if (storage_symbols.symbols[j].kr == temp_id[2])
						if (storage_symbols.symbols[j].kc == i)
							if (storage_symbols.symbols[j].se == 1)
								temp_state = 1;


	// set next state
	if (temp_state == 1)
		new_state = 0;
	else
		new_state = 1;


	// set new states to all symbols
	for (var i=0; i<temp_id[4]; i++)
		for (var j=0; j<storage_symbols.symbols.length; j++)
			if (storage_symbols.symbols[j].kt == temp_id[0])
				if (storage_symbols.symbols[j].ks == temp_id[1])
					if (storage_symbols.symbols[j].kr == temp_id[2])
						if (storage_symbols.symbols[j].kc == i)
							if (storage_symbols.symbols[j].se != null)
								storage_symbols.symbols[j].se = new_state;


	// save changes to storage_symbols_obj
	localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));


	initializeTableCheckboxes();
}





// change checkbox-table state on click
function changeCheckboxTableState(this_id) {
	// temp_id model: kana_type, kana_set, "table", rows, columns
	var temp_id = this_id.split("_");
	var temp_state = 0, new_state;


	// check if any checkboxes in table are checked
	for (var i=0; i<temp_id[3]; i++)
		for (var j=0; j<temp_id[4]; j++)
			for (var k=0; k<storage_symbols.symbols.length; k++) {
				if (temp_state == 1)
					break;

				// for all symbols except "n"
				if (storage_symbols.symbols[k].kt == temp_id[0])
					if (storage_symbols.symbols[k].ks == temp_id[1])
						if (storage_symbols.symbols[k].kr == i)
							if (storage_symbols.symbols[k].kc == j)
								if (storage_symbols.symbols[k].se == 1)
									temp_state = 1;

				// for "n" symbol
				if (storage_symbols.symbols[k].kt == temp_id[0])
					if ((temp_id[1] == "mon") && (storage_symbols.symbols[k].ks == "mon"))
						if (storage_symbols.symbols[k].kr == 10)
							if (storage_symbols.symbols[k].se == 1)
								temp_state = 1;
			}


	// set next state
	if (temp_state == 1)
		new_state = 0;
	else
		new_state = 1;


	// set new states to all symbols
	for (var i=0; i<temp_id[3]; i++)
		for (var j=0; j<temp_id[4]; j++)
			for (var k=0; k<storage_symbols.symbols.length; k++) {
				// for all symbols except "n"
				if (storage_symbols.symbols[k].kt == temp_id[0])
					if (storage_symbols.symbols[k].ks == temp_id[1])
						if (storage_symbols.symbols[k].kr == i)
							if (storage_symbols.symbols[k].kc == j)
								if (storage_symbols.symbols[k].se != null)
									storage_symbols.symbols[k].se = new_state;

				// for "n" symbol
				if (storage_symbols.symbols[k].kt == temp_id[0])
					if ((temp_id[1] == "mon") && (storage_symbols.symbols[k].ks == "mon"))
						if (storage_symbols.symbols[k].kr == 10)
							storage_symbols.symbols[k].se = new_state;
			}


	// save changes to storage_symbols_obj
	localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));


	initializeTableCheckboxes();
}
