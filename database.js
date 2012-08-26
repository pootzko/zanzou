// on answering, increment total and/or correct value in DB
function incrementDBScoreValue(symbol_key, table_column) {
	$.ajax({
		type: "POST",
		url:  "handler.php",
		data: "method=IncrementScoreValue&symbol_key=" + symbol_key + "&table_column=" + table_column,
		dataType: "text",
		success: function(text) {
			console.log("stored: " + symbol_key + " " + table_column);
		}
	});
}



// fetch DB values as XML
function fetchXML() {
	var xml;

	$.ajax({
		type: "POST",
		url:  "handler.php",
		data: "method=FetchXML",
		dataType: "xml",
		async: false,
		success: function(data) {
			xml = data;
		}
	});

	return xml;
}