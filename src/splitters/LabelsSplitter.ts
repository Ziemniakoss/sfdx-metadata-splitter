import Splitter from "@splitters//Splitter";
import { LABELS_EXTENSION, XML_NAMESPACE } from "@constants";
import { dirname, join } from "path";
import { readXmlFromFile, writeXmlToFile } from "@utils/filesUtils";

export default class LabelsSplitter extends Splitter {
	getRootTag(): string {
		return "CustomLabels";
	}

	async split(inputFile: string): Promise<unknown> {
		const xml = await readXmlFromFile(inputFile);
		const outputDir = dirname(inputFile);
		const labels = xml.CustomLabels?.labels ?? [];
		return Promise.all(
			labels.map((label) => this.writeLabel(label, outputDir))
		);
	}

	async writeLabel(label, outputDir: string) {
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
		return writeXmlToFile(fileName, fullXml, this.xmlFormatter);
	}
}
