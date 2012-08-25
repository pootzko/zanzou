function incrementDBScoreValue(symbol_key, table_column) {
	$.ajax({
		type: "POST",
		url:  "handler.php",
		data: "method=IncrementScoreValue&symbol_key=" + symbol_key + "&table_column=" + table_column,
		dataType: "text",
		success: function(text) {
		}
	});
}
