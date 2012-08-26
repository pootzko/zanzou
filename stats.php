<?php require 'head.php'; ?>

<script type="text/javascript" src="javascript_libs/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="javascript_libs/jquery.cookie.js"></script>
<script type="text/javascript" src="localstorage.js"></script>
<script type="text/javascript" src="cookie.js"></script>
<script type="text/javascript" src="database.js"></script>
<script type="text/javascript" src="kana.js"></script>
<script type="text/javascript" src="stats.js"></script>

<?php
require 'header.php';
require 'navigation.php';
?>



<h2>Stats</h2>
<div id="content"> <!-- CONTENT -->

	<div id="practise_options">
		<form action="">
			<input type="radio" name="difficulty" value="beginner" id="button_df4" onclick="changeKanaTable();" /> Beginner
			<input type="radio" name="difficulty" value="intermediate" id="button_df8" onclick="changeKanaTable();" /> Intermediate
			<input type="radio" name="difficulty" value="advanced" id="button_df12" onclick="changeKanaTable();" /> Advanced
		</form>
		<form action="">
			<input type='radio' name="flashcard_type" value="kana_to_roumaji" id="button_ktr" onclick="changeKanaTable();" /> Kana to roumaji
			<input type='radio' name="flashcard_type" value="roumaji_to_kana" id="button_rtk" onclick="changeKanaTable();" /> Roumaji to kana
			<input type='radio' name="flashcard_type" value="voice_to_kana" id="button_vtk" onclick="changeKanaTable();" /> Voice to kana
		</form>
		<form action="">
			<input type="radio" name="kana_type" value="hiragana" id="button_kt1" onclick="changeKanaTable();" /> Hiragana
			<input type="radio" name="kana_type" value="katakana" id="button_kt2" onclick="changeKanaTable();" /> Katakana
		</form>
		<form action="">
			<input type="radio" name="kana_set" value="monographs" id="button_ks1" onclick="changeKanaTable();" /> Monographs
			<input type="radio" name="kana_set" value="digraphs" id="button_ks2" onclick="changeKanaTable();" /> Digraphs
			<input type="radio" name="kana_set" value="monographs_with_diacritics" id="button_ks3" onclick="changeKanaTable();" /> Monographs with diacritics
			<input type="radio" name="kana_set" value="digraphs_with_diacritics" id="button_ks4" onclick="changeKanaTable();" /> Digraphs with diacritics
		</form>
	</div>

	<div id="kana_table_holder">
		<div id="kana_table"></div>
	</div>

</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>




