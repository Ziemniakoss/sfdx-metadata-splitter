import { flags } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import MergingCommand from "../../../MergingCommand";
import { PLUGIN_NAME } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import Merger from "../../../mergers/Merger";
import ProfilesMerger from "../../../mergers/ProfilesMerger";
import XmlFormatter from "../../../utils/xmlFormatter";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "profiles_merge");

export default class MergeProfiles extends MergingCommand {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;
	public static flagsConfig = {
		remove: flags.boolean({
			description: messages.getMessage("flag_remove"),
			char: "r",
		}),
		input: flags.array({
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

	getDoneMessage(): string {
		return messages.getMessage("done");
	}

	getFolderName(): string {
		return "profiles";
	}

	getMerger(): Merger {
		return new ProfilesMerger(XmlFormatter.fromFlags(this.flags));
	}

	getSpinnerText(): string {
		return messages.getMessage("spinnerText");
	}
}
