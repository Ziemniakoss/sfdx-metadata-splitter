import { flags, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { PLUGIN_NAME, PROFILES_EXTENSION } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import XmlFormatter from "../../../utils/xmlFormatter";
import { basename, join } from "path";
import {
	findAllFilesWithExtension,
	getAllDirs,
	getDefaultFolder,
} from "../../../utils/filesUtils";
import * as path from "path";
import ProfilesMerger from "../../../mergers/ProfilesMerger";
import { rmSync } from "fs";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "profiles_merge");

export default class MergeProfiles extends SfdxCommand {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;
	public static flagsConfig = {
		remove: flags.boolean({
			description: messages.getMessage("flag_remove"),
			char: "r",
		}),
		input: flags.string({
			description: messages.getMessage("flag_input"),
			char: "i",
		}),
		...FORMATTING_FLAGS,
	};

	public static examples = [
		messages.getMessage("example_mergeAll"),
		messages.getMessage("example_mergeAllAndRemoveSource"),
		messages.getMessage("example_mergeOnlyOneProfile"),
	];

	async run() {
		const merger = new ProfilesMerger(XmlFormatter.fromFlags(this.flags));
		const foldersToMerge = await this.getDirsToMerge();

		this.ux.startSpinner(messages.getMessage("merging"));
		for (const profileFolder of foldersToMerge) {
			const folderName = basename(profileFolder);
			this.ux.setSpinnerStatus(folderName);
			const parentFolder = path.dirname(profileFolder);
			const outputFile = join(
				parentFolder,
				`${folderName}${PROFILES_EXTENSION}`
			);
			await merger.join(profileFolder, outputFile);
			if (this.flags.remove) {
				rmSync(profileFolder, { recursive: true });
			}
			this.ux.log(`${folderName} (${profileFolder})`);
		}
		this.ux.stopSpinner(messages.getMessage("done"));
	}

	public async getFilesToSplit(): Promise<string[]> {
		if (this.flags["input"]) {
			return [this.flags["input"]];
		}
		return findAllFilesWithExtension(
			getDefaultFolder(this.project),
			PROFILES_EXTENSION
		);
	}

	async getDirsToMerge(): Promise<string[]> {
		if (this.flags.input != null) {
			return this.flags.input.split(",");
		}
		const profilesFolder = join(
			getDefaultFolder(this.project),
			"main",
			"default",
			"profiles"
		);
		return getAllDirs(profilesFolder);
	}
}
