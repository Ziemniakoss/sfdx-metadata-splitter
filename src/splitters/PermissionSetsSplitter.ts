import Splitter from "./Splitter";
import { METADATA_EXTENSIONS, ROOT_TAGS, SPLIT_EXTENSIONS } from "../constants";
import { basename, dirname, join } from "path";
import { existsSync, promises } from "fs";
import { readXmlFromFile } from "../utils/filesUtils";

export default class PermissionSetsSplitter extends Splitter {
	getRootTag(): string {
		return ROOT_TAGS.PERMISSION_SETS;
	}

	async split(inputFile: string, deleteSourceFiles: boolean): Promise<any> {
		const permissionSetName = this.getPermissionSetName(inputFile);
		const baseOutputDir = dirname(inputFile);
		if (!existsSync(baseOutputDir)) {
			await promises.mkdir(baseOutputDir);
		}
		const outputDir = join(baseOutputDir, permissionSetName);
		if (!existsSync(outputDir)) {
			await promises.mkdir(outputDir);
		}
		const permissionSetProperties =
			(await readXmlFromFile(inputFile))?.[this.getRootTag()] ?? {};
		const splittingPromise = Promise.all([
			this.splitApplicationVisibilities(permissionSetProperties, outputDir),
			this.splitClassAccesses(permissionSetProperties, outputDir),
			this.splitCustomMetadataTypeAccesses(permissionSetProperties, outputDir),
			this.splitCustomPermissions(permissionSetProperties, outputDir),
			this.splitCustomSettingAccesses(permissionSetProperties, outputDir),
			this.splitExternalDataSourceAccesses(permissionSetProperties, outputDir),
			this.splitFieldPermissions(permissionSetProperties, outputDir),
			this.splitFlowAccesses(permissionSetProperties, outputDir),
			this.splitObjectPermissions(permissionSetProperties, outputDir),
			this.splitPageAccesses(permissionSetProperties, outputDir),
			this.splitRecordTypeVisibilities(permissionSetProperties, outputDir),
			this.splitTabSettings(permissionSetProperties, outputDir),
			this.splitUserPermissions(permissionSetProperties, outputDir),
			this.writePermissionSetProperties(
				permissionSetProperties,
				outputDir,
				permissionSetName
			),
		]);

		if (deleteSourceFiles) {
			return splittingPromise.then(() => promises.rm(inputFile));
		}
		return splittingPromise;
	}

	private async splitApplicationVisibilities(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["application"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"applicationVisibilities"
		);
	}

	private async splitClassAccesses(permissionSetProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["apexClass"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"classAccesses"
		);
	}

	private async splitCustomMetadataTypeAccesses(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"customMetadataTypeAccesses"
		);
	}

	private async splitCustomPermissions(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"customPermissions"
		);
	}

	private async splitCustomSettingAccesses(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"customSettingAccesses"
		);
	}

	private async splitExternalDataSourceAccesses(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["externalDataSource"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"externalDataSourceAccesses"
		);
	}

	private async splitFieldPermissions(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["field"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"fieldPermissions"
		);
	}

	private async splitFlowAccesses(permissionSetProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["flow"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"flowAccesses"
		);
	}

	private async splitObjectPermissions(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["object"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"objectPermissions"
		);
	}

	private async splitPageAccesses(permissionSetProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["apexPage"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"pageAccesses"
		);
	}

	private async splitRecordTypeVisibilities(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["recordType"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"recordTypeVisibilities"
		);
	}

	private async splitTabSettings(permissionSetProperties, outputDir: string) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["tab"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"tabSettings"
		);
	}

	private async splitUserPermissions(
		permissionSetProperties,
		outputDir: string
	) {
		return this.writeSplittedToFiles(
			permissionSetProperties,
			["name"],
			outputDir,
			SPLIT_EXTENSIONS.PERMISSION_SETS,
			"userPermissions"
		);
	}

	private async writePermissionSetProperties(
		permissionSetProperties,
		outputDir: string,
		permissionSetName: string
	) {
		const filePath = join(
			outputDir,
			`${permissionSetName}${SPLIT_EXTENSIONS.PERMISSION_SETS}`
		);
		return this.writeTags(permissionSetProperties, filePath, [
			"description",
			"hasActivationRequired",
			"label",
			"license",
			"userLicense",
		]);
	}

	private getPermissionSetName(inputFile: string) {
		const fileName = basename(inputFile);
		return fileName.replace(METADATA_EXTENSIONS.PERMISSION_SETS, "");
	}
}
