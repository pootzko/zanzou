<?php /******************************************************
*===========================================================*
*         - zanzou -                                        *
*===========================================================*
*************************************************************
*
* Copyright 2012, Tihomir Kit (kittihomir@gmail.com)
* spilp is distributed under the terms of GNU General Public License v3
* A copy of GNU GPL v3 license can be found in LICENSE.txt or
* at http://www.gnu.org/licenses/gpl-3.0.html
*
************************************************************/


require 'header.php';
require 'navigation.php';
?>

<script type="text/javascript" src="javascript_libs/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="options.js"></script>
<script type="text/javascript" src="kana.js"></script>


<div id="content"> <!-- CONTENT -->
	<h2>Options</h2>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


	<div id="kana_table_holder">
		<div id="kana_table">
			<script type="text/javascript">
				$("#kana_table").append(generateTable("hiragana", "monographs"));
			</script>
		</div>
	</div>




</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>



