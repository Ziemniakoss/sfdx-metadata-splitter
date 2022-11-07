import { flags } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import SplittingCommand from "../../../SplittingCommand";
import { METADATA_EXTENSIONS, PLUGIN_NAME } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import Splitter from "../../../splitters/Splitter";
import LabelsSplitter from "../../../splitters/LabelsSplitter";
import XmlFormatter from "../../../utils/xmlFormatter";

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
		return METADATA_EXTENSIONS.LABELS;
	}

	protected getSpinnerText(): string {
		return messages.getMessage("splitting");
	}

	protected getSplitter(): Splitter {
		return new LabelsSplitter(XmlFormatter.fromFlags(this.flags));
	}

	protected deleteAfterSplitting(): boolean {
		return this.flags["remove-input-file"];
	}
}
