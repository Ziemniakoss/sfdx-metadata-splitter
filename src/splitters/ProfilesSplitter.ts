import { basename, join } from "path";
import { existsSync, promises } from "fs";
import Splitter from "./Splitter";
import { readXmlFromFile, writeXmlToFile } from "../utils/filesUtils";
import {
	PROFILES_ROOT_TAG,
	SPLITTED_PROFILES_EXTENSION,
	XML_NAMESPACE,
} from "../constants";
import Profile from "../metadataTypes/Profile";

export default class ProfilesSplitter extends Splitter<Profile> {
	getRootTag(): string {
		return PROFILES_ROOT_TAG;
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

	async writeApplicationVisibilities(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["application"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"applicationVisibilities"
		);
	}

	async writeCategoryGroupVisibilities(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["application"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"categoryGroupVisibilities"
		);
	}

	async writeClassAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["apexClass"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"classAccesses"
		);
	}

	async writeCustomMetadataTypeAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"customMetadataTypeAccesses"
		);
	}

	async writeCustomPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"customPermissions"
		);
	}

	async writeCustomSettingAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"customSettingAccesses"
		);
	}

	async writeExternalDataSourceAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["externalDataSource"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"externalDataSourceAccesses"
		);
	}

	async writeFieldLevelSecurities(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["field"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"fieldLevelSecurities"
		);
	}

	async writeFieldPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["field"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"fieldPermissions"
		);
	}

	async writeFlowAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["flow"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"flowAccesses"
		);
	}

	async writeLayoutAssignments(profileProperties, baseOutputDir: string) {
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
			fileName += SPLITTED_PROFILES_EXTENSION;
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

	async writeLoginFlows(profileProperties, outputDir: string) {
		return this.writeTag(
			profileProperties,
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"loginFlows"
		);
	}

	async writeLoginHours(profileProperties, outputDir: string) {
		return this.writeTag(
			profileProperties,
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"loginHours"
		);
	}

	async writeLoginIpRanges(profileProperties, outputDir: string) {
		return this.writeTag(
			profileProperties,
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"loginIpRanges"
		);
	}

	async writeObjectPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["object"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"objectPermissions"
		);
	}

	async writePageAccesses(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["apexPage"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"pageAccesses"
		);
	}

	async writeProfileActionOverrides(profileProperties, outputDir: string) {
		return this.writeTag(
			profileProperties,
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"profileActionOverrides"
		);
	}

	async writeRecordTypeVisibilities(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["recordType"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"recordTypeVisibilities"
		);
	}

	async writeTabVisibilities(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["tab"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"tabVisibilities"
		);
	}

	async writeUserPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"userPermissions"
		);
	}

	async writeProfileProperties(
		profileProperties,
		outputDir: string,
		profileName: string
	) {
		const filepath = join(
			outputDir,
			`${profileName}${SPLITTED_PROFILES_EXTENSION}`
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
