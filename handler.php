<?php
require 'database.php';
$zanzou_db_obj = new ZanzouDB();

$method = $_POST['method'];



// set session variables
if ($method == "IncrementScoreValue") {
	$symbol_key = $_POST['symbol_key'];
	$table_column = $_POST['table_column'];

	$zanzou_db_obj->IncrementScoreValue($symbol_key, $table_column);
}

// fetch XML for "stats" page
if ($method == "FetchXML") {
	$zanzou_db_obj->GenerateXML();
}
?>

