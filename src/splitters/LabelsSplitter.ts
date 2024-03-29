import { dirname, join } from "path";
import { promises } from "fs";
import Splitter from "./Splitter";
import { readXmlFromFile, writeXmlToFile } from "../utils/filesUtils";
import { METADATA_EXTENSIONS, ROOT_TAGS, XML_NAMESPACE } from "../constants";

export default class LabelsSplitter extends Splitter {
	getRootTag(): string {
		return ROOT_TAGS.LABELS;
	}

	async split(inputFile: string, deleteSourceFiles: boolean) {
		const xml = await readXmlFromFile(inputFile);
		const outputDir = dirname(inputFile);
		const labels = xml[this.getRootTag()]?.labels ?? [];

		const splittedFiles = await Promise.all(
			labels.map((label) => this.writeLabel(label, outputDir))
		);
		if (deleteSourceFiles && !splittedFiles.includes(inputFile)) {
			return promises.rm(inputFile);
		}
	}

	async writeLabel(label, outputDir: string): Promise<string> {
		const fullXml = {
			[this.getRootTag()]: {
				$: {
					xmlns: XML_NAMESPACE,
				},
				labels: label,
			},
		};
		const labelName = label.fullName[0];
		const fileName = join(
			outputDir,
			`${labelName}${METADATA_EXTENSIONS.LABELS}`
		);
		await writeXmlToFile(fileName, fullXml, this.xmlFormatter);
		return fileName;
	}
}
