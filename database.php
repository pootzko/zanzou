<?php
class ZanzouDB {
	private $mysqli;


	// set the db connection up
	function __construct() {
		require 'credentials.php';

		$this->mysqli = new mysqli("localhost", $db_username, $db_password, $db_name);
		if ($this->mysqli->connect_errno) {
			echo "Failed to connect to MySQL: (" . $this->mysqli->connect_errno . ") " . $this->mysqli->connect_error;
		}

		//$this->DropTable();
		//$this->CreateTable();
		//$this->InitializeTableRows();
	}



	// drop old table and create a new empty one
	private function DropTable() {
		$sql = "DROP TABLE symbols";
		$query = $this->mysqli->query($sql);

		if ($query === FALSE)
			echo "Error. Table not dropped.";
		else
			$this->CreateTable();
	}



	// create a new empty symbols table
	// table columns:
	// b => beginner, i => intermediate, a => advanced
	// ktr => kana to roumaji, rtk => roumaji to kana, vtk => voice to kana
	// c => correct, t=> total
	private function CreateTable() {
		$sql = "
			CREATE TABLE symbols (
				id int(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
				symbol_key varchar(12) NOT NULL,
				b_ktr_c int(16) DEFAULT 0,
				b_ktr_t int(16) DEFAULT 0,
				b_rtk_c int(16) DEFAULT 0,
				b_rtk_t int(16) DEFAULT 0,
				b_vtk_c int(16) DEFAULT 0,
				b_vtk_t int(16) DEFAULT 0,
				i_ktr_c int(16) DEFAULT 0,
				i_ktr_t int(16) DEFAULT 0,
				i_rtk_c int(16) DEFAULT 0,
				i_rtk_t int(16) DEFAULT 0,
				i_vtk_c int(16) DEFAULT 0,
				i_vtk_t int(16) DEFAULT 0,
				a_ktr_c int(16) DEFAULT 0,
				a_ktr_t int(16) DEFAULT 0,
				a_rtk_c int(16) DEFAULT 0,
				a_rtk_t int(16) DEFAULT 0,
				a_vtk_c int(16) DEFAULT 0,
				a_vtk_t int(16) DEFAULT 0
			)
		";
		$query = $this->mysqli->query($sql);

		if ($query === FALSE)
			echo "Error. Table not created.";

		$this->InitializeTableRows();
	}



	// create rows, columns and zero-out the symbols table
	private function InitializeTableRows() {
		$kana_types = array("h", "k");
		$kana_sets = array("mon", "dig", "mwd", "dwd");

		foreach ($kana_types as $kana_type) {
			foreach ($kana_sets as $kana_set) {
				if ($kana_set == "mon") {
					$i_range = 10;
					$j_range = 5;
				}
				if ($kana_set == "dig") {
					$i_range = 7;
					$j_range = 3;
				}
				if ($kana_set == "mwd") {
					$i_range = 5;
					$j_range = 5;
				}
				if ($kana_set == "dwd") {
					$i_range = 5;
					$j_range = 3;
				}

				for ($i=0; $i<$i_range; $i++) {
					for ($j=0; $j<$j_range; $j++) {
					// skip empty monographs cells
					if ($kana_set == "mon") {
						if ((($i == 7) && ($j == 1)) || (($i == 7) && ($j == 3)))
							continue;
						if ((($i == 9) && ($j == 1)) || (($i == 9) && ($j == 2)) || (($i == 9) && ($j == 3)))
							continue;
					}

					$symbol_key = $kana_type .  "_" . $kana_set ."_" . $i . "_" . $j;
					$sql = "INSERT INTO symbols (symbol_key) VALUES ('" . $symbol_key . "')";

					$query = $this->mysqli->query($sql);

					if ($query === FALSE)
						echo "Error. Row \"" . $symbol_key . "\" not initialized.";
					}
				}

				// for "n" symbol
				if ($kana_set == "mon") {
					$sql = "INSERT INTO symbols (symbol_key) VALUES ('" . $kana_type . "_mon_10_0')";

					$query = $this->mysqli->query($sql);

					if ($query === FALSE)
						echo "Error. Row \"" . $symbol_key . "\" not initialized.";
				}
			}
		}
	}



	// increment correct or total values in symbols table
	public function IncrementScoreValue($symbol_key, $table_column) {
		$sql = "UPDATE symbols SET " . $table_column . "=" . $table_column . "+1 WHERE symbol_key='" . $symbol_key . "'";

		$query = $this->mysqli->query($sql);

		if ($query === FALSE)
			echo "Error. Value not updated.";
	}



	// generate xml from symbols table
	public function GenerateXML() {
		$sql = "SELECT * FROM symbols";

		$query = $this->mysqli->query($sql);

		if ($query === FALSE)
			echo "Error. XML not generated.";


		// create xml tree
		$doc = new DomDocument('1.0');

		$root = $doc->createElement('symbols');
		$root = $doc->appendChild($root);

		while ($row = $query->fetch_assoc()) {
			$entity = $doc->createElement('symbol');
			$attribute = $doc->createAttribute('key');
			$attribute->value = $row['symbol_key'];
			$entity->appendChild($attribute);
			$entity = $root->appendChild($entity);

			foreach ($row as $column_name=>$column_data) {
				if (($column_name == "id") || ($column_name == "symbol_key"))
					continue;
				$child = $doc->createElement($column_name);
				$child = $entity->appendChild($child);
				$value = $doc->createTextNode($column_data);
				$value = $child->appendChild($value);
			}
		}

		$xml_string = $doc->saveXML();
		header("Content-Type: text/xml; charset=UTF-8");

		echo $xml_string;
	}
}
?>