import {
	rmdirSync,
	existsSync,
	mkdirSync,
	readdirSync,
	copyFileSync,
	statSync,
} from "fs";
import { join } from "path";

export const ROOT_TEST_FILES_DIR = "test-project";
export function createProject(baseDirPath: string) {
	if (!existsSync(ROOT_TEST_FILES_DIR)) {
		mkdirSync(ROOT_TEST_FILES_DIR);
	}
	deleteProject(baseDirPath);
	copyRecursiveSync(
		join("test", "testProjectFiles"),
		join(ROOT_TEST_FILES_DIR, baseDirPath)
	);
}

export function createSplittedProject(baseDirPath: string) {
	deleteProject(baseDirPath);
}

export function deleteProject(baseDirPath: string) {
	const fullPath = join(ROOT_TEST_FILES_DIR, baseDirPath);
	if (existsSync(fullPath)) {
		rmdirSync(fullPath, { recursive: true });
	}
}

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
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
		console.log("COPNG", src, "to", dest);
		copyFileSync(src, dest);
	}
}
