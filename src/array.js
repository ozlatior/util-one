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
	}

};

module.exports = array;
