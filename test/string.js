const assert = require("assert");

const colors = require("colors");

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

	describe("test of case change functions", () => {

		describe("camel to snake", () => {

			it("properly converts simple camel case to snake case", () => {
				let str = "simpleCamelCase";
				let exp = "simple_camel_case";
				let res = string.changeCase.camelToSnake(str);
				assert.equal(res, exp);
			});

			it("properly converts capital case to snake case", () => {
				let str = "CapitalCase";
				let exp = "capital_case";
				let res = string.changeCase.camelToSnake(str);
				assert.equal(res, exp);
			});

			it("properly converts simple camel case to snake case, single letter", () => {
				let str = "getX";
				let exp = "get_x";
				let res = string.changeCase.camelToSnake(str);
				assert.equal(res, exp);
			});

			it("properly converts capital case to snake case, single letter", () => {
				let str = "XGet";
				let exp = "x_get";
				let res = string.changeCase.camelToSnake(str);
				assert.equal(res, exp);
			});

			it("properly converts simple camel case to snake case, capital sequence middle", () => {
				let str = "getXYZCoordinates";
				let exp = "get_xyz_coordinates";
				let res = string.changeCase.camelToSnake(str);
				assert.equal(res, exp);
			});

			it("properly converts simple camel case to snake case, capital sequence final", () => {
				let str = "getXYZ";
				let exp = "get_xyz";
				let res = string.changeCase.camelToSnake(str);
				assert.equal(res, exp);
			});

			it("properly converts capital case to snake case, single letter, preserve capitals", () => {
				let str = "XGet";
				let exp = "X_get";
				let res = string.changeCase.camelToSnake(str, true);
				assert.equal(res, exp);
			});

			it("properly converts simple camel case to snake case, capital sequence middle, preserve capitals", () => {
				let str = "getXYZCoordinates";
				let exp = "get_XYZ_coordinates";
				let res = string.changeCase.camelToSnake(str, true);
				assert.equal(res, exp);
			});

			it("properly converts simple camel case to snake case, capital sequence final, preserve capitals", () => {
				let str = "getXYZ";
				let exp = "get_XYZ";
				let res = string.changeCase.camelToSnake(str, true);
				assert.equal(res, exp);
			});

		});

	});

	describe("test of colors functions", () => {

		it("properly determiens indexOf in a formatted string", () => {
			let sub = function(str) {
				let clr = string.colors.remove(str);
				for (let i=0; i<clr.length; i++) {
					assert.equal(clr.indexOf(clr[i]), string.colors.indexOf(clr[i], str));
					assert.equal(clr.indexOf(clr[i], i-1), string.colors.indexOf(clr[i], str, i-1));
				}
			};
			sub("unformatted string");
			sub("monoformatted".red.bold);
			sub([ "zero", "one".red, "two", "three".green.bold, "four".bgYellow.green, "five", "six".red ].join(" "));
			sub([ "zero".green, "one".red, "two", "three".green.bold, "four".bgYellow.green, "five", "six"].join(" "));
		});

		it("properly determiens charAt in a formatted string", () => {
			let sub = function(str) {
				let clr = string.colors.remove(str);
				for (let i=0; i<clr.length; i++) {
					assert.equal(clr.charAt(i), string.colors.charAt(i, str));
				}
			};
			sub("unformatted string");
			sub("monoformatted".red.bold);
			sub([ "zero", "one".red, "two", "three".green.bold, "four".bgYellow.green, "five", "six".red ].join(" "));
			sub([ "zero".green, "one".red, "two", "three".green.bold, "four".bgYellow.green, "five", "six"].join(" "));
		});

		it("properly slices formatted strings", () => {
			let sub = function(str) {
				let clr = string.colors.remove(str);
				for (let i=0; i<clr.length+3; i++) {
					assert.equal(clr.slice(i), string.colors.remove(string.colors.slice(str, i)));
					assert.equal(clr.slice(-i), string.colors.remove(string.colors.slice(str, -i)));
					for (let j=0; j<clr.length+3; j++) {
						assert.equal(clr.slice(i, j), string.colors.remove(string.colors.slice(str, i, j)));
						assert.equal(clr.slice(i, -j), string.colors.remove(string.colors.slice(str, i, -j)));
						assert.equal(clr.slice(-i, j), string.colors.remove(string.colors.slice(str, -i, j)));
						assert.equal(clr.slice(-i, -j), string.colors.remove(string.colors.slice(str, -i, -j)));
					}
				}
			};
			sub("unformatted string");
			sub("monoformatted".red.bold);
			sub([ "zero", "one".red, "two", "three".green.bold, "four".bgYellow.green, "five", "six".red ].join(" "));
			sub([ "zero".green, "one".red, "two", "three".green.bold, "four".bgYellow.green, "five", "six"].join(" "));
		});
	
	});

});
