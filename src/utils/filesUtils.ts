import { promises, lstatSync } from "fs";
import { join } from "path";
import { parseStringPromise } from "xml2js";
import { SfdxProject } from "@salesforce/core";
import XmlFormatter from "./xmlFormatter";

const SKIPPED_FOLDERS = ["node_modules", ".git", ".github"];

export async function findAllFilesWithExtension(
	basePath: string,
	fileExtension: string
): Promise<string[]> {
	const allFiles = await findAllFiles(basePath);
	console.log(allFiles);
	const filesWithExtension = [];
	for(const file of allFiles) {
		if(file.endsWith(fileExtension)) {
			console.log("yes")
			filesWithExtension.push(file)
		}
	}
	return filesWithExtension;
}

export async function findAllFiles(basePath:string) {
	const dirs = [];
	const files = [];
	for (const fileOrDir of await promises.readdir(basePath)) {
		const fullFileOrDirPath = join(basePath, fileOrDir);
		const fileOrDirStats = lstatSync(fullFileOrDirPath);
		if (fileOrDirStats.isFile()) {
			files.push(fullFileOrDirPath);
		} else if (
			fileOrDirStats.isDirectory() &&
			!SKIPPED_FOLDERS.includes(fileOrDir)
		) {
			dirs.push(fullFileOrDirPath);
		}
	}
	const filesInSubFolders = await Promise.all(
		dirs.map((dir) => findAllFiles(dir))
	).then((results) => results.flat());

	for (const fileInSubFolder of filesInSubFolders) {
		files.push(fileInSubFolder);
	}

	return files;
}

export async function getAllDirs(path:string):Promise<string[]> {
	const dirs = [];
	for(const fileOrDir of await promises.readdir(path)) {
		const fullPath = join(path, fileOrDir)
		const fileOrDirStats = lstatSync(fullPath)
		if(fileOrDirStats.isDirectory()) {
			dirs.push(fullPath)
		}
	}
	return dirs;
}

export async function readXmlFromFile<T>(file: string): Promise<T> {
	return promises
		.readFile(file)
		.then((fileContent) => parseStringPromise(fileContent))
}

export async function writeXmlToFile(
	file: string,
	xml: object,
	xmlFormatter:XmlFormatter
) {
	return promises.writeFile(file, xmlFormatter.formatXml(xml));
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
