import { flags, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { PLUGIN_NAME, PROFILES_EXTENSION } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import ProfilesSplitter from "../../../splitters/ProfilesSplitter";
import XmlFormatter from "../../../utils/xmlFormatter";
import { basename } from "path";
import {
	findAllFilesWithExtension,
	getDefaultFolder,
} from "../../../utils/filesUtils";
import * as path from "path";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "profiles_split");

export default class SplitProfiles extends SfdxCommand {
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
		messages.getMessage("example_splitAll"),
		messages.getMessage("example_splitAllAndRemoveSource"),
		messages.getMessage("example_splitOnlyOneProfile"),
	];

	async run() {
		const filesToSplit = await this.getFilesToSplit();
		const splitter = new ProfilesSplitter(XmlFormatter.fromFlags(this.flags));
		this.ux.startSpinner(messages.getMessage("splitting"));
		for (const file of filesToSplit) {
			const fileName = basename(file);
			this.ux.setSpinnerStatus(fileName);
			await splitter.split(file, path.dirname(file));
			this.ux.log(fileName);
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
}
