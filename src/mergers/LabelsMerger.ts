import Merger from "./Merger";
import { LABELS_EXTENSION, XML_NAMESPACE } from "../constants";
import { join } from "path";
import { findAllFilesWithExtension, readXmlFromFile, writeXmlToFile } from "../utils/filesUtils";
import { rmSync } from "fs";

export default class LabelsMerger extends Merger {
	getOutputFile(inputDir: string): string {
		return join(inputDir, `CustomLabels${LABELS_EXTENSION}`);
	}

	getRootTag(): string {
		return "CustomLabels";
	}

	getSplittedExtension(): string {
		return LABELS_EXTENSION;
	}

	public async join(inputDir:string, removeSource:boolean) {
		const filesToMerge = await findAllFilesWithExtension(inputDir, this.getSplittedExtension())
		const outputFile = this.getOutputFile(inputDir)

		const allLabels = [];
		const fullXml = {
			[this.getRootTag()]: {
				$:{
					xmlns:XML_NAMESPACE
				},
				labels:allLabels
			}
		}

		for(const file of filesToMerge) {
			const labelsInFile = (await readXmlFromFile(file))?.CustomLabels?.labels ??[]
			for(const label of labelsInFile) {
				allLabels.push(label)
			}
		}

		await writeXmlToFile(outputFile, fullXml, this.xmlFormatter)
		if(removeSource) {
			for(const mergedFile of filesToMerge) {
				if(mergedFile != outputFile) {
					rmSync(mergedFile)
				}
			}
		}
	}
}
