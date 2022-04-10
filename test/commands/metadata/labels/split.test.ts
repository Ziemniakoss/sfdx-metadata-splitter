import { test } from "@salesforce/command/lib/test";
import { createProject, ROOT_TEST_FILES_DIR } from "../../../testUtils";
import { join } from "path";
import { readdirSync } from "fs";
import * as assert from "assert";

describe("metadata:labels:split", () => {
	createProject("m_l_s");
	const fileToSplit = join(
		ROOT_TEST_FILES_DIR,
		"m_l_s",
		"main",
		"default",
		"labels",
		"CustomLabels.labels-meta.xml"
	);
	const outputPath = join(
		ROOT_TEST_FILES_DIR,
		"m_l_s",
		"main",
		"default",
		"labels"
	);
	test
		.command([
			"metadata:labels:split",
			"-i",
			fileToSplit,
			"-o",
			outputPath,
			"-r",
		])
		.it("Should create 2 files", (ctx) => {
			assert.equal(readdirSync(outputPath).length, 2);
		});
});
