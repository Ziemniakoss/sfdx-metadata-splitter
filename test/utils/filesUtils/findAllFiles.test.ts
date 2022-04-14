import { join } from "path";
import { findAllFiles } from "../../../src/utils/filesUtils";
import * as assert from "assert";

const basePath = join("test", "utils", "filesUtils", "testFiles");

describe("utils/filesUtils # findAllFiles", () => {
	const promise = findAllFiles(basePath);
	it("Should find 8 files", async () => {
		const result = await promise;
		assert.equal(result.length, 10);
	});
});
