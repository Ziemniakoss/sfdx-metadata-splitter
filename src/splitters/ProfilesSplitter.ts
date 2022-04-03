import Splitter from "./Splitter";
import { SPLITTED_PROFILES_EXTENSION } from "../constants";

export default class ProfilesSplitter extends Splitter {
	getRootTag(): string {
		return "Profile";
	}

	split(inputFile: string, outputDir: string): Promise<unknown> {
		return Promise.resolve(undefined);
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

	async writeLayoutAssignments(profileProperties, outputDir: string) {
		//TODO custom file names
		return this.writeSplittedToFiles(
			profileProperties,
			["recordType", "layout"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"layoutAssignments"
		);
	}

	async writeLoginFlows(profileProperties, outputDir: string) {
		//TODO custom

	}

	async writeLoginHours(profileProperties, outputDir: string) {
		//todo custom file names
	}

	async writeLoginIpRanges(profileProperties, outputDir: string) {
		//todo custom file name
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
		//TODO
	}

	async writeRecordTypeVisibilities(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["recordType"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"recordTypeVisibilities"
		)
	}

	async writeTabVisibilities(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["tab"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"tabVisibilities"
		)
	}

	async writeUserPermissions(profileProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			profileProperties,
			["name"],
			outputDir,
			SPLITTED_PROFILES_EXTENSION,
			"userPermissions"
		)
	}

	async writeProfileProperties(profileProperties, outputDir: string) {
		//custom
		//description
		//fullname
		//userLicense
	}
}
