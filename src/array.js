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
	}

};

module.exports = array;
