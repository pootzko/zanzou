<?php require 'head.php'; ?>

<script type="text/javascript" src="lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="lib/jquery.cookie.js"></script>
<script type="text/javascript" src="localstorage.js"></script>
<script type="text/javascript" src="cookie.js"></script>
<script type="text/javascript" src="options.js"></script>
<script type="text/javascript" src="kana.js"></script>

<?php
require 'header.php';
require 'navigation.php';
?>



<h2>Options</h2>
<div id="content"> <!-- CONTENT -->
	<div id="practice_options">
		<h3>Difficulty</h3>
		<p>
			<b>• Beginner</b> - 4 possible answers, no symbols will be prioritized as possible answers over other symbols<br />
			<b>• Intermediate</b> - 8 possible answers, prioritize similar looking kana symbols and symbols from the same row<br />
			<b>• Advanced</b> - 12 possible answers, prioritization effect incresed
		</p>
		<!-- difficulty selector -->
		<form action="">
			<input type="radio" name="difficulty" value="beginner" id="button_df4" onclick="changeDifficulty(4);" /> Beginner
			<input type="radio" name="difficulty" value="intermediate" id="button_df8" onclick="changeDifficulty(8);" /> Intermediate
			<input type="radio" name="difficulty" value="advanced" id="button_df12" onclick="changeDifficulty(12);" /> Advanced
		</form><br />


		<h3>Flashcard type</h3>
		<p>
			<b>• Kana to roumaji</b> - Kana flashcards, roumaji answers<br />
			<b>• Roumaji to kana</b> - Roumaji flashcards, kana answers<br />
			<b>• Voice to kana</b> - Voice flashcards, kana answers
		</p>
		<!-- flashcard type selector -->
		<form action="">
			<input type='checkbox' name="flashcard_type" value="kana_to_roumaji" id="button_ktr" onclick="setFlashcardTypes(1);" /> Kana to roumaji
			<input type='checkbox' name="flashcard_type" value="roumaji_to_kana" id="button_rtk" onclick="setFlashcardTypes(2);" /> Roumaji to kana
			<input type='checkbox' name="flashcard_type" value="voice_to_kana" id="button_vtk" onclick="setFlashcardTypes(3);" /> Voice to kana
		</form><br />


		<h3>Kana</h3>
		<p>
			<b>• Select</b>  kana symbols you would like to practice (types and sets can be combined)
		</p>
		<!-- kana type selector -->
		<form action="" default:1>
			<input type="radio" name="kana_type" value="hiragana" id="button_kt1" onclick="changeKanaTable();" /> Hiragana
			<input type="radio" name="kana_type" value="katakana" id="button_kt2" onclick="changeKanaTable();" /> Katakana
		</form>

		<!-- kana set selector -->
		<form action="" default:1>
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



