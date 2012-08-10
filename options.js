//
// CHECKBOX-evima DODATI FORM TAGOVE
//



$(document).ready(function() {
	// default values
	var kana_type_selector = "hiragana";
	var kana_set_selector = "monographs";

	// default radio buttons
	$("#button_kt1").attr('checked', 'checked');
	$("#button_ks1").attr('checked', 'checked');
	$("#kana_table").append(generateTable(kana_type_selector, kana_set_selector));



	// kana table type/set selector
	$("input[type=radio]").on('click', function(){
		// kana type selector
		if ($('#button_kt1').is(':checked'))
			var kana_type_selector = "hiragana";
		else if ($('#button_kt2').is(':checked'))
			var kana_type_selector = "katakana";

		// kana set selector
		if ($('#button_ks1').is(':checked'))
			var kana_set_selector = "monographs";
		else if ($('#button_ks2').is(':checked'))
			var kana_set_selector = "digraphs";
		else if ($('#button_ks3').is(':checked'))
			var kana_set_selector = "monographs_with_diacritics";
		else if ($('#button_ks4').is(':checked'))
			var kana_set_selector = "digraphs_with_diacritics";

		// on button selection change table
		$("#kana_table").empty();
		$("#kana_table").append(generateTable(kana_type_selector, kana_set_selector));
	});
});





function generateTable(kana_type, kana_set) {
	var monograph_column_prefixes = ["a", "i", "u", "e", "o"];
	var monograph_row_prefixes = ["∅", "K", "S", "T", "N", "H", "M", "Y", "R", "W"];

	var digraphs_column_prefixes = ["ya", "yu", "yo"];
	var digraphs_row_prefixes = ["K", "S", "T", "N", "H", "M", "R"];

	var monographs_with_diacritics_column_prefixes = ["a", "i", "u", "e", "o"];
	var monographs_with_diacritics_row_prefixes = ["G", "Z", "D", "B", "P"];

	var digraphs_with_diacritics_column_prefixes = ["ya", "yu", "yo"];
	var digraphs_with_diacritics_row_prefixes = ["G", "Z", "D", "B", "P"];

	var rows, columns, column_prefixes, row_prefixes, symbols, special = "";
	var table_header_row, table_header_column;
	var table_content = "<table>";



	// set kana type
	if (kana_type == "hiragana")
		var k = 1;
	else
		var k = 2;



	// set kana set
	if (kana_set == "monographs") {
		rows = 10;
		columns = 5;
		column_prefixes = monograph_column_prefixes;
		row_prefixes = monograph_row_prefixes;
		symbols = monographs;

		// "n" symbol
		special = "" +
			"<tr class='table_symbol'>" +
			"	<td class='table_prefix'></td>" +
			"	<td></td><td></td><td>" +
			"		<input type='checkbox' />" + "<b>" + symbols[10][0][k] + "</b> (" + symbols[10][0][0] + ")" +
			"	</td><td></td><td></td>" +
			"	<td class='row_checkbox'>" +
			"		<input type='checkbox' />" +
			"	</td>" +
			"</tr>";
	}
	else if (kana_set == "digraphs") {
		rows = 7;
		columns = 3;
		column_prefixes = digraphs_column_prefixes;
		row_prefixes = digraphs_row_prefixes;
		symbols = digraphs;
	}
	else if (kana_set == "monographs_with_diacritics") {
		rows = 5;
		columns = 5;
		column_prefixes = monographs_with_diacritics_column_prefixes;
		row_prefixes = monographs_with_diacritics_row_prefixes;
		symbols = monographs_with_diacritics;

		// "vu" symbol
		if (kana_type == "hiragana") {
			special = "" +
				"<tr class='table_symbol'>" +
				"	<td class='table_prefix'></td>" +
				"	<td></td><td></td><td>" +
				"		<input type='checkbox' />" + "<b>" + symbols[5][0][k] + "</b> (" + symbols[5][0][0] + ")" +
				"	</td><td></td><td></td>" +
				"	<td class='row_checkbox'>" +
				"		<input type='checkbox' />" +
				"	</td>" +
				"</tr>";
		}
	}
	else if (kana_set == "digraphs_with_diacritics") {
		rows = 5;
		columns = 3;
		column_prefixes = digraphs_with_diacritics_column_prefixes;
		row_prefixes = digraphs_with_diacritics_row_prefixes;
		symbols = digraphs_with_diacritics;
	}
	else
		alert("error: wrong kana set");



	// populate table with kana
	// create table header row
	table_header_row = "<tr><td class='empty_box'></td>";
	for (i=0; i<columns; i++)
		table_header_row += "<th>" + column_prefixes[i] + "</th>";
	table_header_row += "</tr>";
	table_content += table_header_row;

	// table content
	for (i=0; i<rows; i++) {
		// table header column
		table_content += "<tr class='table_symbol'><td class='table_prefix'>" + row_prefixes[i] + "</td>";

		// table content
		for (j=0; j<columns; j++) {
			table_content += "<td>";
			if (symbols[i][j][k] != "")
				table_content += "<input type='checkbox' /><b>" + symbols[i][j][k] + "</b> (" + symbols[i][j][0] + ")";
			table_content += "</td>";
		}

		// select-whole-row checkboxes
		table_content += "<td class='row_checkbox'><input type='checkbox' /></td></tr>";
	}

	// special symbols
	if (special != "")
		table_content += special;



	return table_content += "</table>";
}