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
	</ul>

	<br />

	<p>Zanzou is a place to practise your kana memory. Its goal is to help people that already started learning kana and need a place to sharpen or refresh their kana knowledge but a complete beginner might find it useful as well (understanding how <a href="http://en.wikipedia.org/wiki/Kana#Diacritics">diacritics</a> are used and how to create <a href="http://en.wikipedia.org/wiki/Kana#Digraphs">digraphs</a> is however, needed). Zanzou keeps track of practised kana symbols and repeats the ones that were not recognized more frequently. Zanzou can also increse the difficulty of exercises by providing symbols similar to the correct answer together with it. Zanzou will not teach you <a href="http://en.wikipedia.org/wiki/Kanji">kanji</a> or kana stroke order (<a href="http://en.wikipedia.org/wiki/Hiragana#Stroke_order_and_direction">hiragana</a>/<a href="http://en.wikipedia.org/wiki/Katakana#Stroke_order">katakana</a>).</p>
</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>



