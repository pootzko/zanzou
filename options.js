function generateTable(kana_type, kana_set) {
	var table_content = "<table>";
	var monograph_prefixes = ["∅", "K", "S", "T", "N", "H", "M", "Y", "R", "W"]

	// set kana type
	if (kana_type == "hiragana")
		var k = 1;
	else
		var k = 2;


	// populate table with kana
	if (kana_set == "monographs") {
		table_content += "<tr><td class='empty_boxes'></td><th>a</th><th>i</th><th>u</th><th>e</th><th>o</th></tr>";

		for (i=0; i<10; i++) {
			table_content += "<tr class='table_symbols'><td class='table_prefixes'><input type='checkbox' />" + monograph_prefixes[i] + "</td>";

			for (j=0; j<5; j++) {
				table_content += "<td>";
				if (monographs[i][j][k] != "")
					table_content += "<input type='checkbox' /><b>" + monographs[i][j][k] + "</b> (" + monographs[i][j][0] + ")";
				table_content += "</td>";
			}

			table_content += "</tr>";
		}
		table_content += "<tr class='table_symbols'><td class='table_prefixes'></td><td colspan='5'><input type='checkbox' /><b>"
			+ monographs[10][0][k] + "</b> (" + monographs[10][0][0] + ")</td></tr>";
	}

	return table_content += "</table>";
}

/*   class='table_symbols'   */