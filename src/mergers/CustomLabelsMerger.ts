import { join } from "path";
import { rmSync } from "fs";
import Merger from "./Merger";
import { LABELS_EXTENSION, LABELS_ROOT_TAG, XML_NAMESPACE } from "../constants";
import {
	findAllFilesWithExtension,
	readXmlFromFile,
	writeXmlToFile,
} from "../utils/filesUtils";
import CustomLabels from "../metadataTypes/CustomLabels";

export default class CustomLabelsMerger extends Merger<CustomLabels> {
	getOutputFile(inputDir: string): string {
		return join(inputDir, `CustomLabels${LABELS_EXTENSION}`);
	}

	getRootTag = () => LABELS_ROOT_TAG;

	getSplittedExtension = () => LABELS_EXTENSION;

	public async join(inputDir: string, removeSource: boolean) {
		const filesToMerge = await findAllFilesWithExtension(
			inputDir,
			this.getSplittedExtension()
		);
		const outputFile = this.getOutputFile(inputDir);

		const allLabels = [];
		const fullXml = {
			[this.getRootTag()]: {
				$: {
					xmlns: XML_NAMESPACE,
				},
				labels: allLabels,
			},
		};

		for (const file of filesToMerge) {
			const labelsInFile =
				(await readXmlFromFile(file))?.CustomLabels?.labels ?? [];
			for (const label of labelsInFile) {
				allLabels.push(label);
			}
		}

		await writeXmlToFile(
			outputFile,
			this.sortElements(fullXml),
			this.xmlFormatter
		);
		if (removeSource) {
			for (const mergedFile of filesToMerge) {
				if (mergedFile != outputFile) {
					rmSync(mergedFile);
				}
			}
		}
	}
}
