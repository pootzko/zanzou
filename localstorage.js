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

	var storage_symbols = {"symbols": []};

	for (kana_type=0; kana_type<2; kana_type++) {
		if (kana_type == 0)
			tmp_kana_type = "h"; // hiragana
		else
			tmp_kana_type = "k"; // katakana


		for (kana_set=0; kana_set<4; kana_set++) {
			if (kana_set == 0)
				tmp_kana_set = "mon";
			else if (kana_set == 1)
				tmp_kana_set = "dia";
			else if (kana_set == 2)
				tmp_kana_set = "mwd";
			else
				tmp_kana_set = "dwd";


			for (kana_row=0; kana_row<10; kana_row++) {
				for (kana_column=0; kana_column<5; kana_column++) {
					var tmp_JSON  = {
							"kt": tmp_kana_type,
							"ks": tmp_kana_set,
							"kr": kana_row,
							"kc": kana_column,
							"se": 0,
							"co": 0,
							"to": 0,
							"rl": 0,
							"rh": 0
					};

					storage_symbols.symbols.push(tmp_JSON);
				}
			}
		}
	}


	// for first time users default-check hiragana monographs "a, i, u, e, o"
	for (i=0; i<5; i++) {
		storage_symbols.symbols[i].se = 1;
	}

	localStorage.setItem("storage_symbols_obj", JSON.stringify(storage_symbols));
}




