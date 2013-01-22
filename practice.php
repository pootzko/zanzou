<?php require 'head.php'; ?>

<script type="text/javascript" src="lib/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="lib/jquery.cookie.js"></script>
<script type="text/javascript" src="lib/soundmanager2/soundmanager2-nodebug-jsmin.js"></script>
<script type="text/javascript" src="js/localstorage.js"></script>
<script type="text/javascript" src="js/cookie.js"></script>
<script type="text/javascript" src="js/database.js"></script>
<script type="text/javascript" src="js/practice.js"></script>
<script type="text/javascript" src="js/kana.js"></script>

<?php
require 'header.php';
require 'navigation.php';
?>



<h2>Practice</h2>
<div id="content"> <!-- CONTENT -->

	<div id="test">
		<div id="flashcard">
			<div id="flashcard_content"></div>
		</div>
		<div id="flashcard_table"></div>
	</div>
	<div id="score_table_holder">
	</div>
	<div id="flashcard_info">
		<ul>
			<li>success rate is calculated based on all the flashcards you answered so far (correct/total answers ratio)</li>
			<li>answer counts as being correct only if you chose the correct answer first</li>
			<li>each wrong answer counts towards incorrect for that symbol</li>
			<li>answering incorrectly will not move you to the next flashcard immediately - to better learn kana, you are required to figure out the correct answer first</li>
			<li>statistics on the right side of the flashcard are calculated based on your current symbol correct/total ratio</li>
		</ul>
	</div>
</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>




