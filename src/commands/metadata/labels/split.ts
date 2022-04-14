import { flags } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { LABELS_EXTENSION, PLUGIN_NAME } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import XmlFormatter from "../../../utils/xmlFormatter";
import SplittingCommand from "../../../SplittingCommand";
import LabelsSplitter from "../../../splitters/LabelsSplitter";
import Splitter from "../../../splitters/Splitter";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "labels_split");

export default class SplitLabels extends SplittingCommand {
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
		...FORMATTING_FLAGS,
	};

	public async run() {
		this.ux.warn(messages.getMessage("deprecation_notice"));
		return super.run();
	}

	protected getDoneMessage(): string {
		return messages.getMessage("done");
	}

	protected getFilesExtension(): string {
		return LABELS_EXTENSION;
	}

	protected getSpinnerText(): string {
		return messages.getMessage("splitting");
	}

	protected getSplitter(): Splitter {
		return new LabelsSplitter(XmlFormatter.fromFlags(this.flags));
	}

	protected deleteAfterSplitting(): Boolean {
		return this.flags["remove-input-file"];
	}
}
