import { flags } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import MergingCommand from "../../../MergingCommand";
import { PLUGIN_NAME } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import Merger from "../../../mergers/Merger";
import TranslationsMerger from "../../../mergers/TranslationsMerger";
import XmlFormatter from "../../../utils/xmlFormatter";
import TranslationsSorter from "../../../sorters/TranslationsSorter";
import Translations from "../../../metadataTypes/Translations";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "translations_merge");

export default class MergeTranslations extends MergingCommand<Translations> {
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

	getDoneMessage(): string {
		return messages.getMessage("done");
	}

	getFolderName(): string {
		return "translations";
	}

	getMerger(): Merger<Translations> {
		return new TranslationsMerger(
			XmlFormatter.fromFlags(this.flags),
			new TranslationsSorter()
		);
	}

	getSpinnerText(): string {
		return messages.getMessage("spinnerMessage");
	}
}
