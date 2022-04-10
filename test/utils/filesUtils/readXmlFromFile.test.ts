import { join } from "path";
import { readXmlFromFile } from "../../../src/utils/filesUtils";
import * as assert from "assert";

const filePath = join("test", "utils", "filesUtils", "testFiles", "Example.xml");
describe("utils/filesUtils # readXmlFromFile", () => {
	const readingPromise = readXmlFromFile(filePath);
	it("Should have CustomLabels root tag", async () => {
	const xml = await readingPromise;
		assert.notEqual(null, xml.CustomLabels);
	});
	it("Should contain 2 labels", async () => {
		const xml = await readingPromise;
		const labels = xml.CustomLabels?.labels ?? [];
		assert.equal(labels.length, 2);

	});

});
