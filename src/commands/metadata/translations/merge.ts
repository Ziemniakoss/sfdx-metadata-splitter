import { flags, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { getAllDirs, getDefaultFolder } from "../../../utils/filesUtils";
import { basename, join } from "path";
import TranslationsMerger from "../../../mergers/TranslationsMerger";
import XmlFormatter from "../../../utils/xmlFormatter";
import * as path from "path";
import { rmSync } from "fs";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(
	"sfdx-metadata-splitter",
	"translations_merge"
);

export default class MergeTranslations extends SfdxCommand {
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
		messages.getMessage("example_mergeAllAndRemove"),
		messages.getMessage("example_mergeOnlyOne"),
	];

	public async run() {
		const merger = new TranslationsMerger(XmlFormatter.fromFlags(this.flags));
		const translationFolders = await this.getInputDirs();

		this.ux.startSpinner("Merging translations");
		for (const folder of translationFolders) {
			const baseNameOfFolder = basename(folder);
			this.ux.setSpinnerStatus(baseNameOfFolder);
			const parentDirName = path.dirname(folder);
			const outputFileName = join(
				parentDirName,
				`${baseNameOfFolder}.translation-meta.xml`
			);
			await merger.join(folder, outputFileName);
			if (this.flags.remove) {
				rmSync(folder, { recursive: true });
			}
			this.ux.log(`${baseNameOfFolder} (${folder})`);
		}
		this.ux.stopSpinner();
	}

	private async getInputDirs(): Promise<string[]> {
		if (this.flags.input != null) {
			return [this.flags.input];
		}
		const defaultPath = getDefaultFolder(this.project);
		const translationsFolder = join(
			defaultPath,
			"main",
			"default",
			"translations"
		);
		return getAllDirs(translationsFolder);
	}
}
