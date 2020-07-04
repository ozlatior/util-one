const path = {

	SEPARATOR: "/",

	isAbsolute: function (str, sep) {
		if (!sep)
			sep = path.SEPARATOR;
		return str[0] === sep;
	},

	isRelative: function (str, sep) {
		if (!sep)
			sep = path.SEPARATOR;
		return str[0] !== sep;
	},

	normalize: function (str, ending, sep) {
		if (!sep)
			sep = path.SEPARATOR;
		str = str.replace(new RegExp(sep + "+", "g"), sep);
		if (ending === true && str.slice(-1) !== sep)
			str += sep;
		if (ending === false && str.slice(-1) === sep)
			str = str.slice(0, -1);
		return str;
	},

	split: function(str, sep) {
		if (!sep)
			sep = path.SEPARATOR;
		str = path.normalize(str, false);
		return str.split(sep);
	},

	join: function(elements, separator) {
		let sep = separator;
		if (elements instanceof Array) {
			if (!sep)
				sep = path.SEPARATOR;
		}
		else {
			elements = arguments.slice(0);
			sep = path.SEPARATOR;
		}
		return elements.join(sep);
	},

	getRelative: function(from, to, sep) {
		if (!sep)
			sep = path.SEPARATOR;
		let ret = [];
		// for now we only handle absolute paths
		if (!path.isAbsolute(from, sep) || !path.isAbsolute(to, sep))
			return null;
		from = path.split(from, sep);
		to = path.split(to, sep);
		let root = -1;
		for (let i=0; i<from.length; i++)
			if (from[i] === to[i])
				root = i;
			else
				break;
		for (let i=root+1; i<from.length; i++)
			ret.push("..");
		if (ret.length === 0)
			ret.push(".");
		for (let i=root+1; i<to.length; i++)
			ret.push(to[i]);
		return ret.join(sep);
	}

};

module.exports = path;
