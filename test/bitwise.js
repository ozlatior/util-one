const assert = require("assert");

const bitwise = require("../index.js").bitwise;

const flags = {
	NONE:		0,
	FLAG_1:		1 << 0,
	FLAG_2:		1 << 1,
	FLAG_3:		1 << 2,
	FLAG_4:		1 << 3,
	FLAG_5:		1 << 4,
	FLAG_6:		1 << 8,
	FLAG_7:		1 << 16,
	FLAG_8:		1 << 20
};

const moreFlags = {
	NONE:		0,
	MORE_1:		1 << 10,
	MORE_2:		1 << 11,
	MORE_3:		1 << 12
};

describe("Bitwise utilities", () => {

	describe("getFlags()", () => {

		it("Gets flags from number based on object argument", () => {
			let mask = flags.FLAG_1 | flags.FLAG_3 | flags.FLAG_5 | flags.FLAG_6 | moreFlags.MORE_1 | moreFlags.MORE_2;
			let r = bitwise.getFlags(mask, flags);
			assert.deepEqual(r, [ "FLAG_1", "FLAG_3", "FLAG_5", "FLAG_6" ]);
		});

		it("Gets flags from number based on array argument", () => {
			let mask = flags.FLAG_1 | flags.FLAG_3 | flags.FLAG_5 | flags.FLAG_6 | moreFlags.MORE_1 | moreFlags.MORE_2;
			let r = bitwise.getFlags(mask, [ flags, moreFlags ]);
			assert.deepEqual(r, [ "FLAG_1", "FLAG_3", "FLAG_5", "FLAG_6", "MORE_1", "MORE_2" ]);
		});

		it("Returns empty array in case mask is zero", () => {
			let r = bitwise.getFlags(0, [ flags, moreFlags ]);
			assert.deepEqual(r, [ ]);
		});

		it("Returns empty array in case none of the flags are in the mask", () => {
			let mask = moreFlags.MORE_1 | moreFlags.MORE_2;
			let r = bitwise.getFlags(mask, flags);
			assert.deepEqual(r, [ ]);
		});

	});

});
