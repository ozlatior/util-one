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
	},

	deepRead: function(obj, path) {
		path = path.slice(0);
		let value = obj;
		while (path.length) {
			if (typeof(value) !== "object")
				return undefined;
			value = value[path.shift()];
		}
		return value;
	},

	createEmptyPath: function(obj, path) {
		path = path.slice(0);
		let target = obj;
		for (let i=0; i<path.length; i++) {
			if (target[path[i]] === undefined)
				target[path[i]] = {};
			target = target[path[i]];
		}
		return target;
	}

};

module.exports = object;
