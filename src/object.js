const object = {

	deepEqual: function(a, b) {
		if (typeof(a) !== "object" || typeof(b) !== "object")
			return false;
		let keys = [];
		for (let i in a) {
			keys.push(i);
			if (typeof(a[i]) === "object") {
				if (object.deepEqual(a[i], b[i]))
					continue;
				else
					return false;
			}
			if (a[i] !== b[i])
				return false;
		}
		for (let i in b) {
			if (keys.indexOf(i) === -1)
				return false;
		}
		return true;
	},

	deepCopy: function(a) {
		if (typeof(a) !== "object")
			return a;
		let ret = {};
		if (a instanceof Array)
			ret = [];
		for (let i in a) {
			if (!(a.hasOwnProperty(i)))
				continue;
			ret[i] = object.deepCopy(a[i]);
		}
		return ret;
	}

};

module.exports = object;
