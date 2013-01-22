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

<script type="text/javascript" src="lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="lib/jquery.cookie.js"></script>
<script type="text/javascript" src="js/cookie.js"></script>

<?php
require 'header.php';
require 'navigation.php';
?>



<h2>Home</h2>
<div id="content"> <!-- CONTENT -->
	<h3>Welcome to Zanzou!</h3><br />

	<ul>
		<li>memorize <a href="http://en.wikipedia.org/wiki/Hiragana">hiragana</a> and <a href="http://en.wikipedia.org/wiki/Katakana">katakana</a> using flashcards</li>
		<li>three difficulty levels</li>
		<li>three types of exercises</li>
		<ul>
			<li>kana to roumaji</li>
			<li>roumaji to kana</li>
			<li>voice to kana</li>
		</ul>
		<li>customize your kana practice set</li>
		<li>flashcard frequency based on correct answers</li>
		<li>free</li>
	</ul>

	<br />

	<p>Zanzou is a place to practice your kana memory. Its goal is to help people that already started learning kana and need a place to sharpen or refresh their kana knowledge. Additionally, complete beginners can find it useful as well, given that they already understand how <a href="http://en.wikipedia.org/wiki/Kana#Diacritics">diacritics</a> are used and how <a href="http://en.wikipedia.org/wiki/Kana#Digraphs">digraphs</a> are created.</p>

	<p>Zanzou keeps track of practiced kana symbols and repeats the ones that were not recognized more frequently and it can also increse the difficulty of exercises by providing symbols similar to the correct answer together with it.</p>

	<p>For learning <a href="http://en.wikipedia.org/wiki/Kanji">kanji</a> or kana stroke order (<a href="http://en.wikipedia.org/wiki/Hiragana#Stroke_order_and_direction">hiragana</a>/<a href="http://en.wikipedia.org/wiki/Katakana#Stroke_order">katakana</a>), one should look for other resources.</p>
</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>



