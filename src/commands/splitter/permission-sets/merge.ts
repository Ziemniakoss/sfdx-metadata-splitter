import { flags } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import MergingCommand from "../../../MergingCommand";
import { PLUGIN_NAME } from "../../../constants";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import Merger from "../../../mergers/Merger";
import XmlFormatter from "../../../utils/xmlFormatter";
import PermissionSetsMerger from "../../../mergers/PermissionSetsMerger";

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages(PLUGIN_NAME, "permission_sets_merge");

export default class MergePermissionSets extends MergingCommand {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;
	public static flagsConfig = {
		remove: flags.boolean({
			description: messages.getMessage("flag.remove"),
			char: "r",
		}),
		input: flags.array({
			description: messages.getMessage("flag.input"),
			char: "i",
		}),
		...FORMATTING_FLAGS,
	};

	public static examples = [
		messages.getMessage("examples.mergeAll"),
		messages.getMessage("examples.mergeAllAndRemoveSource"),
		messages.getMessage("examples.mergeOnlyOneProfile"),
	];

	getDoneMessage(): string {
		return messages.getMessage("spinner_done");
	}

	getFolderName(): string {
		return "permissionsets";
	}

	getMerger(): Merger {
		return new PermissionSetsMerger(XmlFormatter.fromFlags(this.flags));
	}

	getSpinnerText(): string {
		return messages.getMessage("spinner");
	}
}
