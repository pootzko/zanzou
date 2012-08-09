function generateTable() {
	var table_content = "<table border=\"1\">";

	for(i=0; i<10; i++) {
		table_content += "<tr>";

		for(j=0; j<5; j++) {
			table_content += "<td>";
			if (monographs[i][j][1] != "")
				table_content += monographs[i][j][1] + " (" + monographs[i][j][0] + ")";
			table_content += "</td>";
		}

		table_content += "</tr>";
	}

	return table_content += "</table>";
}