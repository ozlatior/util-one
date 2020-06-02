const string = {

	regexp: {
		ESCAPE_REGEXP: /[-\/\\^$*+?.()|[\]{}]/g
	},

	/*
	 * Escape a string for regexp
	 */
	escapeRegexp: function(str) {
		return str.replace(string.regexp.ESCAPE_REGEXP, '\\$&');
	},

	/*
	 * Trim string from left, remove specified characters (defaults to space)
	 */
	trimLeft: function(str, chars) {
		if (chars === undefined)
			chars = [ " " ];
		if (!(chars instanceof Array))
			chars = [ chars ];
		else
			chars = chars.slice(0);
		for (let i in chars)
			chars[i] = string.escapeRegexp(chars[i]);
		let regexp = new RegExp("^(" + chars.join("|") + ")+");
		return str.replace(regexp, "");
	},

	/*
	 * Trim string from right, remove specified characters (defaults to space)
	 */
	trimRight: function(str, chars) {
		if (chars === undefined)
			chars = [ " " ];
		if (!(chars instanceof Array))
			chars = [ chars ];
		else
			chars = chars.slice(0);
		for (let i in chars)
			chars[i] = string.escapeRegexp(chars[i]);
		let regexp = new RegExp("(" + chars.join("|") + ")+$");
		return str.replace(regexp, "");
	},

	/*
	 * Trim string from both ends, remove specified characters (defaults to space)
	 */
	trim: function(str, chars) {
		str = string.trimLeft(str, chars);
		str = string.trimRight(str, chars);
		return str;
	},

	/*
	 * Fill a string with specified sequence to desired length
	 */
	fill: function(length, sequence) {
		if (sequence === undefined)
			sequence = " ";
		let ret = "";
		while (ret.length < length)
			ret += sequence;
		ret = ret.slice(0, length);
		return ret;
	},

	/*
	 * Pad a string to the left with desired sequence
	 */
	padLeft: function(str, length, sequence) {
		str = "" + str;
		let padding = string.fill(length - str.length, sequence);
		return padding + str;
	},

	/*
	 * Pad a string to the right with desired sequence
	 */
	padRight: function(str, length, sequence) {
		str = "" + str;
		let padding = string.fill(length - str.length, sequence);
		return str + padding;
	},

	/*
	 * Pad or trim string to the left to desired length (fill with desired sequence)
	 */
	boxLeft: function(str, length, sequence) {
		str = "" + str;
		if (str.length >= length)
			return str.slice(-length);
		return string.padLeft(str, length, sequence);
	},

	/*
	 * Pad or trim string to the right to desired length (fill with desired sequence)
	 */
	boxRight: function(str, length, sequence) {
		str = "" + str;
		if (str.length >= length)
			return str.slice(0, length);
		return string.padRight(str, length, sequence);
	},

	/*
	 * Pad or trim string to the left and right to desired length (fill with desired sequence)
	 * abcde -> bcd
	 * abcdef -> bcd
	 */
	boxCenter: function(str, length, sequence) {
		str = "" + str;
		let dif = str.length - length;
		if (str.length >= length)
			return str.slice(Math.floor(dif/2), -Math.ceil(dif/2));
		str = string.padLeft(str, str.length - Math.floor(dif/2), sequence);
		str = string.padRight(str, length, sequence);
		return str;
	},

	/*
	 * Indent a string to the left with desired seqeunce
	 */
	indentLeft: function(str, length, sequence) {
		return string.fill(length, sequence) + str;
	},

	/*
	 * Indent a string to the right with desired seqeunce
	 */
	indentRight: function(str, length, sequence) {
		return str + string.fill(length, sequence);
	},

	/*
	 * A set of string methods for switching between case types
	 */
	changeCase: {

		capitalizeFirst: function(str) {
			return str.slice(0, 1).toUpperCase() + str.slice(1);
		},

		uncapitalizeFirst: function(str) {
			return str.slice(0, 1).toLowerCase() + str.slice(1);
		},

		snakeToCamel: function(str, keepUpperCase) {
			if (!keepUpperCase)
				str = str.toLowerCase();
			str = str.split("_");
			let first = str.shift();
			str = first + str.map(string.changeCase.capitalizeFirst).join("");
			return str;
		},

		snakeToCapital: function(str, keepUpperCase) {
			if (!keepUpperCase)
				str = str.toLowerCase();
			str = str.split("_").map(string.changeCase.capitalizeFirst).join("");
			return str;
		},

		camelToSnake: function(str, keepUpperCase) {
			// simpleCamelCase -> simple_camel_case
			// CapitalCase -> capital_case
			// getX -> get_x
			// XGet -> x_get / X_get
			// getXYZ -> get_xyz / get_XYZ
			// getXYZCoordinates -> get_xyz_coordinates / get_XYZ_coordinates
			let m = str.match(/[A-Z][a-z]/g);
			if (m !== null) {
				for (let i=0; i<m.length; i++)
					str = str.replace(m[i], "_" + m[i].toLowerCase());
			}
			m = str.match(/(?<=[a-z]|^)[A-Z]+(?=_|$)/g);
			if (m !== null) {
				for (let i=0; i<m.length; i++) {
					if (keepUpperCase)
						str = str.replace(m[i], "_" + m[i]);
					else
						str = str.replace(m[i], "_" + m[i].toLowerCase());
				}
			}
			str = str.replace(/^_/, "");
			return str;
		},

		capitalToSnake: function(str, keepUpperCase) {
			return string.camelToSnake(str, keepUpperCase);
		},

		isUpperCase: function(str) {
			if (str === str.toUpperCase())
				return true;
			return false;
		},

		titleCase: function(str, keepUpperCase) {
			return str.split(" ").map((item) => {
				if (keepUpperCase && string.isUpperCase(item))
					return item;
				return string.capitalizeFirst(item.toLowerCase())
			}).join(" ");
		}

	},

	/*
	 * A set of string prototype function implementations for formatted strings
	 */
	colors: {

		REGEXP: /\u001b\[[0-9a-f]{1,2}m/g,

		apply: function(str, colors) {
			if (!colors)
				return str;
			for (let i=0; i<colors.length; i++)
				str = str[colors[i]];
			return str;
		},

		remove: function(str) {
			return str.replace(string.colors.REGEXP, "");
		},

		indexOf: function(needle, haystack, previousIndex) {
			return string.colors.remove(haystack).indexOf(needle, previousIndex);
		},

		charAt: function(index, str) {
			return string.colors.remove(str).charAt(index);
		},

		length: function(str) {
			return string.colors.remove(str).length;
		},

		slice: function(str, start, end) {
			let indexes = string.colors.getIndexes(str);
			if (start < -indexes.fwdLen)
				start = 0;
			if (end < -indexes.fwdLen)
				end = 0;
			if (start < 0)
				start += indexes.fwdLen;
			if (end < 0)
				end += indexes.fwdLen;
			if (start > indexes.fwdLen)
				start = indexes.fwdLen;
			if (end > indexes.fwdLen)
				end = indexes.fwdLen;
			start = indexes.rev[start];
			end = indexes.rev[end];
			return str.slice(start, end);
		},

		getIndexes: function(str) {
			let fwd = new Array(str.length);
			let rev = [];
			fwd.fill(1);
			let m = str.match(string.colors.REGEXP);
			if (m === null)
				m = [];
			let j = 0;
			while (m.length > 0) {
				let token = m.shift();
				j = str.indexOf(token, j);
				for (let i=0; i<token.length; i++) {
					fwd[j] = 0;
					j++;
				}
			}
			fwd.unshift(0);
			rev.push(0);
			for (let i=1; i<fwd.length; i++) {
				if (fwd[i] !== 0)
					rev.push(i);
				fwd[i] = fwd[i] + fwd[i-1];
			}
			return {
				fwdLen: fwd[fwd.length-1],
				revLen: str.length,
				fwd: fwd,
				rev: rev
			};
		}

	}

};

module.exports = string;
