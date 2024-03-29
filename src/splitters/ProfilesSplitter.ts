import { basename, join } from "path";
import { existsSync, promises } from "fs";
import Splitter from "./Splitter";
import { readXmlFromFile, writeXmlToFile } from "../utils/filesUtils";
import { ROOT_TAGS, SPLIT_EXTENSIONS, XML_NAMESPACE } from "../constants";

export default class ProfilesSplitter extends Splitter {
	getRootTag(): string {
		return ROOT_TAGS.PROFILES;
	}

	async split(inputFile: string, deleteSourceFiles: boolean) {
		const baseOutputDir = this.getBaseDir(inputFile);
		const profileName = this.getProfileName(inputFile);
		const outputDir = join(baseOutputDir, profileName);
		if (!existsSync(outputDir)) {
			await promises.mkdir(outputDir);
		}
		const profileProperties = (await readXmlFromFile(inputFile)).Profile ?? {};
		const splittingPromise = Promise.all([
			this.writeApplicationVisibilities(profileProperties, outputDir),
			this.writeCategoryGroupVisibilities(profileProperties, outputDir),
			this.writeClassAccesses(profileProperties, outputDir),
			this.writeCustomMetadataTypeAccesses(profileProperties, outputDir),
			this.writeCustomPermissions(profileProperties, outputDir),
			this.writeCustomSettingAccesses(profileProperties, outputDir),
			this.writeExternalDataSourceAccesses(profileProperties, outputDir),
			this.writeFieldLevelSecurities(profileProperties, outputDir),
			this.writeFieldPermissions(profileProperties, outputDir),
			this.writeFlowAccesses(profileProperties, outputDir),
			this.writeLayoutAssignments(profileProperties, outputDir),
			this.writeLoginFlows(profileProperties, outputDir),
			this.writeLoginHours(profileProperties, outputDir),
			this.writeLoginIpRanges(profileProperties, outputDir),
			this.writeObjectPermissions(profileProperties, outputDir),
			this.writePageAccesses(profileProperties, outputDir),
			this.writeProfileActionOverrides(profileProperties, outputDir),
			this.writeRecordTypeVisibilities(profileProperties, outputDir),
			this.writeTabVisibilities(profileProperties, outputDir),
			this.writeUserPermissions(profileProperties, outputDir),
			this.writeProfileProperties(profileProperties, outputDir, profileName),
		]);
		if (deleteSourceFiles) {
			return Promise.all([splittingPromise, promises.rm(inputFile)]);
		}
		return splittingPromise;
	}

	private async writeApplicationVisibilities(
		profileProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			profileProperties,
			["application"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"applicationVisibilities"
		);
	}

	private async writeCategoryGroupVisibilities(
		profileProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			profileProperties,
			["application"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"categoryGroupVisibilities"
		);
	}

	private async writeClassAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["apexClass"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"classAccesses"
		);
	}

	private async writeCustomMetadataTypeAccesses(
		profileProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"customMetadataTypeAccesses"
		);
	}

	private async writeCustomPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"customPermissions"
		);
	}

	private async writeCustomSettingAccesses(
		profileProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"customSettingAccesses"
		);
	}

	private async writeExternalDataSourceAccesses(
		profileProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			profileProperties,
			["externalDataSource"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"externalDataSourceAccesses"
		);
	}

	private async writeFieldLevelSecurities(
		profileProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			profileProperties,
			["field"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"fieldLevelSecurities"
		);
	}

	private async writeFieldPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["field"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"fieldPermissions"
		);
	}

	private async writeFlowAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["flow"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"flowAccesses"
		);
	}

	private async writeLayoutAssignments(
		profileProperties,
		baseOutputDir: string
	) {
		const layoutAssignments = profileProperties.layoutAssignments;
		if (layoutAssignments == null) {
			return;
		}
		const outputDir = join(baseOutputDir, "layoutAssignments");
		if (!existsSync(outputDir)) {
			await promises.mkdir(outputDir);
		}
		for (const layoutAssignment of layoutAssignments) {
			const layout = layoutAssignment.layout[0];
			let fileName = layout.substring(0, layout.indexOf("-"));
			if (layoutAssignment.recordType != null) {
				fileName += "." + layoutAssignment.recordType[0];
			}
			fileName += SPLIT_EXTENSIONS.PROFILES;
			const fullPath = join(outputDir, fileName);
			await writeXmlToFile(
				fullPath,
				{
					[this.getRootTag()]: {
						$: {
							xmlns: XML_NAMESPACE,
						},
						layoutAssignments: layoutAssignment,
					},
				},
				this.xmlFormatter
			);
		}
	}

	private async writeLoginFlows(profileProperties, outputDir: string) {
		return this.writeTag(
			profileProperties,
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"loginFlows"
		);
	}

	private async writeLoginHours(profileProperties, outputDir: string) {
		return this.writeTag(
			profileProperties,
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"loginHours"
		);
	}

	private async writeLoginIpRanges(profileProperties, outputDir: string) {
		return this.writeTag(
			profileProperties,
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"loginIpRanges"
		);
	}

	private async writeObjectPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["object"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"objectPermissions"
		);
	}

	private async writePageAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["apexPage"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"pageAccesses"
		);
	}

	private async writeProfileActionOverrides(
		profileProperties,
		outputDir: string
	) {
		return this.writeTag(
			profileProperties,
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"profileActionOverrides"
		);
	}

	private async writeRecordTypeVisibilities(
		profileProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			profileProperties,
			["recordType"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"recordTypeVisibilities"
		);
	}

	private async writeTabVisibilities(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["tab"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"tabVisibilities"
		);
	}

	private async writeUserPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.PROFILES,
			"userPermissions"
		);
	}

	private async writeProfileProperties(
		profileProperties,
		outputDir: string,
		profileName: string
	) {
		const filepath = join(
			outputDir,
			`${profileName}${SPLIT_EXTENSIONS.PROFILES}`
		);
		return this.writeTags(profileProperties, filepath, [
			"custom",
			"description",
			"fullname",
			"userLicense",
		]);
	}

	getProfileName(inputFile: string) {
		const fileName = basename(inputFile);
		let dotsCount = 0;
		for (let i = fileName.length - 1; i > 0; i--) {
			if (fileName[i] === ".") {
				dotsCount++;
			}
			if (dotsCount == 2) {
				return fileName.substring(0, i);
			}
		}
	}
}
