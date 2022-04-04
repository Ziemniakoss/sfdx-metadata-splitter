import { promises, existsSync } from "fs";
import { join } from "path";
import XmlFormatter from "../utils/xmlFormatter";
import { XML_NAMESPACE } from "../constants";
import { writeXmlToFile } from "../utils/filesUtils";

export default abstract class Splitter {
	protected xmlFormatter: XmlFormatter;

	public constructor(xmlFormatter: XmlFormatter) {
		this.xmlFormatter = xmlFormatter;
	}

	/**
	 * Splits input file into multiple.
	 * Output files will be written to folder specified as outputFolder
	 * @param inputFile
	 * @param outputDir
	 */
	abstract split(inputFile: string, outputDir: string): Promise<unknown>;

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
    <profileActionOverrides>
        <actionName>View</actionName>
        <content>Canceled</content>
        <formFactor>Small</formFactor>
        <pageOrSobjectType>Custom_Order__c</pageOrSobjectType>
        <recordType>Custom_Order__c.Canceled</recordType>
        <type>Flexipage</type>
        <profile>CEO</profile>
    </profileActionOverrides>
    <profileActionOverrides>
        <actionName>View</actionName>
        <content>Canceled</content>
        <formFactor>Large</formFactor>
        <pageOrSobjectType>Custom_Order__c</pageOrSobjectType>
        <recordType>Custom_Order__c.Canceled</recordType>
        <type>Flexipage</type>
        <profile>CEO</profile>
    </profileActionOverrides>	 * @param tagName tag name  which we need to extract
	 * @protected
	 */
	protected async writeSplittedToFiles(
		xml,
		keyFields: string[],
		baseOutputDir: string,
		fileExtension: string,
		tagName: string
	) {
		const metadata = xml[tagName];
		if(metadata == null) {
			return
		}
		const outputDir = join(baseOutputDir, tagName);
		if (!existsSync(outputDir)) {
			await promises.mkdir(outputDir);
		}
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
						xmlns: XML_NAMESPACE,
					},

					[tagName]: m,
				},
			};
			allPromises.push(
				promises.writeFile(fullPath, this.xmlFormatter.formatXml(xml))
			);
		}
		return Promise.all(allPromises);
	}

	protected async writeTag(
		xml,
		outputDir: string,
		fileExtension: string,
		tagName: string
	) {
		if (xml[tagName] == null) {
			return;
		}

		const newXml = {
			[this.getRootTag()]: {
				$: {
					xmlns: XML_NAMESPACE,
				},
				[tagName]: xml[tagName],
			},
		};
		const fullPath = join(outputDir, `${tagName}${fileExtension}`);
		return promises.writeFile(fullPath, this.xmlFormatter.formatXml(newXml));
	}

	/**
	 * Write all defined tags to single file
	 *
	 * @param xml
	 * @param outputFile
	 * @param tags list of tags that should be included in created file
	 * @protected
	 */
	protected async writeTags(xml, outputFile: string, tags: string[]) {
		const rootTag = this.getRootTag();
		const outputXml = {
			[rootTag]: {
				$: {
					xmlns: XML_NAMESPACE,
				},
			},
		};
		for (const tag of tags.sort()) {
			const elements = xml[tag];
			if (elements != null) {
				outputXml[rootTag][tag] = elements;
			}
		}
		return writeXmlToFile(outputFile, outputXml, this.xmlFormatter)
	}

	abstract getRootTag(): string;
}
