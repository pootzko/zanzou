function initializeLocalStorage() {
	/*
	*
	* storage_symbols JSON model
	* (shorted names were used for name/value pairs to reduce size)
	*
	* storage_symbols = {"symbols": [
	* 	kana_type: value,
	* 	kana_set: value,
	* 	kana_row: value,
	* 	kana_column: value,
	* 	selected: value,
	* 	correct: value,
	* 	total: value,
	* 	range_low: value,
	* 	range_high: value
	* ]}
	*
	*/

	// dodati "n" i "vu"

	if (localStorage.getItem("storage_symbols_obj") == null) {
		console.log("storage_symbols_obj does not exist, initializing new storage_symbols_obj");

		var storage_symbols = {"symbols": []};

		for (kana_type=0; kana_type<2; kana_type++) {
			if (kana_type == 0)
				tmp_kana_type = "h"; // hiragana
			else
				tmp_kana_type = "k"; // katakana


			for (kana_set=0; kana_set<4; kana_set++) {
				if (kana_set == 0) {
					tmp_kana_set = "mon";
					tmp_rows = 11;
					tmp_columns = 5;
				}
				else if (kana_set == 1) {
					tmp_kana_set = "dig";
					tmp_rows = 7;
					tmp_columns = 3;
				}
				else if (kana_set == 2) {
					tmp_kana_set = "mwd";
					tmp_rows = 6;
					tmp_columns = 5;
				}
				else {
					tmp_kana_set = "dwd";
					tmp_rows = 5;
					tmp_columns = 3;
				}


				for (kana_row=0; kana_row<tmp_rows; kana_row++) {
					for (kana_column=0; kana_column<tmp_columns; kana_column++) {
						kana_selected = 0;

						if (tmp_kana_set == "mon")
							if (
								((kana_row == 7) && (kana_column == 1)) ||
								((kana_row == 7) && (kana_column == 3)) ||
								((kana_row == 9) && (kana_column == 2))
							)
								kana_selected = null;

						var tmp_JSON  = {
								"kt": tmp_kana_type,
								"ks": tmp_kana_set,
								"kr": kana_row,
								"kc": kana_column,
								"se": kana_selected,
								"co": 0,
								"to": 0,
								"rl": 0,
								"rh": 0
						};



						storage_symbols.symbols.push(tmp_JSON);

						// for "n" symbol
						if ((kana_row == 10) && (kana_column == 0))
							break;

						// for "vu" symbol
						if ((kana_row == 5) && (kana_column == 0))
							if ((kana_type == 0) && (kana_set == 2))
								break;

					}
				}
			}
		}


		// for first time users default-check hiragana monographs "a, i, u, e, o"
		for (var i=0; i<5; i++)
			storage_symbols.symbols[i].se = 1;


		localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));
		console.log("new storage_symbols_obj initialized");
	}
	else
		console.log("storage_symbols_obj exists");
}




