import {
	rmdirSync,
	existsSync,
	mkdirSync,
	readdirSync,
	copyFileSync,
	statSync,
} from "fs";
import { join } from "path";
import * as assert from "assert";

export const ROOT_TEST_FILES_DIR = "test-project";
export function createProject(baseDirPath: string) {
	if (!existsSync(ROOT_TEST_FILES_DIR)) {
		mkdirSync(ROOT_TEST_FILES_DIR);
	}
	deleteProject(baseDirPath);
	copyRecursiveSync(
		join("test", "testProjectFiles", "merged"),
		join(ROOT_TEST_FILES_DIR, baseDirPath)
	);
}

export function createSplittedProject(baseDirPath: string) {
	if (!existsSync(ROOT_TEST_FILES_DIR)) {
		mkdirSync(ROOT_TEST_FILES_DIR);
	}
	deleteProject(baseDirPath);
	copyRecursiveSync(
		join("test", "testProjectFiles", "splitted"),
		join(ROOT_TEST_FILES_DIR, baseDirPath)
	);
}

export function deleteProject(baseDirPath: string) {
	const fullPath = join(ROOT_TEST_FILES_DIR, baseDirPath);
	if (existsSync(fullPath)) {
		rmdirSync(fullPath, { recursive: true });
	}
}

function copyRecursiveSync(src, dest) {
	const exists = existsSync(src);
	const stats = exists && statSync(src);
	const isDirectory = exists && stats.isDirectory();
	if (isDirectory) {
		mkdirSync(dest);
		readdirSync(src).forEach(function (childItemName) {
			copyRecursiveSync(join(src, childItemName), join(dest, childItemName));
		});
	} else {
		copyFileSync(src, dest);
	}
}

export function filesShouldExist(files) {
	for (const file of files) {
		assert.equal(existsSync(file), true, `File ${file} doesnt exist`);
	}
}
