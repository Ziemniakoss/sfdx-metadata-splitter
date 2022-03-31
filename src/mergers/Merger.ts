import XmlFormatter from "../utils/xmlFormatter";
import {
	findAllFilesWithExtension,
	readXmlFromFile,
	writeXmlToFile,
} from "../utils/filesUtils";
import { XML_NAMESPACE } from "../constants";

export default abstract class Merger {
	protected xmlFormatter: XmlFormatter;

	public constructor(xmlFormatter: XmlFormatter) {
		this.xmlFormatter = xmlFormatter;
	}

	public async join(inputDir: string, outputFile: string): Promise<any> {
		const filesToMerge = await findAllFilesWithExtension(
			inputDir,
			this.getSplittedExtension()
		);
		const rootTag = this.getRootTag();
		const mergedXml = {
			[rootTag]: {
				$: {
					xmlns: XML_NAMESPACE,
				},
			},
		};

		for (let i = 0; i < filesToMerge.length; i++) {
			const file = filesToMerge[i];
			const xmlToMerge = await readXmlFromFile(file);
			const contents = xmlToMerge[rootTag] ?? {};
			for (const key of Object.keys(contents)) {
				if (key == "$") {
					continue;
				}
				let elementsWithSameTag: [] = mergedXml[rootTag][key];
				if (elementsWithSameTag == null) {
					elementsWithSameTag = [];
					mergedXml[rootTag][key] = elementsWithSameTag;
				}
				for (const element of contents[key]) {
					// @ts-ignore
					elementsWithSameTag.push(element);
				}
			}
		}
		return writeXmlToFile(
			outputFile,
			this.sortElements(mergedXml),
			this.xmlFormatter
		);
	}

	public sortElements(xml) {
		return xml;
	}

	abstract getRootTag(): string;

	abstract getSplittedExtension(): string;
}
