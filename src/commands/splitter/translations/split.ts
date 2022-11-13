import { flags } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import SplittingCommand from "../../../SplittingCommand";
import { METADATA_EXTENSIONS, PLUGIN_NAME } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import TranslationsSplitter from "../../../splitters/TranslationsSplitter";
import XmlFormatter from "../../../utils/xmlFormatter";
import Splitter from "../../../splitters/Splitter";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "translations_split");

export default class SplitTranslations extends SplittingCommand {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;

	public static flagsConfig = {
		input: flags.array({
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
		return METADATA_EXTENSIONS.TRANSLATIONS;
	}

	protected getSpinnerText(): string {
		return messages.getMessage("splitting");
	}

	protected getSplitter(): Splitter {
		return new TranslationsSplitter(XmlFormatter.fromFlags(this.flags));
	}
}
