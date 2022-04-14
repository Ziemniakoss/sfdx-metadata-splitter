import { test } from "@salesforce/command/lib/test";
import {
	createProject,
	filesShouldExist,
	ROOT_TEST_FILES_DIR,
} from "../../../testUtils";
import { join } from "path";
import { readdirSync } from "fs";
import * as assert from "assert";
import { SPLITTED_PROFILES_EXTENSION } from "../../../../src/constants";

const PROJECT_BASE = "m_p_s";

describe("metadata:profiles:split", () => {
	createProject(PROJECT_BASE);
	const fileToSplit = join(
		ROOT_TEST_FILES_DIR,
		PROJECT_BASE,
		"main",
		"default",
		"profiles",
		"TestProfile.profile-meta.xml"
	);
	const outputPath = join(
		ROOT_TEST_FILES_DIR,
		"m_p_s",
		"main",
		"default",
		"profiles",
		"TestProfile"
	);
	test
		.command(["metadata:profiles:split", "-i", fileToSplit, "-r"])
		.it("Should split profile", () => {
			assert.equal(readdirSync(outputPath).length, 10);
			validateFieldPermissions(outputPath);
			validateLayoutAssignments(outputPath);
			validateObjectPermissions(outputPath);
		});
});

function validateFieldPermissions(splittedProfileDir) {
	const fieldPermissionsFiles = [
		join(
			splittedProfileDir,
			"fieldPermissions",
			`Contact.AccountId${SPLITTED_PROFILES_EXTENSION}`
		),
	];
	filesShouldExist(fieldPermissionsFiles);
}

function validateLayoutAssignments(splittedProfileDir) {
	const layoutPermissionFiles = [
		join(
			splittedProfileDir,
			"layoutAssignments",
			`Account${SPLITTED_PROFILES_EXTENSION}`
		),
		join(
			splittedProfileDir,
			"layoutAssignments",
			`Account.Special Account${SPLITTED_PROFILES_EXTENSION}`
		),
	];
	filesShouldExist(layoutPermissionFiles);
}

function validateObjectPermissions(splittedProfileDir) {
	const objectPermissionFiles = [join(splittedProfileDir, "objectPermissions")];
	filesShouldExist(objectPermissionFiles);
}
