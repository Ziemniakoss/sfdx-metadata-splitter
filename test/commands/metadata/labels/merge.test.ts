import { test } from "@salesforce/command/lib/test";
import { createSplittedProject, ROOT_TEST_FILES_DIR } from "../../../testUtils";
import { join } from "path";
import { existsSync, readdirSync } from "fs";
import * as assert from "assert";
import { METADATA_EXTENSIONS } from "../../../../lib/constants";

describe("splitter:labels:merge", () => {
	createSplittedProject("m_l_m");

	const outputDir = join(
		ROOT_TEST_FILES_DIR,
		"m_l_m",
		"main",
		"default",
		"labels"
	);
	const inputDir = join(
		ROOT_TEST_FILES_DIR,
		"m_l_m",
		"main",
		"default",
		"labels"
	);
	test
		.command(["splitter:labels:merge", "-i", inputDir, "-r"])
		.it("Should merge labels", () => {
			assert.equal(
				readdirSync(outputDir).length,
				1,
				"There should be only one file after merging"
			);
			const fullPath = join(
				outputDir,
				`CustomLabels${METADATA_EXTENSIONS.LABELS}`
			);
			assert.equal(existsSync(fullPath), true, "Merged file should exist");
		});
});
