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


	<div id="kana_table">
		<script type="text/javascript">
			$("#kana_table").append(generateTable());
		</script>
	</div>



</div> <!-- /CONTENT -->



<?php require 'footer.php'; ?>



