const assert = require("assert");

const array = require("../index.js").array;

describe("Array utilities", () => {

	describe("max()", () => {

		it("returns the maximum number in an array of numbers", () => {
			var ret = array.max([ 1, 7, 4, -3, -10, 11, 9, 11, 5]);
			assert.equal(ret, 11);
		});

		it("returns the maximum number in a mixed array", () => {
			var ret = array.max([ "1", "7", 4, "-3", -10, "11", 9, "11", 5, null, {}, [ 22, 23 ]]);
			assert.equal(ret, 9);
		});

		it("returns the only number in an array", () => {
			var ret = array.max([ "1", "7", "4", -3, "-10", "11", true, false, "9", "11", "5", null, {}, [ 22, 23 ]]);
			assert.equal(ret, -3);
		});

		it("returns the only number in an one-element array", () => {
			var ret = array.max([ 0 ]);
			assert.equal(ret, 0);
		});

		it("returns undefined if no number in array", () => {
			var ret = array.max([ "1", "7", "4", "-3", true, false, "-10", "11", "9", "11", "5", null, {}, [ 22, 23 ]]);
			assert.equal(ret, undefined);
		});

		it("returns undefined if the array is empty", () => {
			var ret = array.max([]);
			assert.equal(ret, undefined);
		});

		it("returns undefined for arguments other than array", () => {
			var ret = array.max({a: 4, b: 7});
			assert.equal(ret, undefined);
			var ret = array.max(12);
			assert.equal(ret, undefined);
			var ret = array.max("12");
			assert.equal(ret, undefined);
			var ret = array.max(false);
			assert.equal(ret, undefined);
		});

	});

	describe("min()", () => {

		it("returns the minimum number in an array of numbers", () => {
			var ret = array.min([ 1, 7, 4, -3, -10, 11, 9, 11, 5]);
			assert.equal(ret, -10);
		});

		it("returns the minimum number in a mixed array", () => {
			var ret = array.min([ "1", "7", 4, "-3", -10, "11", 9, "11", 5, null, {}, [ 22, 23 ]]);
			assert.equal(ret, -10);
		});

		it("returns the only number in an array", () => {
			var ret = array.min([ "1", "7", "4", -3, "-10", "11", true, false, "9", "11", "5", null, {}, [ 22, 23 ]]);
			assert.equal(ret, -3);
		});

		it("returns the only number in an one-element array", () => {
			var ret = array.min([ 0 ]);
			assert.equal(ret, 0);
		});

		it("returns undefined if no number in array", () => {
			var ret = array.min([ "1", "7", "4", "-3", true, false, "-10", "11", "9", "11", "5", null, {}, [ 22, 23 ]]);
			assert.equal(ret, undefined);
		});

		it("returns undefined if the array is empty", () => {
			var ret = array.min([]);
			assert.equal(ret, undefined);
		});

		it("returns undefined for arguments other than array", () => {
			var ret = array.min({a: 4, b: 7});
			assert.equal(ret, undefined);
			var ret = array.min(12);
			assert.equal(ret, undefined);
			var ret = array.min("12");
			assert.equal(ret, undefined);
			var ret = array.min(false);
			assert.equal(ret, undefined);
		});

	});

});
