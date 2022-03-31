import { promises, existsSync } from "fs";
import { join } from "path";
import XmlFormatter from "../utils/xmlFormatter";
import { XML_NAMESPACE } from "../constants";

export default abstract class Splitter {
	protected xmlFormatter: XmlFormatter;

	protected constructor(xmlFormatter: XmlFormatter) {
		this.xmlFormatter = xmlFormatter;
	}

	/**
	 * Splits input file into multiple.
	 * Output files will be written to folder specified as outputFolder
	 * @param inputFile
	 * @param outputDir
	 */
	abstract split(inputFile: string, outputDir: string): Promise<unknown>

	/**
	 * Split metadata into separate files.
	 * File will be named after all keyFields concentrated with dot.
	 *
	 * @param xml raw xml
	 * @param keyFields key fields which combination should be unique for every element in metadata array.
	 * For example, if we would split CustomLabels, we would use array
	 * ```
	 * ["fullName"]
	 * ```
	 * @param baseOutputDir base output dir
	 * @param fileExtension extension added after all key fields are concentrated with dot
	 * @param tagName tag name  which we need to extract
	 * @protected
	 */
	protected async writeSplittedToFiles(xml, keyFields: string[], baseOutputDir: string, fileExtension: string, tagName: string) {
		const outputDir = join(baseOutputDir, tagName)
		if (!existsSync(outputDir)) {
			await promises.mkdir(outputDir);
		}
		const metadata = xml[tagName] ?? []
		const allPromises = [];
		for (const m of metadata) {
			let fileName = "";
			for (const keyField of keyFields) {
				let keyValue = m[keyField][0] ?? "";
				if (keyValue && fileName) {
					fileName += "." + keyValue;
				} else if (keyValue) {
					fileName = keyValue;
				}
			}
			const fullPath = join(outputDir, fileName + fileExtension);
			const xml = {
				[this.getRootTag()]: {
					$: {
						xmlns: XML_NAMESPACE
					},

					[tagName]: m
				}
			};
			allPromises.push(promises.writeFile(fullPath, this.xmlFormatter.formatXml(xml)));
		}
		return Promise.all(allPromises);
	}

	abstract getRootTag(): string
}
