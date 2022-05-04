import { dirname, join } from "path";
import { promises } from "fs";
import Splitter from "./Splitter";
import { readXmlFromFile, writeXmlToFile } from "../utils/filesUtils";
import { LABELS_EXTENSION, LABELS_ROOT_TAG, XML_NAMESPACE } from "../constants";
import CustomLabels from "../metadataTypes/CustomLabels";

export default class CustomLabelsSplitter extends Splitter<CustomLabels> {
	getRootTag(): string {
		return LABELS_ROOT_TAG;
	}

	async split(inputFile: string, deleteSourceFiles: boolean) {
		const xml = await readXmlFromFile(inputFile);
		const outputDir = dirname(inputFile);
		const labels = xml.CustomLabels?.labels ?? [];

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
		const fileName = join(outputDir, `${labelName}${LABELS_EXTENSION}`);
		await writeXmlToFile(
			fileName,
			this.metadataSorter.sortMetadata(fullXml),
			this.xmlFormatter
		);
		return fileName;
	}
}
