import { flags, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { PLUGIN_NAME, TRANSLATIONS_EXTENSION } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import XmlFormatter from "../../../utils/xmlFormatter";
import { join, basename } from "path";
import { findAllFilesWithExtension, getDefaultFolder } from "../../../utils/filesUtils";
import TranslationsSplitter from "../../../splitters/TranslationsSplitter";
import { rmSync } from "fs";


Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(
	PLUGIN_NAME,
	"translations_split"
);

export default class SplitTranslations extends SfdxCommand {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;

	public static flagsConfig = {
		"output-folder": flags.string({
			description: messages.getMessage("flag_output"),
			char: "o",
		}),
		input: flags.string({
			description: messages.getMessage("flag_input"),
			char: "i",
		}),
		"remove-input-file": flags.boolean({
			description: messages.getMessage("flag_remove"),
			char: "r",
		}),
		...FORMATTING_FLAGS
	};

	public async run() {
		const baseOutputFolder = await this.getBaseOutputFolder()
		const inputFiles = await  this.getSourceFiles()
		const xmlFormatter = XmlFormatter.fromFlags(this.flags)
		const translationSplitter = new TranslationsSplitter(xmlFormatter)
		this.ux.startSpinner(messages.getMessage("splitting"))
		for(const file of inputFiles) {
			const fileName = basename(file)
			this.ux.setSpinnerStatus(fileName)
			await translationSplitter.split(file, baseOutputFolder)
			if(this.flags["remove-input-file"]) {
				rmSync(file)
			}
			this.ux.log(file)
		}
		this.ux.stopSpinner(messages.getMessage("done_message"))
	}

	public async getBaseOutputFolder():Promise<string>{
		if(this.flags["output-folder"]) {
			return this.flags["output-folder"]
		}
		return join(getDefaultFolder(this.project), "main", "default", "translations")
	}

	public async getSourceFiles():Promise<string[]> {
		if(this.flags["input"]) {
			return [this.flags["input"]]
		}
		return findAllFilesWithExtension(getDefaultFolder(this.project), TRANSLATIONS_EXTENSION)
	}
}
