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
	}

};

module.exports = string;
