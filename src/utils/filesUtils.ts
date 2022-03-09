import { promises, lstatSync } from "fs";
import { join } from "path";
import { parseStringPromise, Builder } from "xml2js";
import { SfdxProject } from "@salesforce/core";

const SKIPPED_FOLDERS = ["node_modules", ".git", ".github"];

export async function findAllFilesWithExtension(
	basePath: string,
	fileExtension: string
): Promise<string[]> {
	const dirs = [];
	const files = [];
	for (const fileOrDir of await promises.readdir(basePath)) {
		const fullFileOrDirPath = join(basePath, fileOrDir);
		const fileOrDirStats = lstatSync(fullFileOrDirPath);
		if (fileOrDirStats.isFile() && fileOrDir.endsWith(fileExtension)) {
			files.push(fullFileOrDirPath);
		} else if (
			fileOrDirStats.isDirectory() &&
			!SKIPPED_FOLDERS.includes(fileOrDir)
		) {
			dirs.push(fullFileOrDirPath);
		}
	}
	const filesInSubFolders = await Promise.all(
		dirs.map((dir) => findAllFilesWithExtension(dir, fileExtension))
	).then((results) => results.flat());

	for (const fileInSubFolder of filesInSubFolders) {
		files.push(fileInSubFolder);
	}

	return files;
}

export async function readXmlFromFile<T>(file: string): Promise<T> {
	return promises
		.readFile(file)
		.then((fileContent) => parseStringPromise(fileContent));
}

export async function writeXmlToFile(
	file: string,
	xml: object,
	indent = "    "
) {
	const builderConfig = {
		renderOpts: {
			pretty: true,
			indent,
			newLine: "\n",
		},
	};
	return promises.writeFile(file, new Builder(builderConfig).buildObject(xml));
}

export function getDefaultFolder(project: SfdxProject): string {
	const allPossibleDirectories = project.getPackageDirectories();
	let defaultFolder;
	if (allPossibleDirectories.length == 0) {
		defaultFolder = allPossibleDirectories[0].path;
	} else {
		defaultFolder = allPossibleDirectories.find((path) => path.default).path;
	}
	return join(project.getPath(), defaultFolder);
}
