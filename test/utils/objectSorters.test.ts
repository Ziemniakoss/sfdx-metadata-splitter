import { sortObjectPropertiesAlphabetically } from "../../src/utils/objectSorters";
import { equal } from "assert";
import * as assert from "assert";

describe("utils/objectSorters # sortObjectPropertiesAlphabetically", () => {
	context("null input", () => {
		const result = sortObjectPropertiesAlphabetically(null);
		it("should return null", () => equal(null, result));
	});
	context("descending ", () => {
		const input = {
			fck: "ptn",
			a: true,
		};
		const result = sortObjectPropertiesAlphabetically({ ...input }, false);
		it("shouldn't change", () => assert.deepEqual(result, input));
		it("should sort ascending", () => {
			const keys = Object.keys(result);
			equal(keys[0], "fck");
			equal(keys[1], "a");
		});
	});
	context("ascending", () => {
		const input = {
			gamma: "str",
			alfa: true,
			beta: 123,
		};
		const result = sortObjectPropertiesAlphabetically({ ...input });
		it("shouldn't change", () => assert.deepEqual(result, input));
		it("should sort ascending", () => {
			const keys = Object.keys(result);
			equal(keys[0], "alfa");
			equal(keys[1], "beta");
			equal(keys[2], "gamma");
		});
	});
});
