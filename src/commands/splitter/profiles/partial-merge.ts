import { flags, SfdxCommand } from "@salesforce/command";
import { basename, dirname, join } from "path";
import { existsSync, promises } from "fs";
import {
	findAllFilesWithExtension,
	getAllDirs,
	readXmlFromFile,
} from "../../../utils/filesUtils";
import {
	PROFILES_EXTENSION,
	PROFILES_ROOT_TAG,
	SPLITTED_PROFILES_EXTENSION,
	XML_NAMESPACE,
} from "../../../constants";
import XmlFormatter from "../../../utils/xmlFormatter";

interface MetadataSelection {
	applicationVisibilities: Set<string>;
	classAccesses: Set<string>;
	fieldPermissions: Set<string>;
	objectPermissions: Set<string>;
	recordTypeVisibilities: Set<string>;
	tabVisibilities: Set<string>;
}

interface SimplifiedPackage {
	profiles: Set<string>;
	metadata: MetadataSelection;
}

export default class PartiallyMergeProfile extends SfdxCommand {
	public static description = "Create partial profile";
	public static requiresProject = true;
	public static flagsConfig = {
		metadata: flags.array({
			char: "m",
			description: "Similar to sfdx force:source:deploy m flag",
			required: true,
		}),
	};

	public static examples = [
		"Create partial Admin profile with permissions for Account SObject and all its fields\n$ sfdx splitter:profiles:partial-merge -m Profile:Admin,CustomObject:Account",
		"Create all partial profiles with  all Apex classes support\n$ sfdx splitter:profiles:partial-merge -m Profile:*,ApexClass:*",
	];

	async run() {
		const metadataToInclude = this.a();
		const profilesDirs = await this.getFoldersProfiles(
			metadataToInclude.profiles
		);

		this.ux.startSpinner("Creating partial profiles");
		await Promise.all(
			profilesDirs.map((profileDir) =>
				this.createPartialProfile(metadataToInclude.metadata, profileDir)
			)
		);
		this.ux.stopSpinner("may your next deploy be successful");
	}

	private async getFoldersProfiles(
		profileNames: Set<string>
	): Promise<string[]> {
		const allFoldersWithProfiles = this.project
			.getPackageDirectories()
			.map((packageDir) =>
				join(packageDir.fullPath, "main", "default", "profiles")
			)
			.filter((profilesFolder) => existsSync(profilesFolder));
		const allProfilesFolders = (
			await Promise.all(
				allFoldersWithProfiles.map((folder) => getAllDirs(folder))
			)
		).flat();
		if (profileNames.has("*")) {
			return allProfilesFolders;
		}
		return allProfilesFolders.filter((folder) =>
			profileNames.has(basename(folder))
		);
	}

	private async createPartialProfile(
		metadataToInclude: MetadataSelection,
		profileFolder: string
	) {
		const [
			classAccesses,
			fieldPermissions,
			objectPermissions,
			recordTypeVisibilities,
			tabVisibilities,
		] = await Promise.all([
			this.getAllPermissions(metadataToInclude, profileFolder, "classAccesses"),
			this.getAllFieldsPermissions(metadataToInclude, profileFolder),
			this.getAllPermissions(
				metadataToInclude,
				profileFolder,
				"objectPermissions"
			),
			this.getAllPermissions(
				metadataToInclude,
				profileFolder,
				"recordTypeVisibilities"
			),
			this.getAllPermissions(
				metadataToInclude,
				profileFolder,
				"tabVisibilities"
			),
		]);
		const profile = {
			[PROFILES_ROOT_TAG]: {
				$: {
					xmlns: XML_NAMESPACE,
				},
				classAccesses,
				fieldPermissions,
				objectPermissions,
				recordTypeVisibilities,
				tabVisibilities,
			},
		};
		const xml = new XmlFormatter({}).formatXml(profile);
		const outputFile = join(
			dirname(profileFolder),
			`${basename(profileFolder)}${PROFILES_EXTENSION}`
		);
		return promises.writeFile(outputFile, xml);
	}

	private async getAllPermissions(
		metadataToInclude: MetadataSelection,
		profileFolder: string,
		permissionsType: keyof MetadataSelection
	) {
		const scannedFolder = join(profileFolder, permissionsType);
		if (!existsSync(scannedFolder)) {
			return [];
		}
		const allFilesWithPermissions = await findAllFilesWithExtension(
			scannedFolder,
			SPLITTED_PROFILES_EXTENSION
		);
		let includedFiles: string[];
		if (metadataToInclude[permissionsType].has("*")) {
			includedFiles = allFilesWithPermissions;
		} else {
			includedFiles = allFilesWithPermissions.filter((file) => {
				const fileName = basename(file);
				const permissionTarget = fileName
					.substring(0, fileName.length - SPLITTED_PROFILES_EXTENSION.length)
					.toLowerCase();
				return metadataToInclude[permissionsType].has(permissionTarget);
			});
		}
		const rawPermissions = (
			await Promise.all(includedFiles.map((file) => readXmlFromFile(file)))
		).flat();
		return rawPermissions
			.map((raw) => (raw.Profile ?? {})[permissionsType] ?? [])
			.flat();
	}

	private async getAllFieldsPermissions(
		metadataToInclude: MetadataSelection,
		profileFolder: string
	) {
		const scannedFolder = join(profileFolder, "fieldPermissions");
		if (!existsSync(scannedFolder)) {
			return [];
		}
		const allFieldsPermissionsFiles = await findAllFilesWithExtension(
			scannedFolder,
			SPLITTED_PROFILES_EXTENSION
		);
		let includedFiles: string[];
		if (
			metadataToInclude.objectPermissions.has("*") ||
			metadataToInclude.fieldPermissions.has("*")
		) {
			includedFiles = allFieldsPermissionsFiles;
		} else {
			includedFiles = allFieldsPermissionsFiles.filter((file) => {
				const [sObjectName, fieldName] = basename(file)
					.split(".")
					.map((part) => part.toLowerCase());
				return (
					metadataToInclude.objectPermissions.has(sObjectName) ||
					metadataToInclude.fieldPermissions.has(`${sObjectName}.${fieldName}`)
				);
			});
		}
		const rawPermissions = await Promise.all(
			includedFiles.map((file) => readXmlFromFile(file))
		);
		return rawPermissions
			.map((raw) => raw.Profile?.fieldPermissions ?? [])
			.flat();
	}

	private a(): SimplifiedPackage {
		const metadata: string[][] = this.flags.metadata.map((m) => {
			const splitted = m.split(":");
			return [splitted[0], splitted.splice(1).join(":")];
		});
		const result: SimplifiedPackage = {
			profiles: new Set(),
			metadata: {
				applicationVisibilities: new Set(),
				classAccesses: new Set(),
				fieldPermissions: new Set(),
				objectPermissions: new Set(),
				recordTypeVisibilities: new Set(),
				tabVisibilities: new Set(),
			},
		};
		for (const m of metadata) {
			const [type, value] = m.map((part) => part.toLowerCase());
			switch (type) {
				case "profile":
					result.profiles.add(value);
					break;
				case "customobject":
					result.metadata.objectPermissions.add(value);
					break;
				case "customfield":
					result.metadata.fieldPermissions.add(value);
					break;
				case "apexclass":
					result.metadata.classAccesses.add(value);
					break;
				case "customtab":
					result.metadata.tabVisibilities.add(value);
					break;
				default:
					throw Error(`Unknown metadata type ${type}`);
			}
		}
		return result;
	}
}
