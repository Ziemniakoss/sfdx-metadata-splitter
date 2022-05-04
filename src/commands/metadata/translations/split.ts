import { flags } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import SplittingCommand from "../../../SplittingCommand";
import { PLUGIN_NAME, TRANSLATIONS_EXTENSION } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import TranslationsSplitter from "../../../splitters/TranslationsSplitter";
import XmlFormatter from "../../../utils/xmlFormatter";
import Splitter from "../../../splitters/Splitter";
import TranslationsSorter from "../../../sorters/TranslationsSorter";
import Translations from "../../../metadataTypes/Translations";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "translations_split");

export default class SplitTranslations extends SplittingCommand<Translations> {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;

	public static flagsConfig = {
		input: flags.string({
			description: messages.getMessage("flag_input"),
			char: "i",
		}),
		remove: flags.boolean({
			description: messages.getMessage("flag_remove"),
			char: "r",
		}),
		...FORMATTING_FLAGS,
	};

	protected getDoneMessage(): string {
		return messages.getMessage("done_message");
	}

	protected getFilesExtension(): string {
		return TRANSLATIONS_EXTENSION;
	}

	protected getSpinnerText(): string {
		return messages.getMessage("splitting");
	}

	protected getSplitter(): Splitter<Translations> {
		return new TranslationsSplitter(
			XmlFormatter.fromFlags(this.flags),
			new TranslationsSorter()
		);
	}
}
