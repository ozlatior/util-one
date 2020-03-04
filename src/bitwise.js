const bitwise = {

	/*
	 * Get a list of all active flags in a bitmask
	 * bits: number, the bits to read flags from
	 * flags: object or array of objects: key-value pairs for flags and their values
	 */
	getFlags: function(bits, flags) {
		let ret = [];

		if (typeof(bits) !== "number")
			return ret;
		if (typeof(flags) !== "object")
			return ret;
		if (!(flags instanceof Array))
			flags = [ flags ];

		for (var i=0; i<flags.length; i++) {
			for (var flag in flags[i]) {
				if (flags[i][flag] === 0)
					continue;
				if ((bits & flags[i][flag]) === flags[i][flag])
					ret.push(flag);
			}
		}

		return ret;
	}

};

module.exports = bitwise;
