import CustomLabels from "../../src/metadataTypes/CustomLabels";
import CustomLabelsSorter from "../../src/sorters/CustomLabelsSorter";
import * as assert from "assert";
import { equal } from "assert";

describe("sorters/CustomLabelsSorter", () => {
	const customLabels: CustomLabels = {
		labels: [
			{
				fullName: ["beta"],
				categories: ["cat1,cat2,cat3"],
				value: ["Beta label"],
				shortDescription: ["Short description of beta"],
				language: ["en_US"],
				protected: [false],
			},
			{
				fullName: ["a"],
			},
			{
				fullName: ["B"],
			},
		],
	};
	const result = new CustomLabelsSorter().sortMetadata(customLabels);
	it("should not modify custom object", () =>
		assert.deepEqual(customLabels, result));

	const sortedLabels = result.labels;
	equal(sortedLabels[0].fullName[0], "a");
	equal(sortedLabels[1].fullName[0], "B");
	equal(sortedLabels[2].fullName[0], "beta");
});
