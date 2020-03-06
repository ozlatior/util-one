const assert = require("assert");

const string = require("../index.js").string;

describe("String utilities", () => {

	describe("trim()", () => {

		it("trims a string from both sides", () => {
			let str = "      string to trim                ";
			let exp = "string to trim";
			let res = string.trim(str);
			assert.equal(res, exp);
		});

		it("trims a string from left side", () => {
			let str = "      string to trim                ";
			let exp =       "string to trim                ";
			let res = string.trimLeft(str);
			assert.equal(res, exp);
		});

		it("trims a string from right side", () => {
			let str = "      string to trim                ";
			let exp = "      string to trim";
			let res = string.trimRight(str);
			assert.equal(res, exp);
		});

		it("trims a string from both sides of other than space", () => {
			let str = "-----string to trim------";
			let exp = "string to trim";
			let res = string.trim(str, "-");
			assert.equal(res, exp);
		});

		it("trims a string from both sides of string seqeunces", () => {
			let str = "-*-*-*-string to trim--*-*-*";
			let exp = "-string to trim-";
			let res = string.trim(str, "-*");
			assert.equal(res, exp);
		});

		it("trims a string from both sides of multiple string seqeunces", () => {
			let str = "-*=*-*=*-*-string to trim--*=*=*-*-*";
			let exp = "-string to trim-";
			let res = string.trim(str, [ "-*", "=*" ]);
			assert.equal(res, exp);
		});

	});

});
