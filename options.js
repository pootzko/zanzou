$(document).ready(function() {
	initializeLocalStorage();
	storage_symbols = JSON.parse(localStorage.getItem("storage_symbols_obj"));

	// default values
	var kana_type_selector = "hiragana";
	var kana_set_selector = "monographs";

	// default radio buttons
	$("#button_df1").attr('checked', true);
	$("#button_kt1").attr('checked', true);
	$("#button_ks1").attr('checked', true);
	$("#kana_table").append(generateTable(kana_type_selector, kana_set_selector));

	initializeCheckboxes();



	// kana table type/set selector (change on click)
	$("input[type='radio']").on('click', function(){
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

		// on button selection change table
		$("#kana_table").empty();
		$("#kana_table").append(generateTable(kana_type_selector, kana_set_selector));

		initializeCheckboxes();
	});
});





function generateTable(kana_type, kana_set) {
	var rows, columns, column_prefixes, row_prefixes, symbols, special = "";
	var table_header_row, table_header_column;
	var checkbox_id_prefix = "";;
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
		monograph_column_prefixes = ["a", "i", "u", "e", "o"];
		monograph_row_prefixes = ["∅", "K", "S", "T", "N", "H", "M", "Y", "R", "W"];
		rows = 10;
		columns = 5;
		column_prefixes = monograph_column_prefixes;
		row_prefixes = monograph_row_prefixes;
		symbols = monographs;
		checkbox_id_prefix += "mon_";

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
		digraphs_column_prefixes = ["ya", "yu", "yo"];
		digraphs_row_prefixes = ["K", "S", "T", "N", "H", "M", "R"];
		rows = 7;
		columns = 3;
		column_prefixes = digraphs_column_prefixes;
		row_prefixes = digraphs_row_prefixes;
		symbols = digraphs;
		checkbox_id_prefix += "dia_";
	}
	else if (kana_set == "monographs_with_diacritics") {
		monographs_with_diacritics_column_prefixes = ["a", "i", "u", "e", "o"];
		monographs_with_diacritics_row_prefixes = ["G", "Z", "D", "B", "P"];
		rows = 5;
		columns = 5;
		column_prefixes = monographs_with_diacritics_column_prefixes;
		row_prefixes = monographs_with_diacritics_row_prefixes;
		symbols = monographs_with_diacritics;
		checkbox_id_prefix += "mwd_";

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
		digraphs_with_diacritics_column_prefixes = ["ya", "yu", "yo"];
		digraphs_with_diacritics_row_prefixes = ["G", "Z", "D", "B", "P"];
		rows = 5;
		columns = 3;
		column_prefixes = digraphs_with_diacritics_column_prefixes;
		row_prefixes = digraphs_with_diacritics_row_prefixes;
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
	table_header_row += "</tr>";
	table_content += table_header_row;

	// table content
	for (i=0; i<rows; i++) {
		// table header column
		table_content += "<tr class='table_symbol'><td class='table_prefix'>" + row_prefixes[i] + "</td>";

		// table content
		for (j=0; j<columns; j++) {
			var checkbox_id = checkbox_id_prefix + i + "_" + j;
			//console.log(checkbox_id);

			table_content += "<td>";
			if (symbols[i][j][k] != "")
				table_content += "" +
					"<input type='checkbox' name='" + kana_set +
						"' value='" + checkbox_id +
						"' id='" + checkbox_id +
						"' onclick='changeCheckboxState(\"" + checkbox_id + "\")'/>" +
					"<b>" + symbols[i][j][k] + "</b> (" + symbols[i][j][0] + ")";
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





function initializeCheckboxes() {
	for (i=0; i<storage_symbols.symbols.length; i++) {
		var checkbox_id = "#";

		if (storage_symbols.symbols[i].se == 1) {
			// kana_type prefix
			checkbox_id += storage_symbols.symbols[i].kt + "_";

			// kana_set prefix
			checkbox_id += storage_symbols.symbols[i].ks + "_";

			// auto-check checkboxes
			checkbox_id += storage_symbols.symbols[i].kr + "_" + storage_symbols.symbols[i].kc;
			$(checkbox_id).attr('checked', true);
		}
	}
}





function changeCheckboxState(this_id) {
	var temp_id = this_id.split("_");

	for (i=0; i<storage_symbols.symbols.length; i++)
		if (storage_symbols.symbols[i].kt == temp_id[0])
			if (storage_symbols.symbols[i].ks == temp_id[1])
				if (storage_symbols.symbols[i].kr == temp_id[2])
					if (storage_symbols.symbols[i].kc == temp_id[3]) {
						if (storage_symbols.symbols[i].se == 0)
							storage_symbols.symbols[i].se = 1;
						else
							storage_symbols.symbols[i].se = 0;
						//console.log(storage_symbols.symbols[i].se);
					}
}