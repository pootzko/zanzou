$(document).ready(function() {
	initializeLocalStorage();
	storage_symbols = JSON.parse(localStorage.getItem("storage_symbols_obj"));
	xml_data = fetchXML();

	initializeOptions();
});





// initialize stats selection options and generate the default table
function initializeOptions() {
	// set all checkboxes to default values
	$("#button_df4").attr('checked', true);
	$("#button_ktr").attr('checked', true);
	$("#button_kt1").attr('checked', true);
	$("#button_ks1").attr('checked', true);
	$("#kana_table").append(generateTable("hiragana", "monographs", "b_ktr_"));
}





// changes kana table type/set (on click)
function changeKanaTable() {
	// kana type selector
	if ($("#button_kt1").is(':checked'))
		var kana_type_selector = "hiragana";
	else if ($("#button_kt2").is(':checked'))
		var kana_type_selector = "katakana";

	// kana set selector
	if ($("#button_ks1").is(':checked'))
		var kana_set_selector = "monographs";
	else if ($("#button_ks2").is(':checked'))
		var kana_set_selector = "digraphs";
	else if ($("#button_ks3").is(':checked'))
		var kana_set_selector = "monographs_with_diacritics";
	else if ($("#button_ks4").is(':checked'))
		var kana_set_selector = "digraphs_with_diacritics";


	// difficulty selector
	if ($("#button_df4").is(':checked'))
		var difficulty_selector = "b_";
	else if ($("#button_df8").is(':checked'))
		var difficulty_selector = "i_";
	else if ($("#button_df12").is(':checked'))
		var difficulty_selector = "a_";

	// flashcard type selector
	if ($("#button_ktr").is(':checked'))
		var flashcard_type_selector = "ktr_";
	else if ($("#button_rtk").is(':checked'))
		var flashcard_type_selector = "rtk_";
	else if ($("#button_vtk").is(':checked'))
		var flashcard_type_selector = "vtk_";


	// on button selection change table
	var db_column_name_prefix = difficulty_selector + flashcard_type_selector;
	$("#kana_table").empty();
	$("#kana_table").append(generateTable(kana_type_selector, kana_set_selector, db_column_name_prefix));
}





// generate kana selected tables
function generateTable(kana_type, kana_set, db_column_name_prefix) {
	var rows, columns, column_prefixes, row_prefixes, symbols, table_header_row;
	var checkbox_id, correct_answers, total_answers, success_rate, tooltip_info;
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
		checkbox_id = checkbox_id_prefix + "10_0";
		correct_answers = $("symbols symbol[key=" + checkbox_id + "]", xml_data).find(db_column_name_prefix + "c").text();
		total_answers = $("symbols symbol[key=" + checkbox_id + "]", xml_data).find(db_column_name_prefix + "t").text();

		if (total_answers == 0)
			success_rate = 0;
		else
			success_rate = ((correct_answers / total_answers) * 100).toPrecision(3);

		tooltip_info = "<b>Correct:</b> " + correct_answers + "<br /><b>Total:</b> " + total_answers;

		n_symbol = "<b>" + symbols[10][0][k] + "</b> <span class='symbol_info'>(" + success_rate + "%)</span>";
		special = "" +
			"<tr class='table_symbol'>" +
			"	<td class='table_prefix'></td>" +
			"	<td></td><td></td><td " +
			"	class='stats_td' onMouseOver='toolTip(\"" + tooltip_info + "\", 125);' onMouseOut='toolTip();'>" + n_symbol +
			"	</td><td></td><td></td>" +
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
		table_header_row += "<th class='stats_th'>" + column_prefixes[i] + "</th>";
	table_header_row += "</tr>";
	table_content += table_header_row;

	// table content
	for (i=0; i<rows; i++) {
		// table header column
		table_content += "<tr class='table_symbol'><td class='table_prefix'>" + row_prefixes[i] + "</td>";

		// table content
		for (j=0; j<columns; j++) {
			checkbox_id = checkbox_id_prefix + i + "_" + j;

			correct_answers = $("symbols symbol[key=" + checkbox_id + "]", xml_data).find(db_column_name_prefix + "c").text();
			total_answers = $("symbols symbol[key=" + checkbox_id + "]", xml_data).find(db_column_name_prefix + "t").text();

			if (total_answers == 0)
				success_rate = 0;
			else
				var success_rate = ((correct_answers / total_answers) * 100).toPrecision(3);

			tooltip_info = "<b>Correct:</b> " + correct_answers + "<br /><b>Total:</b> " + total_answers;

			table_content += "<td class='stats_td' ";
			if (symbols[i][j][k] != "") {
				table_content += "" +
					"onMouseOver='toolTip(\"" + tooltip_info + "\", 125);' onMouseOut='toolTip();'>" +
					"<b>" + symbols[i][j][k] + "</b> <span class='symbol_info'>(" + success_rate + "%)</span>";
			}
			else
				table_content += ">";

			table_content += "</td>";
		}
		table_content += "</tr>";
	}

	// append special symbols if they exist in current kana_set
	if (kana_set == "monographs")
		table_content += special;


	return table_content += "</table>";
}








