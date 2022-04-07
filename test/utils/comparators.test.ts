import { equal } from "assert";
import { compare, compareByField } from "../../src/utils/comparators";

function testCompare(
	a: string,
	b: string,
	expectedResult: number,
	caseInsensitive = true,
	asc = true
) {
	const result = compare(a, b, caseInsensitive, asc);
	equal(result, expectedResult);
}

describe("utils/comparators # compare", () => {
	context("Case insensitive comparison", () => {
		context("Ascending order", () => {
			it("should return 0", () => testCompare("test", "Test", 0));

			it("should return 0", () => testCompare("test", "test", 0));
			it("should return -1", () => testCompare("ala", "Beka", -1));
			it("should return 1", () => testCompare("Yeti", "fox", 1));
		});
		context("Descending order", () => {
			it("should return 0", () => testCompare("test", "Test", 0, true, false));
			it("should return 0", () => testCompare("test", "test", 0, true, false));
			it("should return 1", () => testCompare("ala", "Beka", 1, true, false));
			it("should return -1", () => testCompare("Yeti", "fox", -1, true, false));
		});
	});
	context("Case sensitive comparison", () => {
		context("Ascending order", () => {
			it("should return 1", () => testCompare("test", "Test", 1, false));
			it("should return 0", () => testCompare("test", "test", 0, false));
			it("should return -1", () => testCompare("ala", "beka", -1, false));
			it("should return 1", () => testCompare("yeti", "fox", 1, false));
		});
		context("Descending order", () => {
			it("should return 1", () =>
				testCompare("test", "Test", -1, false, false));
			it("should return 0", () => testCompare("test", "test", 0, false, false));
			it("should return 1", () => testCompare("ala", "beka", 1, false, false));
			it("should return -1", () =>
				testCompare("yeti", "fox", -1, false, false));
			it("should return 1", () => testCompare("Yeti", "fox", 1, false, false));
		});
	});
});

function testCompareByField(
	fieldName: string,
	valInA,
	valInB,
	expectedResult,
	caseInsensitive = true,
	asc = true
) {
	const a = {
		[fieldName]: valInA,
	};
	const b = {
		[fieldName]: valInB,
	};
	const result = compareByField(a, b, fieldName, caseInsensitive, asc);
	equal(result, expectedResult);
}
describe("comparators#compareByField", () => {
	context("Record<string, string>", () => {
		it("should return 0", () => testCompareByField("a", "ala", "ALA", 0));
		it("should return -1", () => testCompareByField("a", "ala", "Beta", -1));
		it("should return 1", () =>
			testCompareByField("fieldName", "yeti", "fox", 1));
	});
	context("Record<string, string[]>", () => {
		it("should return 0", () => testCompareByField("a", ["ala"], ["ALA"], 0));
		it("should return -1", () =>
			testCompareByField("a", ["ala"], ["Beta"], -1));
		it("should return 1", () =>
			testCompareByField("fieldName", ["yeti"], ["fox"], 1));
	});
	context("Mixed types", () => {
		it("should return 0", () => testCompareByField("a", "ala", ["ALA"], 0));
		it("should return -1", () => testCompareByField("a", ["ala"], "Beta", -1));
	});
});
