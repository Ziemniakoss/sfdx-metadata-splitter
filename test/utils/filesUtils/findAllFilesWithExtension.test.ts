import { basename, join } from "path";
import { findAllFilesWithExtension } from "../../../src/utils/filesUtils";
import * as assert from "assert";

const basePath = join("test", "utils", "filesUtils", "testFiles");

describe("utils/filesUtils # findAllFilesWithExtension", () => {
	const expected = [
		join(basePath, "testDirA", "AnotherClass.cls"),
		join(
			basePath,
			"TestDirC",
			"testDirC_A",
			"testDirC_A_A",
			"AccountService.cls"
		),
		join(basePath, "TestDirC", "testDirC_A", "DataClass.cls"),
		join(basePath, "TestDirC", "testDirC_B", "TestClass.cls"),
	];
	const promise = findAllFilesWithExtension(basePath, ".cls");
	const expectedCount = expected.length;
	it(`Should find ${expectedCount} files`, async () => {
		const result = await promise;
		assert.equal(result.length, expectedCount);
	});
	for (const expectedFile of expected) {
		it(`Should find ${basename(expectedFile)}`, async () => {
			const result = await promise;
			assert.equal(result.includes(expectedFile), true);
		});
	}
});
