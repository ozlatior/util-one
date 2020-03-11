const html = {

	/*
	 * Regular expressions used for parsing
	 */
	regexp: {
		COMMENT_START: "<!--",
		COMMENT_END: "-->",
		TAG_START: "^ *< *[^/]",
		TAG_END: "^ *< */ *[^/]",
		TAG_CLOSED: "^ *< *[^<>/]+ */ *> *$"
	},

	/*
	 * Tag groupings of various kinds
	 */
	tags: {
		CONTENT: [ "a", "b", "del", "em", "i", "strong", "br" ]
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
	},

	/*
	 * Extract the name of a tag from tag
	 */
	getTagName: function(str) {
		str = str.replace(/[<>\/]/g, "").trim();
		let tag = str.split(" ")[0].toLowerCase();
		return tag;
	},

	/*
	 * Determine if it's opening, closing or single tag (no content, like <br/>
	 */
	getTagRole: function(str) {
		if (str.match(html.regexp.TAG_CLOSED) !== null)
			return "closed";
		if (str.match(html.regexp.TAG_END) !== null)
			return "end";
		if (str.match(html.regexp.TAG_START) !== null)
			return "start";
	},

	/*
	 * Break up content by tags - returns a list of lines and blocks of formatting, eg
	 * str: "<b>Name:</b> John Doe <i>(intern)</i></br><b>Address:</b> Foo Bar" will yield an array of two lines
	 * [
	 *     { tags: [ "b" ], content: "Name:" }, { tags: [], content: " John Doe " }, { tags: [ "i" ], content: "(intern)" },
	 *     { tags: [ "b" ], content: "Address:" }, { tags: [], content: " Foo Bar" }
	 * ]
	 */
	breakByTag: function(str) {
		let ret = [];
		let reg = new RegExp("< *(/ *)?(" + html.tags.CONTENT.join("|") + ")( +[^<>]+)? *>", "g");
		// first, break into lines
		str = str.replace(/<\/? *br *\/?>/g, "<br>").split("<br>");
		for (let i=0; i<str.length; i++) {
			let m = str[i].match(reg);
			// no tags found, we have a single element with no tags
			if (m === null) {
				ret.push([ { tags: [], content: str[i] } ]);
				continue;
			}
			// get information about the tags
			let k = -1;
			let tags = [];
			for (let j=0; j<m.length; j++) {
				k = str[i].indexOf(m[j], k+1);
				tags.push({
					str: m[j],
					tag: html.getTagName(m[j]),
					role: html.getTagRole(m[j]),
					index: k,
					length: m[j].length
				});
			}
			k = 0;
			// make sure there are no open ends (they will mess up the algorithm further down the path)
			// however, unclosed tags are ok since we'll close everything at the end of the string
			while (tags[k].role === "end") {
				tags.unshift({ str: "", tag: tags[k].tag, role: "start", index: 0, length: 0});
				k += 2;
			}
			// now build a line with fragments of the text and the tags
			let line = [];
			let openTags = [];
			let lastIndex = 0;
			for (let j=0; j<tags.length; j++) {
				// check that we have some new content between the consecutive tags
				if (tags[j].index !== lastIndex) {
					line.push({
						tags: openTags.slice(0),
						content: str[i].slice(lastIndex, tags[j].index)
					});
				}
				// add it or remove it from open tags
				if (tags[j].role === "start")
					openTags.push(tags[j].tag);
				if (tags[j].role === "end")
					openTags.splice(tags.indexOf(tags[j].tag, 1));
				// calculate new "lastIndex"
				lastIndex = tags[j].index + tags[j].length;
			}
			// push what's left, if anything is left
			if (lastIndex < str[i].length-1)
				line.push({
					tags: openTags.slice(0),
					content: str[i].slice(lastIndex)
				});
			ret.push(line);
		};
		return ret;
	}

};

module.exports = html;
