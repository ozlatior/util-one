const html = {

	/*
	 * Regular expressions used for parsing
	 */
	regexp: {
		COMMENT_START: "<!--",
		COMMENT_END: "-->"
	},

	/*
	 * Remove HTML comments
	 * str: string, the string to process
	 * keepContent: keep the content and remove the comment tags only
	 * extracted: array - in case we don't keep content, extracted comments will be stored here
	 * returns processed string
	 */
	removeComments: function(str, keepContent, extracted) {
		if (extracted === undefined)
			extracted = [];
		if (keepContent === true) {
			str = str.replace(new RegExp(html.regexp.COMMENT_START, "g"), "");
			str = str.replace(new RegExp(html.regexp.COMMENT_END, "g"), "");
			return str;
		}
		while (true) {
			let s = str.indexOf(html.regexp.COMMENT_START);
			let e = str.indexOf(html.regexp.COMMENT_END);
			if (s === -1 && e === -1)
				break;
			// unpaired start, remove everything after
			if (e === -1) {
				str = str.slice(0, s);
				continue;
			}
			// unpaired end, remove everything before
			if (s === -1 || s > e) {
				str = str.slice(e + html.regexp.COMMENT_END.length);
				continue;
			}
			// only possible case left is s < e, the regular case
			// if we have nested tags, the opening (start) will be removed now but the end will not
			// be removed correctly, we have to find the correct end
			// find the next start and end tags
			let ns = str.indexOf(html.regexp.COMMENT_START, e+1);
			let ne = e;
			while (true) {
				e = ne;
				ne = str.indexOf(html.regexp.COMMENT_END, ne+1);
				// if we have a starting tag and went over it, we stop
				if (ns !== -1 && ne > ns)
					break;
				// no more starting tags? go to the end (or just stop if no more ending tags found)
				if (ne === -1)
					break;
			}
			extracted.push(str.slice(s, e + html.regexp.COMMENT_END.length));
			str = str.slice(0, s) + str.slice(e + html.regexp.COMMENT_END.length);
		}
		return str;
	},

	/*
	 * Get a list of all HTML comments in string
	 * str: string, the string to search in
	 * returns an array of all comments (content + tags)
	 */
	extractComments: function(str) {
		let ret = [];
		// we just call the remove comments with the third argument (and tell it to remove content)
		html.removeComments(str, false, ret);
		return ret;
	},

	/*
	 * Replace all HTML entities with their UTF-8 correspondents
	 * str: string, the string to process
	 * returns string with all entities replaced
	 */
	decodeEntities: function(str) {
		let translate_re = /&(nbsp|amp|quot|lt|gt|apos|cent|pound|yen|euro|copy|reg);/g;
		let translate = {
			"nbsp" : " ",
			"amp"  : "&",
			"quot" : "\"",
			"lt"   : "<",
			"gt"   : ">",
			"apos" : "'",
			"cent" : "¢",
			"pound": "£",
			"yen"  : "¥",
			"euro" : "€",
			"copy" : "©",
			"reg"  : "®"
		};
		return str.replace(translate_re, function(match, entity) {
			return translate[entity];
		}).replace(/&#(\d+);/gi, function(match, numStr) {
			let num = parseInt(numStr, 10);
			return String.fromCharCode(num);
		});
	}

};

module.exports = html;
