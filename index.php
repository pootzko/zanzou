<?php /******************************************************
*===========================================================*
*         - zanzou -                                        *
*===========================================================*
*************************************************************
*
* Copyright 2012, Tihomir Kit (kittihomir@gmail.com)
* zanzou is distributed under the terms of GNU General Public License v3
* A copy of GNU GPL v3 license can be found in LICENSE.txt or
* at http://www.gnu.org/licenses/gpl-3.0.html
*
************************************************************/

require 'head.php';
?>

<script type="text/javascript" src="javascript_libs/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="javascript_libs/jquery.cookie.js"></script>
<script type="text/javascript" src="cookie.js"></script>

<?php
require 'header.php';
require 'navigation.php';
?>



<h2>Home</h2>
<div id="content"> <!-- CONTENT -->
	<h3>Welcome to Zanzou!</h3>

	<ul>
		<li>memorize hiragana and katakana using flashcards</li>
		<li>three difficulty levels</li>
		<li>three types of exercises</li>
		<ul>
			<li>kana to roumaji</li>
			<li>roumaji to kana</li>
			<li>voice to kana</li>
		</ul>
		<li>customize your kana practise set</li>
		<li>repetition frequency based on previous success</li>
	</ul>

	<br />

	<p>Zanzou is a place to practise your kana memory for free. It keeps track of practised kana symbols and repeats the ones that you didn't recognize more often. Zanzou will make the exercises a bit more difficult by providing symbols similar to the correct answer together with it. Zanzou will not teach you <a href="http://en.wikipedia.org/wiki/Kanji">kanji</a>, or kana stroke order (<a href="http://en.wikipedia.org/wiki/Hiragana#Stroke_order_and_direction">hiragana</a>/<a href="http://en.wikipedia.org/wiki/Katakana#Stroke_order">katakana</a>).</p>
</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>



