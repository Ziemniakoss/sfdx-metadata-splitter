import { test } from "@salesforce/command/lib/test";
import { createProject, ROOT_TEST_FILES_DIR } from "../../../testUtils";
import { join } from "path";
import { readdirSync } from "fs";
import * as assert from "assert";

describe("metadata:labels:split", () => {
	createProject("m_l_s");

	const outputPath = join(
		ROOT_TEST_FILES_DIR,
		"m_l_s",
		"main",
		"default",
		"labels"
	);
	const inputDir = join(
		ROOT_TEST_FILES_DIR,
		"m_l_s",
		"main",
		"default",
		"labels",
		"CustomLabels.labels-meta.xml"
	);
	test
		.command(["metadata:labels:split", "-i", inputDir, "-r"])
		.it("Should create 2 files", () => {
			assert.equal(readdirSync(outputPath).length, 2);
		});
});
