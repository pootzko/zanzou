function generateTable() {
	var table_content = "<table border=\"1\">";

	for(i=0; i<10; i++) {
		table_content += "<tr>";

		for(j=0; j<5; j++) {
			table_content += "<td>" + hiragana_monograhps[i][j] + "</td>";
		}

		table_content += "</tr>";
	}

	return table_content += "</table>";
}