import CustomLabels from "../../../metadataTypes/CustomLabels";
import CustomLabelsSorter from "../../../sorters/CustomLabelsSorter";
import CustomLabelsSplitter from "../../../splitters/CustomLabelsSplitter";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import SplittingCommand from "../../../SplittingCommand";
import XmlFormatter from "../../../utils/xmlFormatter";
import { LABELS_EXTENSION, PLUGIN_NAME } from "../../../constants";
import { Messages } from "@salesforce/core";
import { flags } from "@salesforce/command";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "labels_split");

export default class SplitCustomLabels extends SplittingCommand<CustomLabels> {
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

	protected getDoneMessage = () => messages.getMessage("done");

	protected getFilesExtension = () => LABELS_EXTENSION;

	protected getSpinnerText = () => messages.getMessage("splitting");

	protected getSplitter = () =>
		new CustomLabelsSplitter(
			XmlFormatter.fromFlags(this.flags),
			new CustomLabelsSorter()
		);

	protected deleteAfterSplitting(): boolean {
		return this.flags["remove-input-file"];
	}
}
