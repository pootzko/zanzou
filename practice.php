<?php require 'head.php'; ?>

<script type="text/javascript" src="javascript_libs/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="javascript_libs/jquery.cookie.js"></script>
<script type="text/javascript" src="javascript_libs/soundmanager2/soundmanager2-nodebug-jsmin.js"></script>
<script type="text/javascript" src="localstorage.js"></script>
<script type="text/javascript" src="cookie.js"></script>
<script type="text/javascript" src="database.js"></script>
<script type="text/javascript" src="practice.js"></script>
<script type="text/javascript" src="kana.js"></script>

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
			<li>answering incorrectly will not move you to the next flashcard immediately - to better learn kana, you are required to figure out the correct answer first</li>
			<li>statistics on the right side of the flashcard are calculated based on your current symbol correct/total ratio</li>
		</ul>
	</div>
</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>




