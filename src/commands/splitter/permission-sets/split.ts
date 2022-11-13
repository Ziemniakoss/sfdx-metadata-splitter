import SplittingCommand from "../../../SplittingCommand";
import PermissionSetsSplitter from "../../../splitters/PermissionSetsSplitter";
import Splitter from "../../../splitters/Splitter";
import XmlFormatter from "../../../utils/xmlFormatter";
import { METADATA_EXTENSIONS, PLUGIN_NAME } from "../../../constants";
import { flags } from "@salesforce/command";
import FORMATTING_FLAGS from "../../../utils/formattingFlags";
import { Messages } from "@salesforce/core";

const messages = Messages.loadMessages(PLUGIN_NAME, "permission_sets_split");
export default class SplitPermissionSet extends SplittingCommand {
	public static description = messages.getMessage("description");
	protected static requiresProject = true;
	public static flagsConfig = {
		remove: flags.boolean({
			description: messages.getMessage("flags.remove"),
			char: "r",
		}),
		input: flags.array({
			description: messages.getMessage("flags.input"),
			char: "i",
		}),
		...FORMATTING_FLAGS,
	};
	protected getDoneMessage(): string {
		return messages.getMessage("spinner_done");
	}

	protected getFilesExtension(): string {
		return METADATA_EXTENSIONS.PERMISSION_SETS;
	}

	protected getSpinnerText(): string {
		return messages.getMessage("spinner");
	}

	protected getSplitter(): Splitter {
		return new PermissionSetsSplitter(XmlFormatter.fromFlags(this.flags));
	}
}
