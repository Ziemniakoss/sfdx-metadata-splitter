import { join } from "path";
import { getAllDirs } from "../../../src/utils/filesUtils";
import * as assert from "assert";

const basePath = join("test", "utils", "filesUtils", "testFiles");
const expected = [
	join(basePath, "testDirA"),
	join(basePath, "testDirB"),
	join(basePath, "TestDirC"),
];
describe("utils/filesUtils # getAllDirs", () => {
	const promise = getAllDirs(basePath);
	const expectedFoldersCount = expected.length;
	it(`Should find ${expectedFoldersCount} folders`, async () => {
		const foundDirs = await promise;
		assert.equal(foundDirs.length, expectedFoldersCount);
	});
	for (const expectedDir of expected) {
		it(`Should contain ${expectedDir}`, async () => {
			const foundDirs = await promise;
			assert.equal(foundDirs.includes(expectedDir), true);
		});
	}
});
