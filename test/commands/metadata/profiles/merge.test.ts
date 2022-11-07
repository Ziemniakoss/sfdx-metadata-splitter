import { test } from "@salesforce/command/lib/test";
import {
	createSplittedProject,
	filesShouldExist,
	ROOT_TEST_FILES_DIR,
} from "../../../testUtils";
import { join } from "path";

const PROJECT_BASE = "m_p_m";

describe("splitter:profiles:merge", () => {
	createSplittedProject(PROJECT_BASE);
	const outputFile = join(
		ROOT_TEST_FILES_DIR,
		PROJECT_BASE,
		"main",
		"default",
		"profiles",
		"TestProfile.profile-meta.xml"
	);
	const profileDir = join(
		ROOT_TEST_FILES_DIR,
		PROJECT_BASE,
		"main",
		"default",
		"profiles",
		"TestProfile"
	);

	test
		.command(["splitter:profiles:merge", "-i", profileDir, "-r"])
		.it("Should merge profile", () => {
			filesShouldExist([outputFile]);
		});
});
