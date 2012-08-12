<?php
require 'header.php';
require 'navigation.php';
?>

<script type="text/javascript" src="javascript_libs/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="localstorage.js"></script>
<script type="text/javascript" src="options.js"></script>
<script type="text/javascript" src="kana.js"></script>



<div id="content"> <!-- CONTENT -->
	<h2>Options</h2>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>



	<div id="practise_options">
		<h3>Difficulty</h3>
		<form action="" default:1>
			<input type="radio" name="difficulty" value="beginner" id="button_df1" /> Beginner
			<input type="radio" name="difficulty" value="intermediate" id="button_df2" /> Intermediate
			<input type="radio" name="difficulty" value="advanced" id="button_df2" /> Advanced
		</form>

		<h3>Flashcard type</h3>
		<form action="" default:1>
			<input type='checkbox' name="flashcard_type" value="kana_to_roumaji" /> Kana to roumaji
			<input type='checkbox' name="flashcard_type" value="roumaji_to_kana" /> Roumaji to kana
			<input type='checkbox' name="flashcard_type" value="voice_to_kana" /> Voice to kana
		</form>

		<h3>Kana</h3>
		<!-- kana type selector -->
		<form action="" default:1>
			<input type="radio" name="kana_type" value="hiragana" id="button_kt1" /> Hiragana
			<input type="radio" name="kana_type" value="katakana" id="button_kt2" /> Katakana
		</form>

		<!-- kana set selector -->
		<form action="" default:1>
			<input type="radio" name="kana_set" value="monographs" id="button_ks1" /> Monographs
			<input type="radio" name="kana_set" value="digraphs" id="button_ks2" /> Digraphs
			<input type="radio" name="kana_set" value="monographs_with_diacritics" id="button_ks3" /> Monographs with diacritics
			<input type="radio" name="kana_set" value="digraphs_with_diacritics" id="button_ks4" /> Digraphs with diacritics
		</form>
	</div>

	<div id="kana_table_holder">
		<div id="kana_table"></div>
	</div>



	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>



</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>



