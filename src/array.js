const array = {

	max: function(a) {
		if (!(a instanceof Array))
			return undefined;
		if (a.length === 0)
			return undefined;
		let ret = undefined;
		for (let i=0; i<a.length; i++)
			if ((typeof(a[i]) === "number") && (ret === undefined || a[i] > ret))
				ret = a[i];
		return ret;
	},

	min: function(a) {
		if (!(a instanceof Array))
			return undefined;
		if (a.length === 0)
			return undefined;
		let ret = undefined;
		for (let i=0; i<a.length; i++)
			if ((typeof(a[i]) === "number") && (ret === undefined || a[i] < ret))
				ret = a[i];
		return ret;
	},

	inInterval: function(a, min, max) {
		let ret = 0;
		for (let i=0; i<a.length; i++) {
			if (a[i] >= min && a[i] < max)
				ret++;
		}
		return ret;
	},

	search: function(a, condition) {
		let ret = [];
		for (let i=0; i<a.length; i++) {
			let matches = true;
			for (let j in condition) {
				if (condition[j] !== a[i][j]) {
					matches = false;
					break;
				}
			}
			if (matches)
				ret.push(a[i]);
		}
		return ret;
	},

	deepEqual: function(a, b) {
		if (typeof(a) !== "object" || typeof(b) !== "object")
			return false;
		// check if it's an array and do the special handling
		if (a instanceof Array) {
			if (!(b instanceof Array))
				return false;
			if (a.length !== b.length)
				return false;
			// for each element check if it appears the same number of times
			// in both arrays, to count duplicates and everything
			for (let i=0; i<a.length; i++) {
				let count = 0;
				for (let j=0; j<a.length; j++) {
					if (typeof(a[i]) === "object") {
						if (array.deepEqual(a[i], a[j]))
							count++;
						if (array.deepEqual(a[i], b[j]))
							count--;
					}
					else {
						if (a[j] === a[i])
							count++;
						if (b[j] === a[i])
							count--;
					}
				}
				if (count !== 0)
					return false;
			}
			return true;
		}
		// or treat as object otherwise
		let keys = [];
		for (let i in a) {
			keys.push(i);
			if (typeof(a[i]) === "object") {
				if (array.deepEqual(a[i], b[i]))
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
	}

};

module.exports = array;
